import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  const angles = useRef({ angle1: 0, angle2: Math.PI });

  const shapeGeo = new THREE.SphereGeometry(30, 30, 30, 0, Math.PI * 2);
  const arr = shapeGeo.attributes.normal.array;
  for (let i = 0; i < arr.length; i += 2) arr[i] += 0.2;

  useFrame(() => {
    const { angle1, angle2 } = angles.current;

    if (light1Ref.current) {
      const newAngle1 = angle1 + 0.01;
      light1Ref.current.position.set(
        Math.cos(newAngle1) * 40,
        Math.cos(newAngle1) * 100,
        Math.sin(newAngle1) * 30
      );
      angles.current.angle1 = newAngle1;
    }

    if (light2Ref.current) {
      const newAngle2 = angle2 - 0.01;
      light2Ref.current.position.set(
        Math.cos(newAngle2) * 50,
        0,
        Math.sin(newAngle2) * 50
      );
      angles.current.angle2 = newAngle2;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <>
      {/* Ambient light for base visibility */}
      <ambientLight intensity={0.2} color={0x000000} />

      {/* Animated sphere */}
      <mesh ref={meshRef} geometry={shapeGeo} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={0xe0e0e0}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* Animated colored lights */}
      <pointLight ref={light1Ref} color={0xffffff} intensity={6} decay={0.8} />
      <pointLight
        ref={light2Ref}
        color={0xdddddd}
        intensity={6}
        decay={0.8}
        position={[50, -10, 80]}
      />
    </>
  );
}

export function ThreeSphere({
  width = 300,
  height = 300,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Canvas
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: "transparent",
      }}
    >
      <PerspectiveCamera makeDefault position={[50, 0, 0]} fov={75} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <AnimatedSphere />
    </Canvas>
  );
}
