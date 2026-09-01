# SceneLighting.tsx Documentation

## Overview

The `SceneLighting.tsx` file defines a React component responsible for setting up lighting in a 3D scene. This component adjusts the lighting based on the provided theme mode, which can be either "dark" or "light". The component utilizes several types of lights to create a realistic and dynamic lighting environment.

## Purpose

The primary purpose of the `SceneLighting` component is to configure and render different types of lights in a 3D scene, adjusting their properties based on the current theme mode. This allows for a visually consistent experience that adapts to the user's theme preference.

## Key Components

### Imports

- **`memo`**: Imported from React, this function is used to optimize the component by memoizing it, preventing unnecessary re-renders if the props have not changed.
- **`ThemeMode`**: A type imported from `@/lib/theme-types`, representing the theme mode, which can be either "dark" or "light".

### Types

- **`SceneLightingProps`**: A TypeScript type defining the props for the `SceneLightingComponent`. It includes:
  - `theme`: A `ThemeMode` indicating the current theme, which affects the lighting configuration.

### SceneLightingComponent

The `SceneLightingComponent` is a functional component that takes `SceneLightingProps` as its props. It destructures the `theme` from the props and determines if the theme is "dark" using the `isDark` boolean.

#### Lighting Elements

1. **`ambientLight`**: Provides a base level of light to the scene.
   - `intensity`: Set to `0.18` for dark mode and `0.32` for light mode.

2. **`hemisphereLight`**: Simulates light from the sky and ground.
   - `args`: An array containing:
     - Sky color: `#1e3a5f` for dark mode, `#e8f4fc` for light mode.
     - Ground color: `#020617` for dark mode, `#f1f5f9` for light mode.
     - Intensity: `0.45`.

3. **`directionalLight`**: Simulates sunlight with shadows.
   - `position`: `[6, 8, 4]`.
   - `intensity`: `0.85` for dark mode, `0.65` for light mode.
   - `color`: `#c7d8f0` for dark mode, `#ffffff` for light mode.
   - `castShadow`: Enables shadow casting.
   - `shadow-mapSize-width` and `shadow-mapSize-height`: Set to `1024`.
   - `shadow-camera-far`: `20`.
   - `shadow-camera-left`, `shadow-camera-right`, `shadow-camera-top`, `shadow-camera-bottom`: Define the shadow camera's bounds.
   - `shadow-bias`: `-0.0002`.

4. **`pointLight`** (Red Light):
   - `position`: `[-4, 2, 3]`.
   - `intensity`: `0.35` for dark mode, `0.2` for light mode.
   - `color`: `#c1272d`.
   - `distance`: `14`.

5. **`pointLight`** (Blue Light):
   - `position`: `[4, -1, 2]`.
   - `intensity`: `0.25` for dark mode, `0.15` for light mode.
   - `color`: `#3b82f6`.
   - `distance`: `12`.

### Export

- **`SceneLighting`**: The component is exported using `memo` to enhance performance by preventing unnecessary re-renders when the props remain unchanged.

## How It Works

The `SceneLightingComponent` adjusts the lighting setup based on the `theme` prop. It uses conditional logic to determine the properties of each light type, ensuring that the scene's lighting is appropriate for either a dark or light theme. The component is memoized to optimize rendering performance, making it efficient for use in dynamic 3D scenes where lighting conditions may change based on user preferences.