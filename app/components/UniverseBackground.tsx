"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/app/components/ThemeProvider";
import { SceneInteractionProvider } from "@/app/components/scene/SceneInteractionProvider";

const PersistentSceneCanvas = dynamic(
  () =>
    import("@/app/components/scene/PersistentSceneCanvas").then((module) => ({
      default: module.PersistentSceneCanvas,
    })),
  { ssr: false },
);

export function UniverseBackground() {
  const { theme } = useTheme();

  return (
    <SceneInteractionProvider>
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 opacity-80 transition-opacity duration-700 dark:opacity-90">
          <PersistentSceneCanvas theme={theme} />
        </div>
        <div className="glass-overlay pointer-events-none absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(193,39,45,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_20%_0%,rgba(225,29,72,0.07)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(0,33,71,0.04)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_80%_100%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
      </div>
    </SceneInteractionProvider>
  );
}
