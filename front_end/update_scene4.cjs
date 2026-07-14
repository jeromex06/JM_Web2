const fs = require('fs');
const file = 'c:/desktop/29-6/jova_website/front_end/src/components/about/FabricationProcess.jsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '        {/* Press Brake Assembly (Right) */}';
const endMarker = '      {/* Background Grid */}';

const newPressBrake = `        {/* Press Brake Assembly (Right) */}
        <group position={[3.5, 0.5, -1.5]}>
          
          {/* Upper ram/holder - Main block */}
          <mesh position={[0, 1.5, 0.2]} castShadow>
            <boxGeometry args={[4.5, 0.8, 0.8]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.6} roughness={0.4} />
          </mesh>
          
          {/* Top Tabs */}
          <mesh position={[-1.2, 1.95, 0.2]} castShadow>
            <boxGeometry args={[0.6, 0.1, 0.6]} />
            <meshStandardMaterial color="#333b45" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[1.2, 1.95, 0.2]} castShadow>
            <boxGeometry args={[0.6, 0.1, 0.6]} />
            <meshStandardMaterial color="#333b45" metalness={0.6} roughness={0.4} />
          </mesh>
          
          {/* Angled middle section - Seamless connection */}
          <mesh position={[0, 0.59, 0.17]} castShadow rotation={[-0.58, 0, 0]}>
            <boxGeometry args={[4.5, 0.957, 0.4]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {/* Vertical holding block (Blade) */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[4.5, 0.6, 0.15]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Small black dot on the right face of the blade */}
          <mesh position={[2.26, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
            <meshStandardMaterial color="#02050A" roughness={0.8} />
          </mesh>

          {/* Complex Sheet Metal Bracket */}
          <group position={[-0.4, -0.3, 0.075]}>
            
            {/* Front Face */}
            <mesh position={[0, -0.9, 0.05]} castShadow>
              <boxGeometry args={[3.5, 1.8, 0.1]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Left Face (Side Plate) */}
            <mesh position={[-1.7, -0.9, -0.55]} castShadow>
              <boxGeometry args={[0.1, 1.8, 1.1]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Top Flange */}
            <mesh position={[0, -0.05, -0.55]} castShadow>
              <boxGeometry args={[3.5, 0.1, 1.1]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Bottom Flange */}
            <mesh position={[0, -1.75, -0.55]} castShadow>
              <boxGeometry args={[3.5, 0.1, 1.1]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Top Folded Lip (Returns down) */}
            <mesh position={[0, -0.2, -1.05]} castShadow>
              <boxGeometry args={[3.5, 0.4, 0.1]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Bottom Folded Lip (Returns up) */}
            <mesh position={[0, -1.6, -1.05]} castShadow>
              <boxGeometry args={[3.5, 0.4, 0.1]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Holes on the Front Face */}
            <mesh position={[0.8, -0.5, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
              <meshBasicMaterial color="#02050A" />
            </mesh>
            <mesh position={[1.4, -0.5, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
              <meshBasicMaterial color="#02050A" />
            </mesh>

            {/* Hole on the Left Face */}
            <mesh position={[-1.75, -0.5, -0.4]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
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
