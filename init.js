// init.js
import { createStage, Male } from "mannequin";

// Create the 3D stage and render the Male mannequin
const stage = createStage();
const man = new Male();

// Ensure mannequin is ready and visible
console.log('Mannequin initialized:', man);

export { man };
