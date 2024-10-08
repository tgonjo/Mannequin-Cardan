import { man, scene,defaultRelativeRotations } from './init.js';
import * as THREE from 'three';
import { updateLocalAxesRotation_relative } from './rotationVisualiser_relative.js';


// Variable to track the current segment's axes helper
let currentAxesHelper = null;
let currentAxesHelper_origin = null;

function createTargetAxes(size = 1, thickness = 1, orientation = { x: 0, y: 0, z: 0 },name_target='') {
    const axesGroup = new THREE.Group();  // Group to hold the three axes

    axesGroup.name = name_target;

    // Apply the specified rotation to align axes with the desired orientation
    axesGroup.rotation.set(orientation.x, orientation.y, orientation.z);

    // X axis (red)
    const xMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const xGeometry = new THREE.CylinderGeometry(thickness, thickness, size, 32);
    const xAxis = new THREE.Mesh(xGeometry, xMaterial);
    xAxis.position.set(0, 0, size / 2);
    xAxis.rotation.x = Math.PI / 2;
    axesGroup.add(xAxis);

    // X axis arrow
    const xArrowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const xArrowGeometry = new THREE.ConeGeometry(thickness * 2, thickness * 3, 32);
    const xArrow = new THREE.Mesh(xArrowGeometry, xArrowMaterial);
    xArrow.position.set(0, 0, size);
    xArrow.rotation.x = Math.PI / 2;
    axesGroup.add(xArrow);

    // Y axis (green)
    const yMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });
    const yGeometry = new THREE.CylinderGeometry(thickness, thickness, size, 32);
    const yAxis = new THREE.Mesh(yGeometry, yMaterial);
    yAxis.position.set(size / 2, 0, 0);
    yAxis.rotation.z = Math.PI / 2;
    axesGroup.add(yAxis);

    // Y axis arrow
    const yArrowMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });
    const yArrowGeometry = new THREE.ConeGeometry(thickness * 2, thickness * 3, 32);
    const yArrow = new THREE.Mesh(yArrowGeometry, yArrowMaterial);
    yArrow.position.set(size, 0, 0);
    yArrow.rotation.z = Math.PI / -2;
    axesGroup.add(yArrow);

    // Z axis (blue)
    const zMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const zGeometry = new THREE.CylinderGeometry(thickness, thickness, size, 32);
    const zAxis = new THREE.Mesh(zGeometry, zMaterial);
    zAxis.position.set(0, size / 2, 0);
    axesGroup.add(zAxis);

    // Z axis arrow
    const zArrowMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const zArrowGeometry = new THREE.ConeGeometry(thickness * 2, thickness * 3, 32);
    const zArrow = new THREE.Mesh(zArrowGeometry, zArrowMaterial);
    zArrow.position.set(0, size, 0);
    axesGroup.add(zArrow);

    return axesGroup;
}

function createOgirinAxes(size = 1, thickness = 1, orientation = { x: 0, y: 0, z: 0 },name_origin='') {
    const axesGroup_origin = new THREE.Group();  // Group to hold the three axes

    axesGroup_origin.name = name_origin

    // Apply the specified rotation to align axes with the desired orientation
    axesGroup_origin.rotation.set(orientation.x, orientation.y, orientation.z);

    // X axis (orange)
    const xGeometry = new THREE.ConeGeometry(thickness/2, size*2, 4);
    const xMaterial = new THREE.MeshBasicMaterial({ color:0xe67e22  });
    const xAxis = new THREE.Mesh(xGeometry, xMaterial);
    xAxis.position.set(0, 0, size);
    xAxis.rotation.x = Math.PI / 2;
    axesGroup_origin.add(xAxis);

    // Y axis (green)
    const yGeometry = new THREE.ConeGeometry(thickness/2, size*2, 4);
    const yMaterial = new THREE.MeshBasicMaterial({ color:0x138d75  });
    const yAxis = new THREE.Mesh(yGeometry, yMaterial);
    yAxis.position.set(size, 0, 0);
    yAxis.rotation.z = -1*Math.PI / 2;
    axesGroup_origin.add(yAxis);

    // Z axis (dark blue)
    const zGeometry = new THREE.ConeGeometry(thickness/2, size*2, 4);
    const zMaterial = new THREE.MeshBasicMaterial({ color:0x283747  });
    const zAxis = new THREE.Mesh(zGeometry, zMaterial);
    zAxis.position.set(0, size, 0);
    zAxis.rotation.y = Math.PI / 2;
    axesGroup_origin.add(zAxis);

    return axesGroup_origin;
}




