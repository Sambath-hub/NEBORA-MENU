import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { CandleModel } from "./CandleModel";
import { Product } from "../constants";

interface SceneProps {
  activeProduct: Product;
}

export const Scene: React.FC<SceneProps> = ({ activeProduct }) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
        
        <ambientLight intensity={0.1} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
          castShadow 
        />

        <Suspense fallback={null}>
          <Environment preset="night" />
          <group position={[0, -0.5, -2]}>
            <CandleModel color={activeProduct.color} isActive={true} />
            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.6}
              scale={12}
              blur={2.5}
              far={5}
            />
          </group>
        </Suspense>

        {/* Background Depth */}
        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial 
            color="#050505" 
            metalness={0.5} 
            roughness={1} 
          />
        </mesh>
      </Canvas>
    </div>
  );
};
