"use client";

import { Stars } from "@react-three/drei";
import { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { ThemeMode } from "@/lib/theme-types";
import { useSceneInteraction } from "@/app/components/scene/SceneInteractionProvider";

type StarFieldProps = {
  readonly theme: ThemeMode;
};

function StarFieldComponent(props: StarFieldProps) {
  const { theme } = props;
  const groupRef = useRef<Group>(null);
  const isDark = theme === "dark";
  const { scrollProgress, reducedMotion } = useSceneInteraction();

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (group === null || reducedMotion) {
      return;
    }
    group.rotation.y += delta * (isDark ? 0.012 : 0.006);
    group.position.z = -scrollProgress.current * 0.5;
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={140}
        depth={70}
        count={isDark ? 4000 : 1800}
        factor={isDark ? 4 : 2}
        saturation={isDark ? 0.08 : 0.2}
        fade
        speed={isDark ? 0.4 : 0.25}
      />
    </group>
  );
}

export const StarField = memo(StarFieldComponent);
