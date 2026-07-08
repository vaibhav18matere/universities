"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3 } from "three";
import { lerpVector3 } from "@/lib/scene-math";
import { useSceneInteraction } from "@/app/components/scene/SceneInteractionProvider";

const CAMERA_LERP = 0.045;

export function CameraRig() {
  const { camera } = useThree();
  const { scrollProgress, mouse, reducedMotion } = useSceneInteraction();
  const targetPosition = useMemo(() => new Vector3(), []);
  const lookAtTarget = useMemo(() => new Vector3(0.4, 0, 0), []);

  useFrame(() => {
    const scroll = scrollProgress.current;
    const parallaxX = reducedMotion ? 0 : mouse.current.x * 0.22;
    const parallaxY = reducedMotion ? 0 : mouse.current.y * 0.14;

    targetPosition.set(
      0.2 + scroll * 0.6 + parallaxX,
      0.15 - scroll * 0.55 + parallaxY,
      5.2 + scroll * 1.1,
    );

    if (reducedMotion) {
      camera.position.copy(targetPosition);
    } else {
      lerpVector3(camera.position, targetPosition, CAMERA_LERP);
    }

    lookAtTarget.set(0.5 + scroll * 0.15, -scroll * 0.1, 0);
    camera.lookAt(lookAtTarget);
  });

  return null;
}
