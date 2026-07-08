"use client";

import { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BackSide, type Group } from "three";
import type { ThemeMode } from "@/lib/theme-types";
import { GLOBE_RADIUS } from "@/lib/scene-config";
import { useSceneInteraction } from "@/app/components/scene/SceneInteractionProvider";
import { CountryMarkers } from "@/app/components/scene/CountryMarkers";

type GlobeProps = {
  readonly theme: ThemeMode;
};

function Atmosphere(props: { readonly radius: number; readonly isDark: boolean }) {
  const { radius, isDark } = props;

  return (
    <mesh scale={[1.08, 1.08, 1.08]}>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshBasicMaterial
        color={isDark ? "#5b9fd4" : "#7eb8e8"}
        transparent
        opacity={isDark ? 0.12 : 0.08}
        side={BackSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function GlobeMesh(props: { readonly isDark: boolean }) {
  const { isDark } = props;

  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshPhysicalMaterial
        color={isDark ? "#0c1a33" : "#1a3a5c"}
        emissive={isDark ? "#0a1628" : "#0d2847"}
        emissiveIntensity={0.35}
        metalness={0.15}
        roughness={0.65}
        clearcoat={0.4}
        clearcoatRoughness={0.3}
        reflectivity={0.5}
      />
    </mesh>
  );
}

function GlobeComponent(props: GlobeProps) {
  const { theme } = props;
  const isDark = theme === "dark";
  const groupRef = useRef<Group>(null);
  const { scrollProgress, reducedMotion } = useSceneInteraction();

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (group === null || reducedMotion) {
      return;
    }
    group.rotation.y += delta * 0.1;
    group.rotation.y += scrollProgress.current * delta * 0.04;
  });

  return (
    <group ref={groupRef} position={[1.6, -0.15, 0]} scale={1.05}>
      <GlobeMesh isDark={isDark} />
      <Atmosphere radius={GLOBE_RADIUS} isDark={isDark} />
      <CountryMarkers radius={GLOBE_RADIUS} isDark={isDark} />
    </group>
  );
}

export const Globe = memo(GlobeComponent);
