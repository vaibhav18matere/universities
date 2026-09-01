# Documentation Guide for `scene-config.ts`

This document provides a detailed explanation of the `scene-config.ts` file, which is part of a TypeScript project. The file is located at the path `lib/scene-config.ts`. It defines configurations for country markers on a globe and floating shapes, as well as some constants related to a 3D scene.

## Purpose

The primary purpose of the `scene-config.ts` file is to define and export configurations for visual elements in a 3D scene. These configurations include:

1. **Country Markers**: Representations of specific countries on a globe with their geographical coordinates.
2. **Floating Shapes**: Configurations for various 3D shapes that float and rotate in the scene.
3. **Constants**: Values that define the globe's radius and particle counts for different themes.

## Key Components

### 1. CountryMarkerConfig Type

```typescript
export type CountryMarkerConfig = {
  readonly id: string;
  readonly label: string;
  readonly latitude: number;
  readonly longitude: number;
};
```

- **id**: A unique string identifier for the country marker.
- **label**: A string representing the name of the country.
- **latitude**: A number indicating the latitude of the country's location.
- **longitude**: A number indicating the longitude of the country's location.

### 2. globeCountryMarkers Array

```typescript
export const globeCountryMarkers: ReadonlyArray<CountryMarkerConfig> = [
  { id: "russia", label: "Russia", latitude: 55.75, longitude: 37.62 },
  { id: "georgia", label: "Georgia", latitude: 41.7151, longitude: 44.8271 },
  { id: "kazakhstan", label: "Kazakhstan", latitude: 51.1694, longitude: 71.4491 },
  { id: "uzbekistan", label: "Uzbekistan", latitude: 41.2995, longitude: 69.2401 },
  { id: "egypt", label: "Egypt", latitude: 30.0444, longitude: 31.2357 },
];
```

- This is a read-only array of `CountryMarkerConfig` objects, each representing a country with its geographical coordinates.

### 3. FloatingShapeConfig Type

```typescript
export type FloatingShapeConfig = {
  readonly id: string;
  readonly shape: "octahedron" | "torus" | "icosahedron" | "box";
  readonly position: readonly [number, number, number];
  readonly scale: number;
  readonly rotationSpeed: number;
  readonly floatSpeed: number;
  readonly floatIntensity: number;
};
```

- **id**: A unique string identifier for the floating shape.
- **shape**: A string indicating the type of shape. It can be one of "octahedron", "torus", "icosahedron", or "box".
- **position**: A tuple of three numbers representing the 3D position of the shape.
- **scale**: A number indicating the scale of the shape.
- **rotationSpeed**: A number representing the speed at which the shape rotates.
- **floatSpeed**: A number indicating the speed at which the shape floats.
- **floatIntensity**: A number representing the intensity of the floating motion.

### 4. floatingShapeConfigs Array

```typescript
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
```

- This is a read-only array of `FloatingShapeConfig` objects, each defining a floating shape's properties in the 3D scene.

### 5. Constants

```typescript
export const GLOBE_RADIUS = 1;
export const PARTICLE_COUNT_DARK = 900;
export const PARTICLE_COUNT_LIGHT = 450;
```

- **GLOBE_RADIUS**: A constant number representing the radius of the globe.
- **PARTICLE_COUNT_DARK**: A constant number indicating the particle count for a dark theme.
- **PARTICLE_COUNT_LIGHT**: A constant number indicating the particle count for a light theme.

## How It Works

The `scene-config.ts` file provides configuration data that can be used by other parts of the application to render a 3D scene. The country markers can be used to place markers on a globe at specific geographical locations. The floating shapes can be rendered with specified properties such as shape type, position, scale, and motion characteristics. The constants define the globe's size and particle counts for different visual themes.

By exporting these configurations and constants, the file allows other modules to import and utilize them to create a dynamic and interactive 3D scene.