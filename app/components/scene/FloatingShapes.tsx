"use client";

import { memo, useRef } from "react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import type { ThemeMode } from "@/lib/theme-types";
import { floatingShapeConfigs } from "@/lib/scene-config";
import type { FloatingShapeConfig } from "@/lib/scene-config";

type FloatingShapesProps = {
  readonly theme: ThemeMode;
};

type ShapeMeshProps = {
  readonly config: FloatingShapeConfig;
  readonly isDark: boolean;
};

function ShapeGeometry(props: { readonly shape: FloatingShapeConfig["shape"] }) {
  const { shape } = props;
  if (shape === "octahedron") {
    return <octahedronGeometry args={[1, 0]} />;
  }
  if (shape === "torus") {
    return <torusGeometry args={[0.6, 0.18, 16, 32]} />;
  }
  if (shape === "icosahedron") {
    return <icosahedronGeometry args={[1, 0]} />;
  }
  return <boxGeometry args={[1, 1, 1]} />;
}

function FloatingShapeMesh(props: ShapeMeshProps) {
  const { config, isDark } = props;
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (mesh === null) {
      return;
    }
    mesh.rotation.x += delta * config.rotationSpeed;
    mesh.rotation.y += delta * config.rotationSpeed * 0.7;
  });

  return (
    <Float
      speed={config.floatSpeed}
      rotationIntensity={0.15}
      floatIntensity={config.floatIntensity}
    >
      <mesh
        ref={meshRef}
        position={config.position}
        scale={config.scale}
        castShadow
      >
        <ShapeGeometry shape={config.shape} />
        <meshPhysicalMaterial
          color={isDark ? "#1e293b" : "#cbd5e1"}
          emissive={isDark ? "#0f172a" : "#e2e8f0"}
          emissiveIntensity={0.2}
          metalness={0.35}
          roughness={0.4}
          transparent
          opacity={isDark ? 0.35 : 0.25}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingShapesComponent(props: FloatingShapesProps) {
  const { theme } = props;
  const isDark = theme === "dark";

  return (
    <group>
      {floatingShapeConfigs.map((config) => (
        <FloatingShapeMesh
          key={config.id}
          config={config}
          isDark={isDark}
        />
      ))}
    </group>
  );
}

export const FloatingShapes = memo(FloatingShapesComponent);
