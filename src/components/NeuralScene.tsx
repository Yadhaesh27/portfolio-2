import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import * as THREE from 'three';

const purples = ['#ad96ff', '#8c78ff', '#71b8ff'];

function NeuralCore() {
  const rig = useRef<Group>(null);
  const poly = useRef<Mesh>(null);
  const nodes = useMemo(() => Array.from({ length: 30 }, (_, i) => {
    const theta = i * Math.PI * (3 - Math.sqrt(5));
    const y = 1 - (i / 29) * 2;
    const r = Math.sqrt(1 - y * y);
    return [r * Math.cos(theta) * 2.02, y * 2.02, r * Math.sin(theta) * 2.02] as [number, number, number];
  }), []);
  useFrame(({ clock, pointer }) => {
    if (rig.current) {
      rig.current.rotation.y = clock.getElapsedTime() * 0.095 + pointer.x * 0.13;
      rig.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.21) * 0.08 - pointer.y * 0.11;
    }
    if (poly.current) poly.current.rotation.z = clock.getElapsedTime() * -0.048;
  });
  return <group ref={rig}>
    <Float speed={1.25} rotationIntensity={0.07} floatIntensity={0.11}>
      <mesh ref={poly}>
        <icosahedronGeometry args={[1.55, 3]} />
        <meshPhysicalMaterial color="#7868fb" metalness={0.35} roughness={0.26} transmission={0.36} thickness={1.3} transparent opacity={0.58} side={THREE.DoubleSide} emissive="#312568" emissiveIntensity={0.32} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.558, 1]} />
        <meshBasicMaterial color="#c3aaff" wireframe transparent opacity={0.46} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.95, 2]} />
        <meshBasicMaterial color="#c1a4ff" transparent opacity={0.065} wireframe />
      </mesh>
    </Float>
    {[0, 1, 2].map((n) => <mesh key={n} rotation={[Math.PI / (n + 2.25), n * 0.6, n * 0.42]}>
      <torusGeometry args={[2.22 + n * 0.18, 0.007, 4, 180]} />
      <meshBasicMaterial color={purples[n]} transparent opacity={n === 1 ? 0.74 : 0.39} />
    </mesh>)}
    {nodes.map((point, i) => <mesh key={i} position={point}>
      <sphereGeometry args={[i % 5 === 0 ? 0.042 : 0.025, 8, 8]} />
      <meshBasicMaterial color={i % 3 === 0 ? '#99f4eb' : '#c2acff'} />
    </mesh>)}
  </group>;
}

export function NeuralScene() {
  return <div className="neural-canvas" aria-label="Interactive animated three-dimensional neural network sculpture" role="img">
    <Canvas camera={{ position: [0, 0, 7.8], fov: 44 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.3} />
      <pointLight position={[2, 4, 4]} color="#b69aff" intensity={95} />
      <pointLight position={[-4, -1, 1]} color="#62c8ff" intensity={65} />
      <Suspense fallback={null}>
        <NeuralCore />
        <Stars radius={80} depth={40} count={450} factor={2.1} saturation={0.3} fade speed={0.3} />
      </Suspense>
    </Canvas>
  </div>;
}