function applyMovement() {

    // Loop through all segments and remove objects named "target_axes" or "origin_axes" if attached
    const bodySegments = [
        man.torso, man.head,man.pelvis,
        man.l_arm, man.l_elbow, man.l_wrist,
        man.r_arm, man.r_elbow, man.r_wrist,
        man.l_leg, man.l_knee, man.l_ankle,
        man.r_leg, man.r_knee, man.r_ankle
    ];

    // Remove objects named "target_axes" and "origin_axes" from all segments
    bodySegments.forEach(segment => {
        // Find and remove any child named "target_axes"
        const targetAxes = segment.getObjectByName("target_axes");
        if (targetAxes) {
            segment.remove(targetAxes);
        }

        // Find and remove any child named "origin_axes"
        const originAxes = segment.getObjectByName("origin_axes");
        if (originAxes) {
            segment.remove(originAxes);
        }
    });


    const joint = document.getElementById("joint").value;
    const bend = parseFloat(document.getElementById("y_relative").value);
    const turn = parseFloat(document.getElementById("z_relative").value);
    const tilt = parseFloat(document.getElementById("x_relative").value);
    const rotationOrder_relative = document.getElementById("rotationOrder_relative").value;

    // Convert degrees to radians
    const bendRadians = bend * (Math.PI / 180);
    const turnRadians = turn * (Math.PI / 180);
    const tiltRadians = tilt * (Math.PI / 180);

    let originSegment;
    let targetSegment;
    let orientation_target = { x: 0, y: 0, z: 0 }; // Default orientation
    let orientation_origin = { x: 0, y: 0, z: 0 }; // Default orientation

    switch (joint) {
        case "neck_joint":
            originSegment = man.torso;
            targetSegment = man.head;
            break;
        case "trunk_joint":
            originSegment = man.pelvis;
            targetSegment = man.torso;
            break;
        case "l_shoulder_joint":
            targetSegment = man.l_arm;
            originSegment = man.torso;
            break;
        case "l_elbow_joint":
            targetSegment = man.l_elbow;
            originSegment = man.l_arm;
            
            break;
        case "l_wrist_joint":
            targetSegment = man.l_wrist;
            originSegment = man.l_elbow;
            
            break;
        case "r_shoulder_joint":
            targetSegment = man.r_arm;
            originSegment = man.torso;
            break;
        case "r_elbow_joint":
            targetSegment = man.r_elbow;
            originSegment = man.r_arm;
            
            break;
        case "r_wrist_joint":
            targetSegment = man.r_wrist;
            originSegment = man.r_elbow;
            
            break;
        case "l_hip_joint":
            targetSegment = man.l_leg;
            originSegment = man.pelvis;
            break;
        case "l_knee_joint":
            targetSegment = man.l_knee;
            originSegment = man.l_leg;
            break;
        case "l_ankle_joint":
            targetSegment = man.l_ankle;
            originSegment = man.l_knee;
            break;
        case "r_hip_joint":
            targetSegment = man.r_leg;
            originSegment = man.pelvis;
            break;
        case "r_knee_joint":
            targetSegment = man.r_knee;
            originSegment = man.r_leg;
            break;
        case "r_ankle_joint":
            targetSegment = man.r_ankle;
            originSegment = man.r_knee;
            break;
        default:
            console.error("Unknown segment");
            return;
    }

    // Retrieve the default relative rotation
    const defaultRotationQuaternion = defaultRelativeRotations[joint];

    // Reset the target segment to its original relative rotation
    targetSegment.setRotationFromQuaternion(defaultRotationQuaternion);

    // Set the rotation order
    targetSegment.rotation.order = rotationOrder_relative;

    if (joint=="l_elbow_joint" || joint=="r_elbow_joint")

        {orientation_target = { x: 0, y: 0, z: Math.PI };
        targetSegment.rotation.x += bendRadians*-1;
        targetSegment.rotation.y += turnRadians*-1;
        targetSegment.rotation.z += tiltRadians;
        }

        else if (joint=="l_wrist_joint" || joint=="r_wrist_joint")
            {orientation_target = { x: 0, y: 0, z: Math.PI };
                orientation_origin = { x: 0, y: 0, z: Math.PI };
                targetSegment.rotation.x += bendRadians*-1;
                targetSegment.rotation.y += turnRadians*-1;
                targetSegment.rotation.z += tiltRadians;
            }
        else if (joint=="l_knee_joint" || joint=="r_knee_joint")
            {orientation_target = { x: Math.PI, y: 0, z: 0 };
                targetSegment.rotation.x += bendRadians;
                targetSegment.rotation.y += turnRadians*-1;
                targetSegment.rotation.z += tiltRadians*-1;}

        else if (joint=="l_ankle_joint" || joint=="r_ankle_joint")
            {orientation_target = { x: Math.PI, y: 0, z: 0 };
                orientation_origin = { x: Math.PI, y: 0, z: 0 };
                targetSegment.rotation.x += bendRadians;
                targetSegment.rotation.y += turnRadians*-1;
                targetSegment.rotation.z += tiltRadians*-1;}
        
        else {
            targetSegment.rotation.x += bendRadians;
            targetSegment.rotation.y += turnRadians;
            targetSegment.rotation.z += tiltRadians;
        }


    
    // Create a new set of thicker colored axes with the specified orientation
    currentAxesHelper = createTargetAxes(5, 0.5, orientation_target,'target_axes');
    targetSegment.add(currentAxesHelper);

    currentAxesHelper_origin = createOgirinAxes(5, 0.5, orientation_origin,'origin_axes');
    originSegment.add(currentAxesHelper_origin);


    // Update the local axes in the top-right animation
    updateLocalAxesRotation_relative(bend, turn, tilt, rotationOrder_relative);

    console.log(`Movement applied to ${joint}: bend ${bend}°, turn ${turn}°, tilt ${tilt}°, with rotation order: ${rotationOrder_relative}`);
}






// Step 3: Add an event listener to the button to apply the movement when clicked
document.getElementById("applyMovementButton2").addEventListener("click", applyMovement);
