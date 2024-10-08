import { man, defaultPosture } from './init.js';

const bodyParts = ['torso', 'neck', 'head','l_arm', 'l_elbow', 'l_wrist', 'l_leg', 'l_knee', 'l_ankle', 'r_arm', 'r_elbow', 'r_wrist', 'r_leg', 'r_knee', 'r_ankle'];

function resetPosture() {
    bodyParts.forEach(part => {
        if (man[part] && man[part].posture) { // Check if the part exists and has a posture property
            man[part].posture = [...defaultPosture[part]];  // Reset posture
        }
    });
    console.log("Mannequin posture reset to initial posture");

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
}

// Bind the reset pose function to the Reset Pose button
document.getElementById('resetPoseButton').addEventListener('click', function() {
    resetPosture();  // Reset the mannequin pose when the button is clicked
    
});

document.getElementById('resetPoseButton2').addEventListener('click', function() {
    resetPosture();  // Reset the mannequin pose when the button is clicked
    
});

export {resetPosture};