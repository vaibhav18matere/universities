# FloatingShapes.tsx Documentation

## Overview

The `FloatingShapes.tsx` file defines a React component that renders a collection of floating 3D shapes using the `@react-three/fiber` and `@react-three/drei` libraries. The component is designed to be used within a React application that supports server-side rendering, as indicated by the `"use client";` directive at the top of the file.

## Key Components

### 1. **FloatingShapesProps**

This is a TypeScript type definition for the props accepted by the `FloatingShapesComponent`. It includes:

- `theme`: A `ThemeMode` type that determines the theme mode (e.g., "dark" or "light").

### 2. **ShapeMeshProps**

This is a TypeScript type definition for the props accepted by the `FloatingShapeMesh` component. It includes:

- `config`: A `FloatingShapeConfig` type that contains configuration details for each shape.
- `isDark`: A boolean indicating whether the current theme is dark.

### 3. **ShapeGeometry Component**

This functional component returns the appropriate geometry for a shape based on the `shape` property from the `FloatingShapeConfig`. It supports the following shapes:

- `octahedron`: Uses `<octahedronGeometry args={[1, 0]} />`
- `torus`: Uses `<torusGeometry args={[0.6, 0.18, 16, 32]} />`
- `icosahedron`: Uses `<icosahedronGeometry args={[1, 0]} />`
- Default: Uses `<boxGeometry args={[1, 1, 1]} />`

### 4. **FloatingShapeMesh Component**

This component is responsible for rendering a single floating shape. It uses the `useRef` hook to create a reference to the mesh and the `useFrame` hook to update the mesh's rotation on each frame. The component returns a `<Float>` wrapper from `@react-three/drei` that animates the mesh with floating effects. The mesh is styled using a `meshPhysicalMaterial` with properties that vary based on the `isDark` prop.

### 5. **FloatingShapesComponent**

This component renders a group of `FloatingShapeMesh` components. It maps over the `floatingShapeConfigs` array, passing each configuration to a `FloatingShapeMesh` instance. The `isDark` boolean is derived from the `theme` prop to determine the color scheme for the shapes.

### 6. **FloatingShapes Export**

The `FloatingShapesComponent` is wrapped with `memo` from React to optimize rendering performance by preventing unnecessary re-renders. It is then exported as `FloatingShapes`.

## How It Works

1. **Theme Handling**: The component receives a `theme` prop to determine the color scheme for the shapes. It checks if the theme is "dark" to adjust the material properties accordingly.

2. **Shape Configuration**: The component uses a predefined set of configurations (`floatingShapeConfigs`) to determine the properties of each shape, such as position, scale, rotation speed, and float intensity.

3. **Rendering**: Each shape is rendered as a `mesh` with a specific geometry and material. The `Float` component from `@react-three/drei` is used to apply floating animations to the shapes.

4. **Animation**: The `useFrame` hook is used to update the rotation of each shape on every frame, creating a dynamic and animated scene.

This component is designed to be a reusable and customizable part of a 3D scene in a React application, providing visually appealing floating shapes that respond to theme changes.