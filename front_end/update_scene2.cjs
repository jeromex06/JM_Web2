const fs = require('fs');
const file = 'c:/desktop/29-6/jova_website/front_end/src/components/about/FabricationProcess.jsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '        {/* Press Brake Assembly (Right) */}';
const endMarker = '      {/* Background Grid */}';

const newPressBrake = `        {/* Press Brake Assembly (Right) */}
        <group position={[3.5, 0.5, -1.5]}>
          {/* Upper ram/holder - Main block */}
          <mesh position={[0, 2.0, 0]} castShadow>
            <boxGeometry args={[4.5, 1.5, 2.0]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Top Tabs */}
          <mesh position={[-1.2, 2.85, 0.5]} castShadow>
            <boxGeometry args={[0.6, 0.2, 0.8]} />
            <meshStandardMaterial color="#333b45" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[1.2, 2.85, 0.5]} castShadow>
            <boxGeometry args={[0.6, 0.2, 0.8]} />
            <meshStandardMaterial color="#333b45" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Angled middle section */}
          <mesh position={[0, 0.6, 0.15]} castShadow rotation={[Math.PI / 12, 0, 0]}>
            <boxGeometry args={[4.5, 1.5, 2.0]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Vertical holding block (Blade) */}
          <mesh position={[0, -0.6, -0.3]} castShadow>
            <boxGeometry args={[4.5, 1.5, 0.6]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Small black dot on the right face of the blade */}
          <mesh position={[2.26, -0.8, -0.3]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
            <meshStandardMaterial color="#02050A" roughness={0.8} />
          </mesh>

          {/* Bent Bracket C-Channel (carried by the punch) */}
          <group position={[0, -1.35, -0.6]}>
            {/* Front Face */}
            <mesh position={[0, -0.9, -0.075]} castShadow>
              <boxGeometry args={[4.5, 1.8, 0.15]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Top flange */}
            <mesh position={[0, -0.075, 0.8]} castShadow>
              <boxGeometry args={[4.5, 0.15, 1.6]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Top folded lip */}
            <mesh position={[0, -0.275, 1.525]} castShadow>
              <boxGeometry args={[4.5, 0.4, 0.15]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Bottom flange */}
            <mesh position={[0, -1.725, 0.8]} castShadow>
              <boxGeometry args={[4.5, 0.15, 1.6]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Bottom folded lip */}
            <mesh position={[0, -1.525, 1.525]} castShadow>
              <boxGeometry args={[4.5, 0.4, 0.15]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Holes in the front face */}
            <mesh position={[-1.2, -0.5, -0.075]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
              <meshBasicMaterial color="#02050A" />
            </mesh>
            <mesh position={[1.2, -0.5, -0.075]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
              <meshBasicMaterial color="#02050A" />
            </mesh>
          </group>
        </group>
      </group>

`;

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const newContent = content.substring(0, startIdx) + newPressBrake + content.substring(endIdx);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Success');
} else {
  console.log('Not found');
}
