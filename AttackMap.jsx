import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// City coordinates [lat, lon]
const CITIES = [
  { name: 'New York', lat: 40.7, lon: -74, color: '#00ff9c' },
  { name: 'London', lat: 51.5, lon: -0.1, color: '#00d9ff' },
  { name: 'Moscow', lat: 55.8, lon: 37.6, color: '#ff3b3b' },
  { name: 'Beijing', lat: 39.9, lon: 116.4, color: '#ff3b3b' },
  { name: 'Tokyo', lat: 35.7, lon: 139.7, color: '#00d9ff' },
  { name: 'Sydney', lat: -33.9, lon: 151.2, color: '#00ff9c' },
  { name: 'São Paulo', lat: -23.6, lon: -46.6, color: '#ffcc00' },
  { name: 'Dubai', lat: 25.2, lon: 55.3, color: '#7a5cff' },
  { name: 'Singapore', lat: 1.4, lon: 103.8, color: '#00ff9c' },
  { name: 'Berlin', lat: 52.5, lon: 13.4, color: '#00d9ff' },
  { name: 'Mumbai', lat: 19.1, lon: 72.9, color: '#ffcc00' },
  { name: 'Seoul', lat: 37.6, lon: 127, color: '#7a5cff' },
  { name: 'Lagos', lat: 6.5, lon: 3.4, color: '#ff3b3b' },
  { name: 'Toronto', lat: 43.7, lon: -79.4, color: '#00ff9c' },
];

function latLonToVec3(lat, lon, r = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const globeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#00ff9c" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.98, 16, 16]} />
        <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.03} />
      </mesh>

      {/* City points */}
      {CITIES.map((city) => {
        const pos = latLonToVec3(city.lat, city.lon);
        return (
          <group key={city.name} position={pos}>
            <mesh>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={city.color} />
            </mesh>
            {/* Glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.04, 0.07, 16]} />
              <meshBasicMaterial color={city.color} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function AttackLines() {
  const linesRef = useRef();
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    const generateAttack = () => {
      const from = CITIES[Math.floor(Math.random() * CITIES.length)];
      let to = CITIES[Math.floor(Math.random() * CITIES.length)];
      while (to.name === from.name) {
        to = CITIES[Math.floor(Math.random() * CITIES.length)];
      }
      return { from, to, id: Date.now() + Math.random(), progress: 0 };
    };

    const interval = setInterval(() => {
      setAttacks((prev) => [...prev.slice(-8), generateAttack()]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <group>
      {attacks.map((attack) => {
        const start = latLonToVec3(attack.from.lat, attack.from.lon);
        const end = latLonToVec3(attack.to.lat, attack.to.lon);
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(3);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(30);

        return (
          <group key={attack.id}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={points.length}
                  array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={attack.from.color} transparent opacity={0.4} />
            </line>
          </group>
        );
      })}
    </group>
  );
}

function AttackStats({ attacks }) {
  return (
    <div
      className="absolute top-4 left-4 p-3 rounded-lg"
      style={{
        background: 'rgba(5, 5, 5, 0.85)',
        border: '1px solid rgba(0, 255, 156, 0.2)',
        fontSize: '10px',
        minWidth: '180px',
      }}
    >
      <div className="font-bold mb-2 pb-1" style={{ color: '#00ff9c', borderBottom: '1px solid rgba(0,255,156,0.15)' }}>
        ◉ LIVE THREAT MAP
      </div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span style={{ color: '#666' }}>Active threats</span>
          <span style={{ color: '#ff3b3b' }}>{Math.floor(Math.random() * 50 + 100)}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#666' }}>Countries</span>
          <span style={{ color: '#00d9ff' }}>{CITIES.length}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#666' }}>Blocked</span>
          <span style={{ color: '#00ff9c' }}>{Math.floor(Math.random() * 200 + 300)}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#666' }}>Status</span>
          <span style={{ color: '#00ff9c' }}>MONITORING</span>
        </div>
      </div>
    </div>
  );
}

export default function AttackMap({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(5, 5, 5, 0.95)' }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 px-3 py-1.5 rounded text-xs cursor-pointer hover-glow"
        style={{
          background: 'rgba(5, 5, 5, 0.9)',
          border: '1px solid rgba(255, 59, 59, 0.3)',
          color: '#ff3b3b',
        }}
      >
        [ESC] Close
      </button>

      <AttackStats />

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Globe />
        <AttackLines />
        <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>

      <div
        className="absolute bottom-4 left-4 text-[10px] px-3 py-1.5 rounded"
        style={{
          background: 'rgba(5, 5, 5, 0.85)',
          border: '1px solid rgba(0, 255, 156, 0.2)',
          color: '#666',
        }}
      >
        Drag to rotate ∙ Scroll to zoom ∙ Simulated data
      </div>
    </motion.div>
  );
}
