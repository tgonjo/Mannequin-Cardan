import { createStage, Male, getStage } from "mannequin";
import * as THREE from 'three';

// Create the 3D stage and render the Male mannequin
const stage = createStage();
const man = new Male();

// Object to store the default postures (initial posture of each joint)
const defaultPosture = {};

// Array of body parts to easily loop over
const bodyParts = ['torso', 'pelvis','neck', 'head','l_arm', 'l_elbow','l_wrist','l_leg', 'l_knee','l_ankle', 'r_arm', 'r_elbow','r_wrist','r_leg', 'r_knee','r_ankle'];

// Function to store the initial posture for each body part
function storeInitialPosture() {
    bodyParts.forEach(part => {
        defaultPosture[part] = [...man[part].posture];  // Store posture
    });
    console.log("Initial posture stored:", defaultPosture);
}

storeInitialPosture();

const scene = getStage().scene;

// Object to store the default rotations of each joint (initialized with identity quaternion for zero degrees)
const defaultRelativeRotations = {};

// Function to store zero degree relative rotations for each joint
function storeZeroDegreeRotations() {
    const segmentPairs = [
        { origin: man.pelvis, target: man.torso, joint: "trunk_joint" },
        { origin: man.torso, target: man.head, joint: "neck_joint" },
        { origin: man.torso, target: man.l_arm, joint: "l_shoulder_joint" },
        { origin: man.l_arm, target: man.l_elbow, joint: "l_elbow_joint" },
        { origin: man.l_elbow, target: man.l_wrist, joint: "l_wrist_joint" },
        { origin: man.torso, target: man.r_arm, joint: "r_shoulder_joint" },
        { origin: man.r_arm, target: man.r_elbow, joint: "r_elbow_joint" },
        { origin: man.r_elbow, target: man.r_wrist, joint: "r_wrist_joint" },
        { origin: man.torso, target: man.l_leg, joint: "l_hip_joint" },
        { origin: man.l_leg, target: man.l_knee, joint: "l_knee_joint" },
        { origin: man.l_knee, target: man.l_ankle, joint: "l_ankle_joint" },
        { origin: man.torso, target: man.r_leg, joint: "r_hip_joint" },
        { origin: man.r_leg, target: man.r_knee, joint: "r_knee_joint" },
        { origin: man.r_knee, target: man.r_ankle, joint: "r_ankle_joint" }
    ];

    segmentPairs.forEach(({ joint }) => {
        // Store the identity quaternion (representing zero rotation) for each joint
        defaultRelativeRotations[joint] = new THREE.Quaternion();  // Identity quaternion (0, 0, 0, 1)
    });

    console.log("Zero-degree rotations stored:", defaultRelativeRotations);
}

// Call this function once the mannequin is fully initialized
storeZeroDegreeRotations();


// Make the mannequin semi-transparent
man.traverse((child) => {
    if (child.isMesh) {
        child.material.transparent = true; // Enable transparency
        child.material.opacity = 0.6;     // Set opacity to 50%
    }
});

// Add the mannequin to the scene
scene.add(man);

// Ensure mannequin is ready and visible
console.log('Mannequin initialized:', man);

export { man, scene, defaultRelativeRotations,defaultPosture};

