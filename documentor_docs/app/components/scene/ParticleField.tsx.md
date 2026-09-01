# ParticleField.tsx Documentation

## Overview

The `ParticleField.tsx` file defines a React component that renders a field of animated particles using the `three.js` library and `@react-three/fiber`. This component is designed to be used within a 3D scene, and its appearance and behavior are influenced by the current theme mode (dark or light) and user interactions such as scrolling.

## Key Components

### Imports

- **React and Hooks**: The component uses `memo`, `useMemo`, and `useRef` from React to optimize rendering and manage references to the 3D objects.
- **@react-three/fiber**: The `useFrame` hook is used to update the animation frame-by-frame.
- **three.js**: The component uses `AdditiveBlending`, `BufferAttribute`, and `BufferGeometry` from `three.js` to create and manage the particle system.
- **ThemeMode**: A type imported from `@/lib/theme-types` to define the theme mode.
- **Scene Configuration**: Constants `PARTICLE_COUNT_DARK` and `PARTICLE_COUNT_LIGHT` are imported from `@/lib/scene-config` to determine the number of particles based on the theme.
- **Scene Interaction**: The `useSceneInteraction` hook is imported from `SceneInteractionProvider` to access interaction states like `scrollProgress` and `reducedMotion`.

### Types

- **ParticleFieldProps**: A TypeScript type defining the props for the `ParticleFieldComponent`. It includes:
  - `theme`: A `ThemeMode` indicating the current theme (either "dark" or "light").

### Functions

#### `createParticleGeometry`

- **Purpose**: Generates a `BufferGeometry` for the particles.
- **Parameters**: 
  - `count`: The number of particles to generate.
- **Logic**: 
  - Creates a `Float32Array` to store the positions of the particles.
  - Iterates over the count to assign random positions within a specified range.
  - Sets the positions as a `BufferAttribute` on a new `BufferGeometry` object.
- **Returns**: A `BufferGeometry` object with the particle positions.

### Component: `ParticleFieldComponent`

- **Props**: Accepts `ParticleFieldProps` which includes the `theme`.
- **Refs**: 
  - `pointsRef`: A reference to the `Points` object in the scene.
- **State and Effects**:
  - Determines if the theme is dark or light.
  - Uses `useMemo` to create the particle geometry only when the particle count changes.
  - Uses `useFrame` to update the particle positions and rotation on each frame.
- **Animation Logic**:
  - Rotates the particle field around the Y-axis.
  - Adjusts the Y-position of the particle field based on `scrollProgress`.
  - Modifies the Y-position of each particle to create a wave-like motion using a sine function.
- **Rendering**:
  - Returns a `<points>` element with a `geometry` and a `pointsMaterial`.
  - The material properties (size, color, opacity) are determined by the theme.
  - Uses `AdditiveBlending` for the material to create a glowing effect.

### Export

- **`ParticleField`**: The component is exported using `memo` to optimize rendering by preventing unnecessary re-renders.

## Usage

The `ParticleField` component can be used within a 3D scene to add a dynamic particle effect. It responds to theme changes and user interactions, such as scrolling, to create an engaging visual experience. The component is optimized for performance using React's `memo` and `useMemo` hooks.