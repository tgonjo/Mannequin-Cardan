import * as THREE from 'three';
import { scene } from './init.js'; // Import the scene from init.js

// Function to add the AxesHelper to the scene
function addAxesHelper() {
 // Create and add coordinate axes to the scene
const arrowLength = 0.5;
const arrowWidth = 0.01;

// X axis (red)
const xGeometry = new THREE.ConeGeometry(arrowWidth, arrowLength, 4);
const xMaterial = new THREE.MeshBasicMaterial({ color: 0xF680E2 });
const xArrow = new THREE.Mesh(xGeometry, xMaterial);
xArrow.position.set(arrowLength*3-arrowLength/2, -arrowLength*1.4, 0);
xArrow.rotation.z = Math.PI / 2;
scene.add(xArrow);

// Y axis (green)
const yGeometry = new THREE.ConeGeometry(arrowWidth, arrowLength, 4);
const yMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const yArrow = new THREE.Mesh(yGeometry, yMaterial);
yArrow.position.set(arrowLength*3, -arrowLength*1.4, arrowLength/2);
yArrow.rotation.x = Math.PI / 2;
scene.add(yArrow);

// Z axis (blue)
const zGeometry = new THREE.ConeGeometry(arrowWidth, arrowLength, 4);
const zMaterial = new THREE.MeshBasicMaterial({ color: 0x80E2F6});
const zArrow = new THREE.Mesh(zGeometry, zMaterial);
zArrow.position.set(arrowLength*3, arrowLength*-1.4+arrowLength/2, 0);
scene.add(zArrow);
}

// Call the function to add it on load
addAxesHelper();
