"use client";

import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";

function CurvedImage({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use core useLoader to safely configure CORS
  const texture = useLoader(THREE.TextureLoader, imageUrl, (loader) => {
    loader.setCrossOrigin("anonymous");
  });
  
  // Create a subtle curve: Radius=10, Height=4.5, Width~=8 (16:9 ratio)
  // thetaLength = 0.8 radians
  // We offset thetaStart so the center of the arc is at 0 or Pi/2 etc.
  // Then we will rotate the mesh to face the camera.
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Tilt based on normalized mouse position
    const targetX = state.pointer.y * -0.15; 
    const targetY = state.pointer.x * 0.15; 
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
    // Base rotation Y is to face camera (Math.PI / 2 depends on where the arc is drawn)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        {/* Radius 8, Height 4.5, 64 radial segments, 1 height segment, openEnded, thetaStart 0, thetaLength 1 */}
        {/* We use scale to flip it inside out if necessary, and side=DoubleSide */}
        <cylinderGeometry args={[8, 8, 4.5, 64, 1, true, -0.5, 1]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      
      <ContactShadows 
        position={[0, -2.5, 0]} 
        opacity={0.8} 
        scale={20} 
        blur={2.5} 
        far={4} 
        color="#000000"
      />
    </group>
  );
}

export default function Hero3DPanel({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-auto mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <Suspense fallback={null}>
          {/* We rotate the whole group so the cylinder segment faces the camera */}
          <group rotation={[0, Math.PI / 2, 0]}>
            <CurvedImage imageUrl={videoUrl} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
