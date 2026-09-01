# Globe.tsx Documentation

## Overview

The `Globe.tsx` file is a React component designed to render a 3D globe using the `@react-three/fiber` library, which is a React renderer for Three.js. This component is part of a larger application and is responsible for displaying a globe with an atmosphere and country markers. The globe's appearance can change based on the theme mode (dark or light), and it rotates based on user interaction.

## Key Components

### Imports

- **React and Hooks**: The component uses `memo` for performance optimization and `useRef` to create a reference to the 3D group object.
- **@react-three/fiber**: The `useFrame` hook is used to update the globe's rotation on each frame.
- **Three.js**: Various Three.js classes and types are imported, such as `AdditiveBlending`, `BackSide`, and `Group`.
- **Custom Types and Constants**: 
  - `ThemeMode`: A type representing the theme mode, imported from `theme-types`.
  - `GLOBE_RADIUS`: A constant defining the radius of the globe, imported from `scene-config`.
- **Custom Hooks and Components**:
  - `useSceneInteraction`: A custom hook providing interaction data like `scrollProgress` and `reducedMotion`.
  - `CountryMarkers`: A component that adds markers to the globe.

### Component Structure

1. **GlobeProps Type**
   - Defines the properties for the `GlobeComponent`, specifically the `theme` which is of type `ThemeMode`.

2. **Atmosphere Component**
   - Renders a mesh representing the atmosphere around the globe.
   - Props:
     - `radius`: The radius of the atmosphere.
     - `isDark`: A boolean indicating if the theme is dark.
   - Uses a `sphereGeometry` and a `meshBasicMaterial` with properties that change based on the `isDark` prop.

3. **GlobeMesh Component**
   - Renders the main globe mesh.
   - Props:
     - `isDark`: A boolean indicating if the theme is dark.
   - Uses a `sphereGeometry` and a `meshPhysicalMaterial` with properties that change based on the `isDark` prop.

4. **GlobeComponent**
   - The main component that combines the `GlobeMesh`, `Atmosphere`, and `CountryMarkers`.
   - Props:
     - `theme`: The current theme mode.
   - Uses `useRef` to create a reference to the group containing the globe components.
   - Uses `useFrame` to update the rotation of the globe based on `delta` time and `scrollProgress`.
   - The globe's rotation is adjusted unless `reducedMotion` is true.

5. **Export**
   - The `GlobeComponent` is wrapped with `memo` to optimize rendering by preventing unnecessary re-renders.

## How It Works

- The `GlobeComponent` receives a `theme` prop to determine the visual style (dark or light).
- The `GlobeMesh` and `Atmosphere` components are rendered with materials that change based on the `isDark` boolean derived from the `theme`.
- The `useFrame` hook is used to animate the globe's rotation continuously, with additional rotation based on the user's scroll progress.
- The `groupRef` is used to manipulate the 3D group containing the globe and its components.
- The `memo` function is used to optimize the component by preventing re-renders when props have not changed.

This component is designed to be part of a larger scene, providing a visually dynamic and interactive 3D globe.