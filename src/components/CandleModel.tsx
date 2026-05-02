import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface CandleModelProps {
  color: string;
  isActive: boolean;
}

const Flame = ({ color, isActive }: { color: string; isActive: boolean }) => {
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (flameRef.current) {
      // Oscillating movement for flame
      flameRef.current.position.x = Math.sin(state.clock.elapsedTime * 8) * 0.01;
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.1;
    }
    if (lightRef.current) {
      lightRef.current.intensity = (isActive ? 6 : 3) + Math.sin(state.clock.elapsedTime * 20) * 1.2;
    }
  });

  return (
    <group position={[0, 0.65, 0]}>
      {/* Real Flame Look */}
      <mesh ref={flameRef}>
        <coneGeometry args={[0.08, 0.3, 16]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 8 : 4}
          distort={0.4}
          speed={6}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner Core */}
      <mesh position={[0, -0.05, 0]} scale={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={10} />
      </mesh>

      {/* Point Light for the flicker */}
      <pointLight
        ref={lightRef}
        position={[0, 0.1, 0]}
        color={color}
        distance={isActive ? 15 : 10}
        decay={1.5}
      />
    </group>
  );
};

export const CandleModel: React.FC<CandleModelProps> = ({ color, isActive }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.8, 0.8, 2, 64);
  }, []);

  return (
    <Float speed={isActive ? 3 : 1.5} rotationIntensity={isActive ? 0.8 : 0.3} floatIntensity={0.5}>
      <group>
        {/* Candle Body / Vessel */}
        <mesh ref={meshRef} position={[0, -0.5, 0]} geometry={geometry}>
          <meshStandardMaterial 
            color="#111" 
            roughness={0.05} 
            metalness={0.9}
            emissive={color}
            emissiveIntensity={isActive ? 0.15 : 0.05}
          />
        </mesh>
        
        {/* Subtle inner wax look */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.05, 32]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>

        {/* The Wick */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        <Flame color={color} isActive={isActive} />

        {/* Ambient Glow */}
        {isActive && (
           <Sparkles 
            count={80} 
            scale={5} 
            size={3} 
            speed={0.8} 
            color={color} 
            opacity={0.4}
          />
        )}
      </group>
    </Float>
  );
};
