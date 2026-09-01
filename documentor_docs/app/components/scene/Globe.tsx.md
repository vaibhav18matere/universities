# Globe.tsx Documentation

## Overview

The `Globe.tsx` file is a React component designed to render a 3D globe using the `@react-three/fiber` library, which is a React renderer for Three.js. This component is part of a larger application and is responsible for displaying a globe with an atmosphere and country markers. The globe's appearance can change based on the theme mode (dark or light), and it rotates based on user interaction.

## Key Components

### Imports

- **React and Hooks**: The component uses `memo` for performance optimization and `useRef` to create a reference to the 3D group object.
- **@react-three/fiber**: The `useFrame` hook is used to update the globe's rotation on each frame.
- **Three.js**: Various Three.js classes and types are imported, such as `AdditiveBlending`, `BackSide`, and `Group`.
- **ThemeMode**: A type imported from `theme-types` to define the theme mode.
- **GLOBE_RADIUS**: A constant imported from `scene-config` that defines the radius of the globe.
- **useSceneInteraction**: A custom hook imported from `SceneInteractionProvider` to manage scene interactions.
- **CountryMarkers**: A component imported to render markers on the globe.

### Types

- **GlobeProps**: A TypeScript type defining the props for the `GlobeComponent`. It includes:
  - `theme`: A `ThemeMode` indicating the current theme (dark or light).

### Components

#### Atmosphere

- **Props**: 
  - `radius`: The radius of the atmosphere.
  - `isDark`: A boolean indicating if the theme is dark.
- **Description**: Renders a mesh representing the atmosphere around the globe. The appearance (color and opacity) changes based on the theme.

#### GlobeMesh

- **Props**: 
  - `isDark`: A boolean indicating if the theme is dark.
- **Description**: Renders the main globe mesh. The material properties such as color, emissive color, and reflectivity are adjusted based on the theme.

#### GlobeComponent

- **Props**: 
  - `theme`: The current theme mode.
- **Description**: The main component that combines the `GlobeMesh`, `Atmosphere`, and `CountryMarkers` into a single 3D group. It uses `useRef` to keep a reference to the group for rotation updates.
- **Functionality**: 
  - Uses `useFrame` to rotate the globe based on time (`delta`) and user interaction (`scrollProgress`).
  - The rotation is disabled if `reducedMotion` is true.

### Export

- **Globe**: The `GlobeComponent` is wrapped with `memo` to optimize rendering by preventing unnecessary re-renders.

## How It Works

1. **Theme Handling**: The component adjusts the appearance of the globe and atmosphere based on the `theme` prop. It checks if the theme is dark and applies corresponding colors and material properties.

2. **3D Rendering**: The component uses Three.js primitives (`mesh`, `sphereGeometry`, `meshBasicMaterial`, `meshPhysicalMaterial`) to render the globe and its atmosphere.

3. **Rotation Logic**: The `useFrame` hook is used to update the rotation of the globe on each frame. The rotation speed is influenced by the `delta` time and the `scrollProgress` from the `useSceneInteraction` hook.

4. **Performance Optimization**: The `memo` function is used to prevent unnecessary re-renders of the `GlobeComponent` when its props have not changed.

This component is a part of a larger scene and interacts with other components and hooks to provide a dynamic and interactive 3D globe visualization.