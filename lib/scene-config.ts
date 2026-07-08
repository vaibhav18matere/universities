export type CountryMarkerConfig = {
  readonly id: string;
  readonly label: string;
  readonly latitude: number;
  readonly longitude: number;
};

export const globeCountryMarkers: ReadonlyArray<CountryMarkerConfig> = [
  { id: "russia", label: "Russia", latitude: 55.75, longitude: 37.62 },
  { id: "georgia", label: "Georgia", latitude: 41.7151, longitude: 44.8271 },
  { id: "kazakhstan", label: "Kazakhstan", latitude: 51.1694, longitude: 71.4491 },
  { id: "uzbekistan", label: "Uzbekistan", latitude: 41.2995, longitude: 69.2401 },
  { id: "egypt", label: "Egypt", latitude: 30.0444, longitude: 31.2357 },
];

export type FloatingShapeConfig = {
  readonly id: string;
  readonly shape: "octahedron" | "torus" | "icosahedron" | "box";
  readonly position: readonly [number, number, number];
  readonly scale: number;
  readonly rotationSpeed: number;
  readonly floatSpeed: number;
  readonly floatIntensity: number;
};

export const floatingShapeConfigs: ReadonlyArray<FloatingShapeConfig> = [
  {
    id: "octa-1",
    shape: "octahedron",
    position: [-3.2, 1.8, -4],
    scale: 0.35,
    rotationSpeed: 0.15,
    floatSpeed: 1.2,
    floatIntensity: 0.4,
  },
  {
    id: "torus-1",
    shape: "torus",
    position: [3.4, 1.2, -5],
    scale: 0.5,
    rotationSpeed: 0.1,
    floatSpeed: 0.9,
    floatIntensity: 0.35,
  },
  {
    id: "ico-1",
    shape: "icosahedron",
    position: [-2.4, -1.6, -3],
    scale: 0.28,
    rotationSpeed: 0.12,
    floatSpeed: 1.4,
    floatIntensity: 0.3,
  },
  {
    id: "box-1",
    shape: "box",
    position: [2.8, -2, -4.5],
    scale: 0.25,
    rotationSpeed: 0.08,
    floatSpeed: 1.1,
    floatIntensity: 0.25,
  },
];

export const GLOBE_RADIUS = 1;

export const PARTICLE_COUNT_DARK = 900;

export const PARTICLE_COUNT_LIGHT = 450;
