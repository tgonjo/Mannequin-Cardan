// movement.js
import { man } from './init.js';

// Step 2: Create a function to handle the movement changes
function applyMovement() {
    const segment = document.getElementById("segment").value;
    const bend = parseFloat(document.getElementById("bend").value);
    const turn = parseFloat(document.getElementById("turn").value);
    const tilt = parseFloat(document.getElementById("tilt").value);

    // Convert degrees to radians (3D models usually work with radians)
    const bendRadians = bend * (Math.PI / 180);
    const turnRadians = turn * (Math.PI / 180);
    const tiltRadians = tilt * (Math.PI / 180);

    // Apply the movement to the selected body segment using rotation properties
    switch (segment) {
        case "torso":
            man.torso.rotation.x = bendRadians;
            man.torso.rotation.y = turnRadians;
            man.torso.rotation.z = tiltRadians;
            break;
        case "head":
            man.head.rotation.x = bendRadians;
            man.head.rotation.y = turnRadians;
            man.head.rotation.z = tiltRadians;
            break;
        case "l_arm":
            man.l_arm.rotation.x = bendRadians;
            man.l_arm.rotation.y = turnRadians;
            man.l_arm.rotation.z = tiltRadians;
            break;
        case "l_elbow":
            man.l_elbow.rotation.x = bendRadians;
            man.l_elbow.rotation.y = turnRadians;
            man.l_elbow.rotation.z = tiltRadians;
            break;
        case "l_wrist":
            man.l_wrist.rotation.x = bendRadians;
            man.l_wrist.rotation.y = turnRadians;
            man.l_wrist.rotation.z = tiltRadians;
            break;
        case "r_arm":
            man.r_arm.rotation.x = bendRadians;
            man.r_arm.rotation.y = turnRadians;
            man.r_arm.rotation.z = tiltRadians;
            break;
        case "r_elbow":
            man.r_elbow.rotation.x = bendRadians;
            man.r_elbow.rotation.y = turnRadians;
            man.r_elbow.rotation.z = tiltRadians;
            break;
        case "r_wrist":
            man.r_wrist.rotation.x = bendRadians;
            man.r_wrist.rotation.y = turnRadians;
            man.r_wrist.rotation.z = tiltRadians;
            break;
        case "l_leg":
            man.l_leg.rotation.x = bendRadians;
            man.l_leg.rotation.y = turnRadians;
            man.l_leg.rotation.z = tiltRadians;
            break;
        case "l_knee":
            man.l_knee.rotation.x = bendRadians;
            man.l_knee.rotation.y = turnRadians;
            man.l_knee.rotation.z = tiltRadians;
            break;
        case "l_ankle":
            man.l_ankle.rotation.x = bendRadians;
            man.l_ankle.rotation.y = turnRadians;
            man.l_ankle.rotation.z = tiltRadians;
            break;
        case "r_leg":
            man.r_leg.rotation.x = bendRadians;
            man.r_leg.rotation.y = turnRadians;
            man.r_leg.rotation.z = tiltRadians;
            break;
        case "r_knee":
            man.r_knee.rotation.x = bendRadians;
            man.r_knee.rotation.y = turnRadians;
            man.r_knee.rotation.z = tiltRadians;
            break;
        case "r_ankle":
            man.r_ankle.rotation.x = bendRadians;
            man.r_ankle.rotation.y = turnRadians;
            man.r_ankle.rotation.z = tiltRadians;
            break;
        default:
            console.error("Unknown segment");
    }

    // Log movement to confirm it's applied
    console.log(`Movement applied to ${segment}: bend ${bend}°, turn ${turn}°, tilt ${tilt}°`);
}

// Step 3: Add an event listener to the button to apply the movement when clicked
document.getElementById("applyMovementButton").addEventListener("click", applyMovement);
