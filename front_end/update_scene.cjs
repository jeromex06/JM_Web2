const fs = require('fs');
const file = 'c:/desktop/29-6/jova_website/front_end/src/components/about/FabricationProcess.jsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '// ─────────────────────────────────────────────────────────────────\n// CNC Machine Setup';
const endMarker = '// ─────────────────────────────────────────────────────────────────\n// Main Component';

const newCNCMachine = `// ─────────────────────────────────────────────────────────────────
// CNC Machine Setup
// ─────────────────────────────────────────────────────────────────
const CNCMachine = () => {
  const toolGroupRef = useRef();

  useFrame((state) => {
    if (!toolGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle hovering animation for the tools
    toolGroupRef.current.position.y = 4 + Math.sin(t * 1.5) * 0.05;
  });

  return (
    <group>
      {/* ── Base Metal Sheet ── */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[18, 0.1, 12]} />
        <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Static Triangular Cut Hole (Central) */}
      <mesh position={[-2, -0.04, 1.0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 3]} />
        <meshBasicMaterial color="#02050A" depthWrite={false} />
      </mesh>

      {/* ── Foreground Clamp (Right Edge) ── */}
      <group position={[8.5, -2.5, 2]}>
        {/* Lower body */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <boxGeometry args={[3, 2, 4]} />
          <meshStandardMaterial color="#5f6b7a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Stepped teeth on the left */}
        <mesh position={[-1.6, 1.8, 0]} castShadow>
          <boxGeometry args={[0.4, 0.4, 4]} />
          <meshStandardMaterial color="#5f6b7a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.8, 1.2, 0]} castShadow>
          <boxGeometry args={[0.4, 0.4, 4]} />
          <meshStandardMaterial color="#5f6b7a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Upper jaw */}
        <mesh position={[-0.5, 2.85, 0]} castShadow>
          <boxGeometry args={[4, 0.8, 4]} />
          <meshStandardMaterial color="#333b45" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Back connector */}
        <mesh position={[1.25, 2.35, 0]} castShadow>
          <boxGeometry args={[1.5, 4, 4]} />
          <meshStandardMaterial color="#5f6b7a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Top details */}
        <mesh position={[1.25, 4.4, 0]} castShadow>
          <boxGeometry args={[2, 0.2, 4]} />
          <meshStandardMaterial color="#5f6b7a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* ── Animated Tool Assembly ── */}
      <group ref={toolGroupRef} position={[0, 4, 0]}>
        
        {/* Laser Head Assembly (Left) */}
        <group position={[-2.5, -0.5, 0]}>
          {/* Top housing */}
          <mesh position={[0, 1.75, 0]} castShadow>
            <cylinderGeometry args={[0.8, 0.8, 1.5, 32]} />
            <meshStandardMaterial color="#333b45" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Cable */}
          <mesh position={[0.9, 2.1, 0]} rotation={[0, 0, -Math.PI / 3]}>
            <cylinderGeometry args={[0.06, 0.06, 1.0, 16]} />
            <meshStandardMaterial color="#11151a" roughness={0.6} />
          </mesh>
          {/* Connection ring */}
          <mesh position={[0, 1.0, 0]} castShadow>
            <cylinderGeometry args={[0.82, 0.82, 0.2, 32]} />
            <meshStandardMaterial color="#1a1e24" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Middle stepped-down housing */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.65, 0.65, 0.9, 32]} />
            <meshStandardMaterial color="#333b45" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Tapered nozzle */}
          <mesh position={[0, -0.5, 0]} castShadow>
            <cylinderGeometry args={[0.65, 0.15, 1.0, 32]} />
            <meshStandardMaterial color="#8a95a5" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Press Brake Assembly (Right) */}
        <group position={[3.5, 0.5, -1.5]}>
          {/* Upper ram/holder - Main block */}
          <mesh position={[0, 2.0, 0]} castShadow>
            <boxGeometry args={[4.5, 2, 1.5]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Upper ram - Front clamp plate */}
          <mesh position={[0, 1.8, 0.85]} castShadow>
            <boxGeometry args={[4.5, 1.5, 0.3]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Angled middle section */}
          <mesh position={[0, 0.2, 0.25]} castShadow rotation={[-Math.PI / 12, 0, 0]}>
            <boxGeometry args={[4.5, 1.8, 1.5]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Vertical holding block (Blade) */}
          <mesh position={[0, -1.2, 0.75]} castShadow>
            <boxGeometry args={[4.5, 1.5, 1.0]} />
            <meshStandardMaterial color="#5f6b7a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Small black bolt on the front of the blade */}
          <mesh position={[1.8, -1.2, 1.26]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
            <meshStandardMaterial color="#000000" roughness={0.5} />
          </mesh>

          {/* Bent Bracket C-Channel (carried by the punch) */}
          <group position={[0, -2.825, 1.325]}>
            {/* Front Face (with holes) */}
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[4.5, 1.8, 0.15]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Top flange */}
            <mesh position={[0, 0.8, -0.8]} castShadow>
              <boxGeometry args={[4.5, 0.15, 1.6]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Top folded lip */}
            <mesh position={[0, 0.6, -1.5]} castShadow>
              <boxGeometry args={[4.5, 0.4, 0.15]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Bottom flange */}
            <mesh position={[0, -0.8, -0.8]} castShadow>
              <boxGeometry args={[4.5, 0.15, 1.6]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Bottom folded lip */}
            <mesh position={[0, -0.6, -1.5]} castShadow>
              <boxGeometry args={[4.5, 0.4, 0.15]} />
              <meshStandardMaterial color="#8a95a5" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Holes in the front face */}
            <mesh position={[-1.2, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
              <meshBasicMaterial color="#02050A" />
            </mesh>
            <mesh position={[1.2, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
              <meshBasicMaterial color="#02050A" />
            </mesh>
          </group>
        </group>
      </group>

      {/* Background Grid */}
      <gridHelper args={[60, 60, '#2e3d4f', '#0c1826']} position={[0, -1, 0]} />
    </group>
  );
};
`;

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const newContent = content.substring(0, startIdx) + newCNCMachine + "\n" + content.substring(endIdx);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Success');
} else {
  console.log('Not found');
}
