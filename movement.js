import { man, scene } from './init.js';
import * as THREE from 'three';
import { updateLocalAxesRotation } from './rotationVisualiser2.js';


// Variable to track the current segment's axes helper
let currentAxesHelper = null;
let previousSegment = null;  // Keep track of the previously selected segment

// Helper function to create thicker colored axes
function createThickerColoredAxes(size = 1, thickness = 1) {
    const axesGroup = new THREE.Group();  // Group to hold the three axes

    // X axis (red)
    const xMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });  // Red for X axis
    const xGeometry = new THREE.CylinderGeometry(thickness, thickness, size, 32);  // Cylinder for thickness
    const xAxis = new THREE.Mesh(xGeometry, xMaterial);
    xAxis.position.set(0, 0, size / 2);  // Position at the middle of the X-axis
    xAxis.rotation.x = Math.PI / 2;  // Rotate to align with X-axis
    axesGroup.add(xAxis);

    // X axis arrow
    const xArrowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const xArrowGeometry = new THREE.ConeGeometry(thickness * 2, thickness * 3, 32);
    const xArrow = new THREE.Mesh(xArrowGeometry, xArrowMaterial);
    xArrow.position.set(0, 0, size);  
    xArrow.rotation.x = Math.PI / 2;   // Align the arrow with X-axis
    axesGroup.add(xArrow);

    // Y axis (green)
    const yMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });  // Green for Y axis
    const yGeometry = new THREE.CylinderGeometry(thickness, thickness, size, 32);
    const yAxis = new THREE.Mesh(yGeometry, yMaterial);
    yAxis.position.set(size / 2, 0, 0);  // Position at the middle of the Y-axis
    yAxis.rotation.z = Math.PI / 2;  // Rotate to align with Y-axis
    axesGroup.add(yAxis);

    // Y axis arrow
    const yArrowMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });
    const yArrowGeometry = new THREE.ConeGeometry(thickness * 2, thickness * 3, 32);
    const yArrow = new THREE.Mesh(yArrowGeometry, yArrowMaterial);
    yArrow.position.set(size, 0, 0);  // Position at the tip of Y-axis
    yArrow.rotation.z = Math.PI / -2;  // Align the arrow with Y-axis
    axesGroup.add(yArrow);

    // Z axis (blue)
    const zMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });  // Blue for Z axis
    const zGeometry = new THREE.CylinderGeometry(thickness, thickness, size, 32);
    const zAxis = new THREE.Mesh(zGeometry, zMaterial);
    zAxis.position.set(0, size / 2, 0);  // Position at the middle of the Z-axis
    axesGroup.add(zAxis);

    // Z axis arrow
    const zArrowMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const zArrowGeometry = new THREE.ConeGeometry(thickness * 2, thickness * 3, 32);
    const zArrow = new THREE.Mesh(zArrowGeometry, zArrowMaterial);
    zArrow.position.set(0, size, 0);  // Position at the tip of Z-axis
    axesGroup.add(zArrow);

    return axesGroup;
}

function applyMovement() {
    const segment = document.getElementById("segment").value;
    const bend = parseFloat(document.getElementById("y").value);
    const turn = parseFloat(document.getElementById("z").value);
    const tilt = parseFloat(document.getElementById("x").value);
    const rotationOrder = document.getElementById("rotationOrder").value;

    // Convert degrees to radians
    const bendRadians = bend * (Math.PI / 180);
    const turnRadians = turn * (Math.PI / 180);
    const tiltRadians = tilt * (Math.PI / 180);

    // Apply the movement and rotation order to the selected body segment
    let targetSegment;
    switch (segment) {
        case "torso":
            targetSegment = man.torso;
            break;
        case "head":
            targetSegment = man.head;
            break;
        case "l_arm":
            targetSegment = man.l_arm;
            break;
        case "l_elbow":
            targetSegment = man.l_elbow;
            break;
        case "l_wrist":
            targetSegment = man.l_wrist;
            break;
        case "r_arm":
            targetSegment = man.r_arm;
            break;
        case "r_elbow":
            targetSegment = man.r_elbow;
            break;
        case "r_wrist":
            targetSegment = man.r_wrist;
            break;
        case "l_leg":
            targetSegment = man.l_leg;
            break;
        case "l_knee":
            targetSegment = man.l_knee;
            break;
        case "l_ankle":
            targetSegment = man.l_ankle;
            break;
        case "r_leg":
            targetSegment = man.r_leg;
            break;
        case "r_knee":
            targetSegment = man.r_knee;
            break;
        case "r_ankle":
            targetSegment = man.r_ankle;
            break;
        default:
            console.error("Unknown segment");
            return;
    }

    // Set the rotation order for the selected segment
    targetSegment.rotation.order = rotationOrder;

    // Apply the rotation angles to the selected segment
    targetSegment.rotation.x = bendRadians;
    targetSegment.rotation.y = turnRadians;
    targetSegment.rotation.z = tiltRadians;


     // If there's an existing axes helper, remove it from the previous segment
     if (currentAxesHelper && previousSegment) {
        previousSegment.remove(currentAxesHelper);
    }

    // Create a new set of thicker colored axes and add it to the selected segment
    currentAxesHelper = createThickerColoredAxes(5, 0.5);  // Adjust size and thickness
    targetSegment.add(currentAxesHelper);

    // Set the current segment as the previous segment for the next movement
    previousSegment = targetSegment;

    // Log movement and rotation order to confirm it's applied
    console.log(`Movement applied to ${segment}: bend ${bend}°, turn ${turn}°, tilt ${tilt}°, with rotation order: ${rotationOrder}`);

    // Update the local axes in the top-right animation
    updateLocalAxesRotation(bend, turn, tilt, rotationOrder);


    // Log confirmation of axes addition
    console.log(`Thicker colored axes added to ${segment}`);
}


// Step 3: Add an event listener to the button to apply the movement when clicked
document.getElementById("applyMovementButton").addEventListener("click", applyMovement);
