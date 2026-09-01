# CameraRig Component Documentation

## Overview

The `CameraRig` component is a React component designed to manipulate the camera's position and orientation within a 3D scene using the `@react-three/fiber` library. It dynamically adjusts the camera's position based on user interactions such as scrolling and mouse movements, providing a parallax effect. The component is intended to be used within a React application that utilizes Three.js for rendering 3D graphics.

## Key Components

### Imports

- **`useFrame` and `useThree` from `@react-three/fiber`:** These hooks are used to interact with the Three.js rendering loop and access the Three.js scene, respectively.
- **`useMemo` from `react`:** This hook is used to memoize values to optimize performance by preventing unnecessary recalculations.
- **`Vector3` from `three`:** A class representing a 3D vector, used for defining positions and directions in 3D space.
- **`lerpVector3` from `@/lib/scene-math`:** A utility function for linearly interpolating between two `Vector3` objects.
- **`useSceneInteraction` from `@/app/components/scene/SceneInteractionProvider`:** A custom hook that provides interaction data such as scroll progress and mouse position.

### Constants

- **`CAMERA_LERP`:** A constant value set to `0.045`, used as the interpolation factor for smoothing camera movements.

### Component Function: `CameraRig`

- **`camera`:** Extracted from the `useThree` hook, representing the active camera in the scene.
- **`scrollProgress`, `mouse`, `reducedMotion`:** Extracted from the `useSceneInteraction` hook, providing the current scroll progress, mouse position, and a flag indicating whether motion effects should be reduced.

### Memoized Values

- **`targetPosition`:** A `Vector3` object initialized to `(0, 0, 0)`, representing the target position for the camera.
- **`lookAtTarget`:** A `Vector3` object initialized to `(0.4, 0, 0)`, representing the point the camera should look at.

### `useFrame` Hook

The `useFrame` hook is used to update the camera's position and orientation on each frame of the rendering loop:

1. **Scroll and Parallax Calculations:**
   - `scroll`: Current scroll progress.
   - `parallaxX` and `parallaxY`: Calculated based on the mouse position and `reducedMotion` flag. If `reducedMotion` is true, parallax effects are disabled.

2. **Target Position Calculation:**
   - The `targetPosition` is updated based on scroll and parallax values, affecting the camera's x, y, and z coordinates.

3. **Camera Position Update:**
   - If `reducedMotion` is true, the camera's position is directly set to `targetPosition`.
   - Otherwise, the camera's position is smoothly interpolated towards `targetPosition` using `lerpVector3` and `CAMERA_LERP`.

4. **Camera Orientation:**
   - The `lookAtTarget` is updated based on the scroll value, and the camera is oriented to look at this target.

### Return Value

The `CameraRig` component returns `null` as it does not render any visible elements. Its sole purpose is to manipulate the camera within the 3D scene.

## Conclusion

The `CameraRig` component is a crucial part of a 3D scene, providing dynamic camera movements based on user interactions. By leveraging hooks and utility functions, it efficiently updates the camera's position and orientation to create an engaging visual experience.