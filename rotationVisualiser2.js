import * as THREE from 'three';

// Create a separate scene for the rotation visualizer
const rotationScene = new THREE.Scene();
rotationScene.up.set(0, 0, 1);

// Create a camera
const rotationCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
rotationCamera.position.set(-3, 3, 3); // Position the camera above and to the side of the origin
rotationCamera.lookAt(0, 0, 0);

// Create a renderer
const rotationRenderer = new THREE.WebGLRenderer();
rotationRenderer.setSize(400, 400);
rotationRenderer.setClearColor(0xEEEEEE, 1); // Background color

// Attach the renderer to the div element
document.getElementById('rotationVisualiser').appendChild(rotationRenderer.domElement);

// Function to create a cone axis (global coordinate axis)
function createGlobalAxis(color, position, axis) {
    const geometry = new THREE.ConeGeometry(0.05, 2, 4);
    const material = new THREE.MeshBasicMaterial({ color });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(position.x, position.y, position.z);
    cone.rotation[axis] = Math.PI / 2; // Align the cone with the axis
    return cone;
}

// Create global axes (stationary)
const globalAxes = new THREE.Group();
globalAxes.add(createGlobalAxis(0x00ff00, { x: 0, y: 0, z: 1 }, 'x')); // Y Axis
globalAxes.add(createGlobalAxis(0x80E2F6, { x: 0, y: 1, z: 0 }, 'y')); // Z Axis
globalAxes.add(createGlobalAxis(0xF680E2, { x: -1, y: 0, z: 0 }, 'z')); // X Axis
rotationScene.add(globalAxes);

// Function to create an arrow axis (local coordinate axis)
function createLocalAxis(color, position, axis) {
    // Arrow cone
    const coneGeometry = new THREE.ConeGeometry(0.1, 0.2, 8);
    const coneMaterial = new THREE.MeshBasicMaterial({ color });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = 0.6;

    // Arrow shaft
    const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.y = 0.3;

    // Combine cone and cylinder
    const arrow = new THREE.Group();
    arrow.add(cylinder);
    arrow.add(cone);
    arrow.position.set(position.x, position.y, position.z);
    arrow.rotation[axis] = Math.PI / 2; // Align the arrow with the axis

    return arrow;
}

// Create local axes (rotating)
const localAxes = new THREE.Group();
localAxes.add(createLocalAxis(0x006400, { x: 0, y: 0, z: 0 }, 'x')); // Y Axis
localAxes.add(createLocalAxis(0x0000ff, { x: 0, y: 0, z: 0 }, 'y')); // Z Axis
localAxes.add(createLocalAxis(0xff0000, { x: 0, y: 0, z: 0 }, 'z')); // X Axis
rotationScene.add(localAxes);

// Add an ambient light for better visibility
const ambientLight = new THREE.AmbientLight(0x404040);
rotationScene.add(ambientLight);

// Render loop for the scene
function animate() {
    requestAnimationFrame(animate);

    // Render the rotationScene
    rotationRenderer.render(rotationScene, rotationCamera);
}

// Start the render loop
animate();

// Function to update the local axes rotation based on user input
function updateLocalAxesRotation(bend, turn, tilt, rotationOrder) {
    const bendRadians = bend * (Math.PI / 180);
    const turnRadians = turn * (Math.PI / 180);
    const tiltRadians = tilt * (Math.PI / 180);
    const rotationSpeed = Math.PI / 15; // 90 degrees per second in radians

    // Reset the local axes to match the global coordinates (zero rotation)
    localAxes.rotation.set(0, 0, 0);  // This ensures we start from the initial position

    // Declare rotationOrder2 before the if-else block
    let rotationOrder2;

    // Assign rotationOrder2 based on input
    if (rotationOrder === 'XYZ') {
        rotationOrder2 = 'XZY';
    } else if (rotationOrder === 'XZY') {
        rotationOrder2 = 'XYZ';
    } else if (rotationOrder === 'YXZ') {
        rotationOrder2 = 'ZXY';
    } else if (rotationOrder === 'YZX') {
        rotationOrder2 = 'ZYX';
    } else if (rotationOrder === 'ZXY') {
        rotationOrder2 = 'YXZ';
    } else if (rotationOrder === 'ZYX') {
        rotationOrder2 = 'YZX';
    }

    console.log(`Received rotationOrder: ${rotationOrder}`);
    console.log(`Using rotationOrder2: ${rotationOrder2}`);

    // Helper function to animate a single rotation around one axis
    function animateRotation(axis, targetAngle, onComplete) {
        let currentAngle = 0;  // Track the total rotation applied
        const duration = Math.abs(targetAngle) / rotationSpeed * 1000; // in milliseconds
        const startTime = performance.now();

        function rotateStep(timestamp) {
            const elapsed = timestamp - startTime;
            let deltaAngle = rotationSpeed * (elapsed / 1000); // angle for this frame

            // Ensure the deltaAngle respects the direction (sign) of the target angle
            deltaAngle = Math.sign(targetAngle) * Math.min(Math.abs(deltaAngle), Math.abs(targetAngle - currentAngle));

            // Increment the current total rotation by the deltaAngle
            currentAngle += deltaAngle;

            // Apply the current frame's rotation to the localAxes rotation
            localAxes.rotation[axis] += deltaAngle;

            // Debug log to track the rotation progress
            console.log(`Rotating ${axis} axis: currentAngle = ${currentAngle}, targetAngle = ${targetAngle}, deltaAngle = ${deltaAngle}`);

            // Check if the total rotation has reached or exceeded the target angle
            if (Math.abs(currentAngle) < Math.abs(targetAngle)) {
                requestAnimationFrame(rotateStep); // Keep animating
            } else {
                onComplete(); // Signal the end of this rotation
            }
        }

        requestAnimationFrame(rotateStep);
    }

    // Helper function to introduce delay (e.g., 1 second pause between steps)
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Rotate based on the order of rotationOrder2, adding pauses between steps
    async function animateRotationSequence() {
        for (const axis of rotationOrder2.toLowerCase()) {
            let targetAngle;
            if (axis === 'x') {
                targetAngle = tiltRadians*-1;   // X-axis is for tilt
            } else if (axis === 'y') {
                targetAngle = turnRadians;   // Y-axis is for turn
            } else if (axis === 'z') {
                targetAngle = bendRadians;   // Z-axis is for bend
            }

            console.log(`Starting rotation on ${axis} axis by ${targetAngle} radians`);
            await new Promise(resolve => animateRotation(axis, targetAngle, resolve)); // animate the rotation
            await delay(1000); // pause for 1 second between rotations
        }

        console.log('Rotation sequence complete');
    }

    // Start the rotation sequence
    animateRotationSequence();
}



export { updateLocalAxesRotation };
