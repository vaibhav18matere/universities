# CountryMarkers.tsx Documentation

## Overview

The `CountryMarkers.tsx` file defines a React component named `CountryMarkers` that is used to render markers on a 3D globe. These markers represent countries and are visualized using Three.js within a React application. The component leverages the `@react-three/fiber` library to integrate Three.js with React, allowing for declarative 3D graphics rendering.

## Purpose

The primary purpose of the `CountryMarkers` component is to display animated markers on a 3D globe. Each marker represents a country and is positioned based on geographical coordinates. The markers have a pulsing animation effect, which is achieved through scaling transformations over time.

## Key Components

### Imports

- **React and Hooks**: The component imports `memo`, `useMemo`, and `useRef` from React. These hooks are used for performance optimization and managing references to DOM elements.
- **@react-three/fiber**: The `useFrame` hook from this library is used to execute animations on each frame.
- **Three.js**: The `AdditiveBlending` and `Group` types are imported from Three.js to handle blending effects and group objects, respectively.
- **Utility Functions**: The `globeCountryMarkers` and `latLngToVector3` are imported from local utility modules. These are used to retrieve country data and convert latitude/longitude to 3D coordinates.

### Types

- **CountryMarkersProps**: Defines the properties expected by the component, including:
  - `radius`: A number representing the radius of the globe.
  - `isDark`: A boolean indicating whether the dark mode is enabled.
  
- **MarkerData**: Represents the data structure for each marker, including:
  - `id`: A unique identifier for the marker.
  - `position`: A 3D vector representing the marker's position.

### Component Logic

- **`CountryMarkersComponent`**: The main functional component that renders the markers.
  - **Props Destructuring**: Extracts `radius` and `isDark` from the component's props.
  - **`groupRef`**: A reference to the Three.js group that contains all marker meshes.
  - **`markers`**: A memoized array of marker data, calculated by mapping over `globeCountryMarkers` and converting each country's latitude and longitude to a 3D position using `latLngToVector3`.
  - **`useFrame` Hook**: Animates the markers by scaling them based on a sine wave function, creating a pulsing effect. This is done by iterating over the children of the `groupRef` and adjusting their scale.

### JSX Structure

- **`<group>`**: The root element that contains all marker elements. It uses `groupRef` to manage the group of markers.
- **Markers Rendering**: Each marker is rendered as a `<group>` with a unique `key` and `position`.
  - **Inner `<mesh>`**: Represents the core of the marker with a `sphereGeometry` and a `meshBasicMaterial`. The color and opacity depend on the `isDark` prop.
  - **Outer `<mesh>`**: A larger, semi-transparent sphere that surrounds the core, providing a glowing effect. It uses `AdditiveBlending` for blending effects and has `depthWrite` set to `false` to ensure proper rendering order.

### Export

- **`CountryMarkers`**: The component is exported using `memo` to optimize rendering by preventing unnecessary re-renders when props do not change.

## Conclusion

The `CountryMarkers.tsx` component is a well-structured React component that efficiently renders animated country markers on a 3D globe. It utilizes Three.js for 3D rendering and React hooks for managing state and performance optimizations. The component is designed to be reusable and adaptable to different globe configurations, such as varying radii and color schemes based on the `isDark` prop.