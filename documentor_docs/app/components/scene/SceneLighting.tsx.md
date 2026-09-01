# SceneLighting.tsx Documentation

## Overview

The `SceneLighting.tsx` file defines a React component responsible for setting up lighting in a 3D scene. This component adjusts the lighting based on the provided theme mode, which can be either "dark" or "light". The component utilizes several types of lights to create a realistic and dynamic lighting environment.

## Purpose

The primary purpose of the `SceneLighting` component is to configure and render different types of lights in a 3D scene, adjusting their properties based on the current theme mode. This allows for a visually consistent experience that adapts to the user's theme preference.

## Key Components

### Imports

- **`memo`**: Imported from React, this function is used to optimize the component by memoizing it, preventing unnecessary re-renders if the props do not change.
- **`ThemeMode`**: A type imported from `@/lib/theme-types`, representing the theme mode, which can be either "dark" or "light".

### Types

- **`SceneLightingProps`**: A TypeScript type defining the props for the `SceneLightingComponent`. It includes:
  - `theme`: A `ThemeMode` indicating the current theme, which affects the lighting configuration.

### SceneLightingComponent

The `SceneLightingComponent` is a functional component that takes `SceneLightingProps` as its props. It destructures the `theme` from the props and determines if the theme is "dark" using the `isDark` boolean.

#### Lighting Elements

1. **`ambientLight`**: 
   - Provides ambient lighting to the scene.
   - Intensity is set to `0.18` for dark mode and `0.32` for light mode.

2. **`hemisphereLight`**:
   - Simulates a light source coming from above, with a sky color and a ground color.
   - Colors and intensity are adjusted based on the theme:
     - Dark mode: Sky color `#1e3a5f`, ground color `#020617`, intensity `0.45`.
     - Light mode: Sky color `#e8f4fc`, ground color `#f1f5f9`, intensity `0.45`.

3. **`directionalLight`**:
   - Represents a directional light source, similar to sunlight.
   - Positioned at `[6, 8, 4]`.
   - Intensity and color vary with the theme:
     - Dark mode: Intensity `0.85`, color `#c7d8f0`.
     - Light mode: Intensity `0.65`, color `#ffffff`.
   - Casts shadows with specific shadow map size and camera settings.

4. **`pointLight` (Red)**:
   - Positioned at `[-4, 2, 3]`.
   - Intensity is `0.35` for dark mode and `0.2` for light mode.
   - Color is fixed at `#c1272d`.
   - Affects objects within a distance of `14`.

5. **`pointLight` (Blue)**:
   - Positioned at `[4, -1, 2]`.
   - Intensity is `0.25` for dark mode and `0.15` for light mode.
   - Color is fixed at `#3b82f6`.
   - Affects objects within a distance of `12`.

### Export

- **`SceneLighting`**: The component is exported using `memo` to enhance performance by preventing unnecessary re-renders when the props remain unchanged.

## How It Works

The `SceneLighting` component dynamically configures the lighting setup based on the `theme` prop. By adjusting the intensity, color, and other properties of the lights, it ensures that the scene's appearance is consistent with the user's theme preference. The use of `memo` optimizes the component's performance by avoiding re-renders unless the `theme` prop changes.