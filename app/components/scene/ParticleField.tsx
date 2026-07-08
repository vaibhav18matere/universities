"use client";

import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  type Points,
} from "three";
import type { ThemeMode } from "@/lib/theme-types";
import {
  PARTICLE_COUNT_DARK,
  PARTICLE_COUNT_LIGHT,
} from "@/lib/scene-config";
import { useSceneInteraction } from "@/app/components/scene/SceneInteractionProvider";

type ParticleFieldProps = {
  readonly theme: ThemeMode;
};

function createParticleGeometry(count: number): BufferGeometry {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 28;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 18;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 16 - 6;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  return geometry;
}

function ParticleFieldComponent(props: ParticleFieldProps) {
  const { theme } = props;
  const isDark = theme === "dark";
  const pointsRef = useRef<Points>(null);
  const { scrollProgress, reducedMotion } = useSceneInteraction();
  const count = isDark ? PARTICLE_COUNT_DARK : PARTICLE_COUNT_LIGHT;

  const geometry = useMemo(() => createParticleGeometry(count), [count]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (points === null || reducedMotion) {
      return;
    }
    points.rotation.y += delta * 0.015;
    points.position.y = -scrollProgress.current * 0.8;
    const positions = points.geometry.attributes.position;
    const time = state.clock.elapsedTime;
    for (let index = 0; index < count; index += 1) {
      const yIndex = index * 3 + 1;
      positions.array[yIndex] +=
        Math.sin(time * 0.3 + index * 0.05) * 0.0004;
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={isDark ? 0.035 : 0.028}
        color={isDark ? "#94a3b8" : "#64748b"}
        transparent
        opacity={isDark ? 0.45 : 0.3}
        sizeAttenuation
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export const ParticleField = memo(ParticleFieldComponent);
