const THREE = require('three');

// Mock gunRef
const gunRef = new THREE.Group();
gunRef.up.set(1, 0, 0);
gunRef.position.set(-5.25, 4.0, 0.4);

// lookAt straight down
gunRef.lookAt(-5.25, 3.0, 0.4);

gunRef.updateMatrixWorld();

// Get local Z axis in world space
const zAxis = new THREE.Vector3(0, 0, 1).applyMatrix4(gunRef.matrixWorld).sub(gunRef.position).normalize();
const yAxis = new THREE.Vector3(0, 1, 0).applyMatrix4(gunRef.matrixWorld).sub(gunRef.position).normalize();
const xAxis = new THREE.Vector3(1, 0, 0).applyMatrix4(gunRef.matrixWorld).sub(gunRef.position).normalize();

console.log('Gun World +Z:', zAxis);
console.log('Gun World +Y:', yAxis);
console.log('Gun World +X:', xAxis);

// Check sprayRef
const sprayRef = new THREE.Group();
sprayRef.position.set(0, 0, 0.65);
gunRef.add(sprayRef);
gunRef.updateMatrixWorld();

const sprayPos = new THREE.Vector3().setFromMatrixPosition(sprayRef.matrixWorld);
console.log('Spray Position:', sprayPos);
