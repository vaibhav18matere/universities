"use client";

import { memo } from "react";
import type { ThemeMode } from "@/lib/theme-types";

type SceneLightingProps = {
  readonly theme: ThemeMode;
};

function SceneLightingComponent(props: SceneLightingProps) {
  const { theme } = props;
  const isDark = theme === "dark";

  return (
    <>
      <ambientLight intensity={isDark ? 0.18 : 0.32} />
      <hemisphereLight
        args={[isDark ? "#1e3a5f" : "#e8f4fc", isDark ? "#020617" : "#f1f5f9", 0.45]}
      />
      <directionalLight
        position={[6, 8, 4]}
        intensity={isDark ? 0.85 : 0.65}
        color={isDark ? "#c7d8f0" : "#ffffff"}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0002}
      />
      <pointLight
        position={[-4, 2, 3]}
        intensity={isDark ? 0.35 : 0.2}
        color="#c1272d"
        distance={14}
      />
      <pointLight
        position={[4, -1, 2]}
        intensity={isDark ? 0.25 : 0.15}
        color="#3b82f6"
        distance={12}
      />
    </>
  );
}

export const SceneLighting = memo(SceneLightingComponent);
