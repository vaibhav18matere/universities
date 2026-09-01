# Documentation Guide for `scene-math.ts`

## Overview

The `scene-math.ts` file is a TypeScript module that provides utility functions for mathematical operations related to 3D scenes. It leverages the `Vector3` class from the `three` library to perform operations involving 3D vectors. The module includes functions to convert geographical coordinates to 3D vectors and to perform linear interpolation on numbers and vectors.

## Key Components

### Imports

- **`Vector3`**: Imported from the `three` library, `Vector3` is a class representing a 3D vector. It is used extensively in 3D graphics to represent points or directions in space.

### Functions

#### 1. `latLngToVector3`

```typescript
export function latLngToVector3(
  latitude: number,
  longitude: number,
  radius: number,
): Vector3 {
  const phi = ((90 - latitude) * Math.PI) / 180;
  const theta = ((longitude + 180) * Math.PI) / 180;
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new Vector3(x, y, z);
}
```

- **Purpose**: Converts geographical coordinates (latitude and longitude) into a 3D vector on a sphere of a given radius.
- **Parameters**:
  - `latitude`: The latitude in degrees.
  - `longitude`: The longitude in degrees.
  - `radius`: The radius of the sphere.
- **Returns**: A `Vector3` object representing the 3D coordinates on the sphere.
- **How it Works**: 
  - Converts latitude and longitude from degrees to radians.
  - Calculates the spherical coordinates `phi` and `theta`.
  - Computes the Cartesian coordinates `(x, y, z)` using trigonometric functions.
  - Returns a new `Vector3` instance with the calculated coordinates.

#### 2. `lerpValue`

```typescript
export function lerpValue(current: number, target: number, alpha: number): number {
  return current + (target - current) * alpha;
}
```

- **Purpose**: Performs linear interpolation between two numeric values.
- **Parameters**:
  - `current`: The starting value.
  - `target`: The target value.
  - `alpha`: The interpolation factor, typically between 0 and 1.
- **Returns**: A number representing the interpolated value.
- **How it Works**: 
  - Calculates the difference between the target and current values.
  - Scales this difference by the interpolation factor `alpha`.
  - Adds the scaled difference to the current value to get the interpolated result.

#### 3. `lerpVector3`

```typescript
export function lerpVector3(
  current: Vector3,
  target: Vector3,
  alpha: number,
): Vector3 {
  current.x = lerpValue(current.x, target.x, alpha);
  current.y = lerpValue(current.y, target.y, alpha);
  current.z = lerpValue(current.z, target.z, alpha);
  return current;
}
```

- **Purpose**: Performs linear interpolation between two `Vector3` objects.
- **Parameters**:
  - `current`: The starting `Vector3`.
  - `target`: The target `Vector3`.
  - `alpha`: The interpolation factor, typically between 0 and 1.
- **Returns**: The `current` `Vector3` object after being modified to the interpolated state.
- **How it Works**: 
  - Uses the `lerpValue` function to interpolate each component (`x`, `y`, `z`) of the `Vector3`.
  - Updates the `current` vector with the interpolated values.
  - Returns the modified `current` vector.

## Usage

This module is useful in 3D graphics applications where geographical data needs to be visualized on a 3D sphere, such as a globe. The interpolation functions are helpful for smooth transitions and animations between states in a 3D scene.