"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";

function CurvedImage({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Safe manual texture loading to avoid React Suspense crash on CORS failure
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      imageUrl,
      (tex) => setTexture(tex),
      undefined,
      (err) => console.warn("Texture failed to load via WebGL (CORS):", err),
    );
  }, [imageUrl]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Tilt based on normalized mouse position
    const targetX = state.pointer.y * -0.15;
    const targetY = state.pointer.x * 0.15;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetX,
      0.05,
    );
    // Base rotation Y is to face camera (Math.PI / 2 depends on where the arc is drawn)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetY,
      0.05,
    );
  });

  if (!texture) return null;

  return (
    <group>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[8, 8, 4.5, 64, 1, true, -0.5, 1]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.8}
        scale={20}
        blur={2.5}
        far={4}
        color="#000000"
        frames={1}
        resolution={256}
      />
    </group>
  );
}

export default function Hero3DPanel({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-auto mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <CurvedImage imageUrl={videoUrl} />
        </group>
      </Canvas>
    </div>
  );
}
