import { createStage, Male, getStage } from "mannequin";
import * as THREE from 'three';

// Create the 3D stage and render the Male mannequin
const stage = createStage();
const man = new Male();

const scene = getStage().scene;

// Make the mannequin semi-transparent
man.traverse((child) => {
    if (child.isMesh) {
        child.material.transparent = true; // Enable transparency
        child.material.opacity = 0.8;     // Set opacity to 50%
    }
});

// Add the mannequin to the scene
scene.add(man);

// Ensure mannequin is ready and visible
console.log('Mannequin initialized:', man);

export { man, scene };

