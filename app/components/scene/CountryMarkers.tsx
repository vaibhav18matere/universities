"use client";

import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Group } from "three";
import { globeCountryMarkers } from "@/lib/scene-config";
import { latLngToVector3 } from "@/lib/scene-math";

type CountryMarkersProps = {
  readonly radius: number;
  readonly isDark: boolean;
};

type MarkerData = {
  readonly id: string;
  readonly position: [number, number, number];
};

function CountryMarkersComponent(props: CountryMarkersProps) {
  const { radius, isDark } = props;
  const groupRef = useRef<Group>(null);

  const markers = useMemo((): ReadonlyArray<MarkerData> => {
    return globeCountryMarkers.map((country) => ({
      id: country.id,
      position: latLngToVector3(
        country.latitude,
        country.longitude,
        radius * 1.015,
      ).toArray() as [number, number, number],
    }));
  }, [radius]);

  useFrame((state) => {
    const group = groupRef.current;
    if (group === null) {
      return;
    }
    const time = state.clock.elapsedTime;
    group.children.forEach((child, index) => {
      const pulse = 1 + Math.sin(time * 1.8 + index * 1.2) * 0.25;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {markers.map((marker) => (
        <group key={marker.id} position={marker.position}>
          <mesh>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshBasicMaterial
              color={isDark ? "#fb7185" : "#c1272d"}
              transparent
              opacity={isDark ? 0.95 : 0.85}
            />
          </mesh>
          <mesh scale={[2.2, 2.2, 2.2]}>
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshBasicMaterial
              color={isDark ? "#e11d48" : "#c1272d"}
              transparent
              opacity={isDark ? 0.2 : 0.12}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export const CountryMarkers = memo(CountryMarkersComponent);
