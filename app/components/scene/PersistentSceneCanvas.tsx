"use client";

import { Canvas } from "@react-three/fiber";
import { memo, Suspense } from "react";
import { ACESFilmicToneMapping } from "three";
import type { ThemeMode } from "@/lib/theme-types";
import { CameraRig } from "@/app/components/scene/CameraRig";
import { FloatingShapes } from "@/app/components/scene/FloatingShapes";
import { Globe } from "@/app/components/scene/Globe";
import { ParticleField } from "@/app/components/scene/ParticleField";
import { SceneLighting } from "@/app/components/scene/SceneLighting";
import { StarField } from "@/app/components/scene/StarField";

type PersistentSceneCanvasProps = {
  readonly theme: ThemeMode;
};

function SceneContent(props: PersistentSceneCanvasProps) {
  const { theme } = props;

  return (
    <>
      <SceneLighting theme={theme} />
      <CameraRig />
      <StarField theme={theme} />
      <ParticleField theme={theme} />
      <FloatingShapes theme={theme} />
      <Globe theme={theme} />
    </>
  );
}

function PersistentSceneCanvasComponent(props: PersistentSceneCanvasProps) {
  const { theme } = props;

  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.5], fov: 45, near: 0.1, far: 200 }}
      dpr={[1, 1.5]}
      shadows
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: theme === "dark" ? 1.15 : 1.05,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["transparent"]} />
      <fog attach="fog" args={[theme === "dark" ? "#020617" : "#f8fafc", 8, 28]} />
      <Suspense fallback={null}>
        <SceneContent theme={theme} />
      </Suspense>
    </Canvas>
  );
}

export const PersistentSceneCanvas = memo(PersistentSceneCanvasComponent);
