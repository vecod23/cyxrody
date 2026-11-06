import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NetworkGrid() {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();
  const particlesRef = useRef();

  const { positions, connections, particlePositions, particleVelocities } = useMemo(() => {
    const nodeCount = 60;
    const pos = [];
    const conn = [];
    const pPos = [];
    const pVel = [];

    for (let i = 0; i < nodeCount; i++) {
      pos.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 4) {
          conn.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }

    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      pPos.push(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10
      );
      pVel.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01
      );
    }

    return {
      positions: new Float32Array(pos),
      connections: new Float32Array(conn),
      particlePositions: pPos,
      particleVelocities: pVel,
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.08) * 0.05;
    }

    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < posArray.length; i += 3) {
        const vi = i;
        posArray[vi] += particleVelocities[vi] || 0;
        posArray[vi + 1] += particleVelocities[vi + 1] || 0;
        posArray[vi + 2] += particleVelocities[vi + 2] || 0;

        if (Math.abs(posArray[vi]) > 12) particleVelocities[vi] *= -1;
        if (Math.abs(posArray[vi + 1]) > 7) particleVelocities[vi + 1] *= -1;
        if (Math.abs(posArray[vi + 2]) > 5) particleVelocities[vi + 2] *= -1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#00ff9c" size={0.08} transparent opacity={0.8} sizeAttenuation />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={connections.length / 3} array={connections} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#00ff9c" transparent opacity={0.15} />
      </lineSegments>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={new Float32Array(particlePositions)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#00d9ff" size={0.04} transparent opacity={0.6} sizeAttenuation />
      </points>
    </group>
  );
}

export default function CyberBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <NetworkGrid />
      </Canvas>
      
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 156, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 156, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
      }} />
      
      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, #050505 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
