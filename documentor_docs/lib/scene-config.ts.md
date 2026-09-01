# Documentation Guide for `scene-config.ts`

This document provides a detailed explanation of the `scene-config.ts` file, which is part of a TypeScript project. The file is located at the path `lib/scene-config.ts`. It defines configurations for country markers on a globe and floating shapes, as well as some constants related to a 3D scene.

## Purpose

The primary purpose of this file is to define and export configurations for visual elements in a 3D scene. These configurations include country markers on a globe and various floating shapes. Additionally, it defines constants that are likely used to control aspects of the scene's appearance or behavior.

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

- **Description**: This type defines the structure for a country marker configuration.
- **Properties**:
  - `id`: A unique string identifier for the country marker.
  - `label`: A string representing the name of the country.
  - `latitude`: A number indicating the latitude of the country's location.
  - `longitude`: A number indicating the longitude of the country's location.

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

- **Description**: This is a read-only array of `CountryMarkerConfig` objects, representing markers for specific countries on a globe.
- **Usage**: Each object in the array specifies the `id`, `label`, `latitude`, and `longitude` for a country marker.

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

- **Description**: This type defines the structure for a floating shape configuration.
- **Properties**:
  - `id`: A unique string identifier for the floating shape.
  - `shape`: A string indicating the type of shape, which can be "octahedron", "torus", "icosahedron", or "box".
  - `position`: A tuple of three numbers representing the 3D position of the shape.
  - `scale`: A number indicating the scale of the shape.
  - `rotationSpeed`: A number representing the speed at which the shape rotates.
  - `floatSpeed`: A number indicating the speed at which the shape floats.
  - `floatIntensity`: A number representing the intensity of the floating motion.

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

- **Description**: This is a read-only array of `FloatingShapeConfig` objects, representing various floating shapes in the scene.
- **Usage**: Each object in the array specifies the `id`, `shape`, `position`, `scale`, `rotationSpeed`, `floatSpeed`, and `floatIntensity` for a floating shape.

### 5. Constants

- **GLOBE_RADIUS**

  ```typescript
  export const GLOBE_RADIUS = 1;
  ```

  - **Description**: A constant representing the radius of the globe. The value is set to `1`.

- **PARTICLE_COUNT_DARK**

  ```typescript
  export const PARTICLE_COUNT_DARK = 900;
  ```

  - **Description**: A constant representing the number of particles in a dark-themed scene. The value is set to `900`.

- **PARTICLE_COUNT_LIGHT**

  ```typescript
  export const PARTICLE_COUNT_LIGHT = 450;
  ```

  - **Description**: A constant representing the number of particles in a light-themed scene. The value is set to `450`.

## Conclusion

The `scene-config.ts` file is a configuration module that defines types and constants for managing country markers on a globe and floating shapes in a 3D scene. It provides structured data that can be used to render and animate these elements within a visualization or simulation environment.