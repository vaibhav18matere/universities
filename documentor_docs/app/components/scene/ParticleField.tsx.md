# ParticleField.tsx Documentation

## Overview

The `ParticleField.tsx` file defines a React component that renders a field of animated particles using the `three.js` library and `@react-three/fiber`. This component is designed to be used within a 3D scene, and its appearance and behavior are influenced by the current theme mode (dark or light) and user interactions such as scrolling.

## Key Components

### Imports

- **React and Hooks**: 
  - `memo`, `useMemo`, `useRef` from React are used for performance optimization and managing references.
- **@react-three/fiber**: 
  - `useFrame` is used to execute animations on each frame.
- **three.js**: 
  - `AdditiveBlending`, `BufferAttribute`, `BufferGeometry`, and `Points` are used to create and manage 3D objects and their properties.
- **ThemeMode**: 
  - A type imported from `theme-types` to define the theme mode.
- **Scene Configuration**: 
  - `PARTICLE_COUNT_DARK`, `PARTICLE_COUNT_LIGHT` are constants that define the number of particles based on the theme.
- **Scene Interaction**: 
  - `useSceneInteraction` is a custom hook that provides interaction data such as `scrollProgress` and `reducedMotion`.

### Types

- **ParticleFieldProps**: 
  - A TypeScript type defining the props for the `ParticleFieldComponent`, specifically the `theme` property of type `ThemeMode`.

### Functions

#### `createParticleGeometry`

- **Purpose**: 
  - Generates a `BufferGeometry` object with randomly positioned particles.
- **Parameters**: 
  - `count`: The number of particles to generate.
- **Returns**: 
  - A `BufferGeometry` object with positions set for each particle.

#### `ParticleFieldComponent`

- **Purpose**: 
  - The main component that renders the particle field.
- **Props**: 
  - `theme`: Determines the appearance and number of particles based on the theme mode.
- **Internal Logic**:
  - Determines if the theme is dark or light.
  - Uses `useRef` to maintain a reference to the `Points` object.
  - Retrieves `scrollProgress` and `reducedMotion` from `useSceneInteraction`.
  - Calculates the number of particles based on the theme.
  - Uses `useMemo` to create particle geometry only when the particle count changes.
  - Uses `useFrame` to animate the particles on each frame:
    - Rotates the particle field.
    - Adjusts the vertical position based on scroll progress.
    - Animates individual particle positions using a sine wave function.
- **Rendering**:
  - Returns a `<points>` element with a `geometry` and `pointsMaterial`:
    - `size`, `color`, `opacity`, and other material properties are set based on the theme.
    - Uses `AdditiveBlending` for blending effects.

### Export

- **ParticleField**: 
  - The component is exported using `memo` to optimize rendering by preventing unnecessary re-renders.

## How It Works

1. **Initialization**: 
   - The component initializes by determining the theme mode and setting up references and interaction hooks.
2. **Geometry Creation**: 
   - Particle positions are randomly generated and stored in a `BufferGeometry` object.
3. **Animation**: 
   - On each frame, the particle field rotates and adjusts its position based on user scroll.
   - Individual particles are animated using a sine wave to create a dynamic effect.
4. **Rendering**: 
   - The component renders a `points` object with a material that changes appearance based on the theme.

This component is designed to be efficient and responsive to user interactions, providing a visually appealing particle effect in a 3D scene.