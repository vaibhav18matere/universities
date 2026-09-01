# Scene Math Library Documentation

This document provides a detailed explanation of the `scene-math.ts` file, which is part of a library designed to perform mathematical operations related to 3D scenes. The file contains functions that convert geographical coordinates to 3D vectors and perform linear interpolation on numbers and vectors.

## File Path

`lib/scene-math.ts`

## Overview

The `scene-math.ts` file contains three primary functions:

1. `latLngToVector3`: Converts latitude and longitude coordinates into a 3D vector.
2. `lerpValue`: Performs linear interpolation between two numeric values.
3. `lerpVector3`: Performs linear interpolation between two 3D vectors.

These functions are useful in 3D graphics programming, particularly when working with geographical data and animations.

## Key Components

### Imports

```typescript
import { Vector3 } from "three";
```

- **`Vector3`**: This is a class imported from the `three` library, which represents a 3D vector. It is used to store and manipulate 3D coordinates.

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
  - Calculates the spherical coordinates (`phi` and `theta`).
  - Computes the Cartesian coordinates (`x`, `y`, `z`) using trigonometric functions.
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
  - `alpha`: The interpolation factor (typically between 0 and 1).
- **Returns**: A number representing the interpolated value.
- **How it Works**: 
  - Calculates the difference between the target and current values.
  - Multiplies the difference by the interpolation factor `alpha`.
  - Adds the result to the current value to get the interpolated value.

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
  - `alpha`: The interpolation factor (typically between 0 and 1).
- **Returns**: The `current` `Vector3` object after interpolation.
- **How it Works**: 
  - Uses the `lerpValue` function to interpolate each component (`x`, `y`, `z`) of the `Vector3`.
  - Updates the `current` vector with the interpolated values.
  - Returns the updated `current` vector.

## Conclusion

The `scene-math.ts` file provides essential mathematical functions for converting geographical coordinates to 3D vectors and performing linear interpolation on numbers and vectors. These functions are crucial for applications involving 3D graphics and animations, particularly when dealing with geographical data.