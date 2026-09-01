# PersistentSceneCanvas.tsx Documentation

## Overview

The `PersistentSceneCanvas.tsx` file defines a React component that utilizes the `@react-three/fiber` library to render a 3D scene within a web application. This component is designed to be responsive to theme changes and provides a rich 3D experience with various visual elements such as lighting, camera rigging, and multiple 3D objects.

## Purpose

The primary purpose of the `PersistentSceneCanvas` component is to render a 3D scene that adapts to different theme modes (e.g., light or dark). It achieves this by adjusting visual properties such as tone mapping and fog color based on the current theme.

## Key Components

### 1. **PersistentSceneCanvasProps**

This is a TypeScript type definition that specifies the props accepted by the `PersistentSceneCanvasComponent`. It includes:

- `theme`: A `ThemeMode` type that determines the visual theme of the scene.

### 2. **SceneContent**

A functional component that renders the various elements of the 3D scene. It accepts `PersistentSceneCanvasProps` and includes:

- `SceneLighting`: Configures the lighting of the scene based on the theme.
- `CameraRig`: Manages the camera setup and movement.
- `StarField`: Renders a field of stars, with appearance affected by the theme.
- `ParticleField`: Displays a field of particles, also theme-dependent.
- `FloatingShapes`: Renders floating shapes within the scene, influenced by the theme.
- `Globe`: Displays a globe object, with its appearance modified by the theme.

### 3. **PersistentSceneCanvasComponent**

This is the main component that sets up the 3D canvas using the `Canvas` component from `@react-three/fiber`. It configures the following:

- **Camera Settings**: Positioned at `[0, 0.2, 5.5]` with a field of view (`fov`) of 45, and near and far clipping planes set to 0.1 and 200, respectively.
- **Device Pixel Ratio (`dpr`)**: Set to `[1, 1.5]` to ensure high-quality rendering on different devices.
- **Shadows**: Enabled to enhance the realism of the scene.
- **WebGL Context (`gl`)**: Configured with:
  - `alpha`: Set to `true` for transparency.
  - `antialias`: Enabled for smoother edges.
  - `powerPreference`: Set to `"high-performance"` for optimal rendering.
  - `toneMapping`: Uses `ACESFilmicToneMapping` for realistic color grading.
  - `toneMappingExposure`: Adjusted based on the theme (`1.15` for dark, `1.05` for light).
- **Style**: The canvas is styled to occupy the full width and height of its container.

### 4. **Scene Configuration**

- **Background Color**: Set to transparent.
- **Fog**: Configured with different colors and distances based on the theme (`#020617` for dark, `#f8fafc` for light, with near and far distances of 8 and 28, respectively).

### 5. **Suspense**

The `Suspense` component is used to handle the loading state of the `SceneContent`. It currently uses a `null` fallback, meaning no content is displayed while loading.

### 6. **Memoization**

The `PersistentSceneCanvasComponent` is wrapped with `memo` to optimize rendering performance by preventing unnecessary re-renders when props have not changed.

## Usage

To use the `PersistentSceneCanvas` component, import it into a React component and provide the required `theme` prop. This will render the 3D scene with the specified theme settings.

```jsx
import { PersistentSceneCanvas } from 'app/components/scene/PersistentSceneCanvas';

// Example usage
<PersistentSceneCanvas theme="dark" />
```

This component is ideal for applications that require dynamic 3D visualizations that respond to theme changes, providing an immersive user experience.