import { man } from './init.js';

function applyMovement() {
    const segment = document.getElementById("segment").value;
    const bend = parseFloat(document.getElementById("bend").value);
    const turn = parseFloat(document.getElementById("turn").value);
    const tilt = parseFloat(document.getElementById("tilt").value);
    const rotationOrder = document.getElementById("rotationOrder").value;  // Get the selected rotation order

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

    // Log movement and rotation order to confirm it's applied
    console.log(`Movement applied to ${segment}: bend ${bend}°, turn ${turn}°, tilt ${tilt}°, with rotation order: ${rotationOrder}`);
}


// Step 3: Add an event listener to the button to apply the movement when clicked
document.getElementById("applyMovementButton").addEventListener("click", applyMovement);
