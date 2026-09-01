# CountryMarkers.tsx Documentation

## Overview

The `CountryMarkers.tsx` file defines a React component named `CountryMarkers` that is used to render markers on a 3D globe. These markers represent countries and are visualized using Three.js within a React application. The component leverages the `@react-three/fiber` library to integrate Three.js with React, allowing for declarative 3D graphics rendering.

## Purpose

The primary purpose of the `CountryMarkers` component is to display animated markers on a 3D globe. Each marker represents a country and is positioned based on geographical coordinates. The markers have a pulsing animation effect, and their appearance can change based on a dark or light theme.

## Key Components

### Imports

- **React and Hooks**: The component uses `memo`, `useMemo`, and `useRef` from React to optimize rendering and manage references to 3D objects.
- **@react-three/fiber**: The `useFrame` hook is used to create animations by updating the component on each frame.
- **Three.js**: The `AdditiveBlending` and `Group` types are imported from Three.js to handle blending effects and group 3D objects.
- **Utility Functions**: `globeCountryMarkers` and `latLngToVector3` are imported from local libraries to provide country data and convert latitude/longitude to 3D coordinates.

### Types

- **CountryMarkersProps**: Defines the properties for the component, including `radius` (a number) and `isDark` (a boolean).
- **MarkerData**: Represents the data structure for each marker, including an `id` and a `position` array.

### Component Logic

- **`CountryMarkersComponent`**: The main functional component that renders the markers.
  - **Props Destructuring**: Extracts `radius` and `isDark` from the component's props.
  - **`groupRef`**: A reference to the Three.js group that contains all marker objects.
  - **`markers`**: A memoized array of marker data, calculated by mapping over `globeCountryMarkers` and converting each country's latitude and longitude to a 3D position using `latLngToVector3`.
  - **`useFrame` Hook**: Updates the scale of each marker's child mesh to create a pulsing animation effect based on the elapsed time.

### Rendering

- **`<group>`**: A Three.js group that acts as a container for all marker objects.
- **Markers**: Each marker is rendered as a `<group>` with a unique `key` and `position`.
  - **Inner `<mesh>`**: Represents the core of the marker with a `sphereGeometry` and a `meshBasicMaterial`. The color and opacity depend on the `isDark` prop.
  - **Outer `<mesh>`**: A larger, semi-transparent sphere that creates a glowing effect around the marker. It uses `AdditiveBlending` for a more pronounced visual effect.

### Export

- **`CountryMarkers`**: The component is exported using `memo` to optimize rendering by preventing unnecessary re-renders when props do not change.

## How It Works

1. **Data Preparation**: The component receives `radius` and `isDark` as props. It uses these to calculate the position and appearance of each marker.
2. **Marker Creation**: The `markers` array is generated using `useMemo`, ensuring that the marker data is only recalculated when the `radius` changes.
3. **Animation**: The `useFrame` hook is used to animate the markers by updating their scale based on the elapsed time, creating a pulsing effect.
4. **Rendering**: The component renders a group of markers, each consisting of two meshes to create a core and glow effect. The appearance of the markers is adjusted based on the `isDark` prop.

This component efficiently manages 3D rendering and animation within a React application, providing a dynamic and visually appealing representation of country markers on a globe.