"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MousePosition = {
  readonly x: number;
  readonly y: number;
};

export type SceneInteractionValue = {
  readonly scrollProgress: MutableRefObject<number>;
  readonly mouse: MutableRefObject<MousePosition>;
  readonly reducedMotion: boolean;
};

const SceneInteractionContext = createContext<SceneInteractionValue | null>(
  null,
);

type SceneInteractionProviderProps = {
  readonly children: ReactNode;
};

function readReducedMotionPreference(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SceneInteractionProvider(props: SceneInteractionProviderProps) {
  const { children } = props;
  const scrollProgress = useRef(0);
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(readReducedMotionPreference());
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    function handleMouseMove(event: MouseEvent): void {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      scrollTrigger.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      window.clearTimeout(refreshTimer);
    };
  }, [reducedMotion]);

  const value = useMemo(
    () => ({
      scrollProgress,
      mouse,
      reducedMotion,
    }),
    [reducedMotion],
  );

  return (
    <SceneInteractionContext.Provider value={value}>
      {children}
    </SceneInteractionContext.Provider>
  );
}

export function useSceneInteraction(): SceneInteractionValue {
  const context = useContext(SceneInteractionContext);
  if (context === null) {
    throw new Error(
      "useSceneInteraction must be used within SceneInteractionProvider",
    );
  }
  return context;
}
