# FloatingShapes.tsx Documentation

## Overview

The `FloatingShapes.tsx` file is a React component designed to render a collection of floating 3D shapes using the `@react-three/fiber` and `@react-three/drei` libraries. The component is memoized for performance optimization and adapts its appearance based on the provided theme mode (dark or light).

## Key Components

### 1. **FloatingShapesProps**

This is a TypeScript type definition for the props accepted by the `FloatingShapesComponent`. It includes:

- `theme`: A `ThemeMode` type that determines the theme of the component. It is a read-only property.

### 2. **ShapeMeshProps**

This is a TypeScript type definition for the props accepted by the `FloatingShapeMesh` component. It includes:

- `config`: A `FloatingShapeConfig` type that contains configuration details for each shape.
- `isDark`: A boolean indicating whether the theme is dark.

### 3. **ShapeGeometry Component**

This functional component returns the appropriate geometry for a shape based on the `shape` property from the `FloatingShapeConfig`. It supports the following shapes:

- `octahedron`: Uses `<octahedronGeometry args={[1, 0]} />`
- `torus`: Uses `<torusGeometry args={[0.6, 0.18, 16, 32]} />`
- `icosahedron`: Uses `<icosahedronGeometry args={[1, 0]} />`
- Default: Uses `<boxGeometry args={[1, 1, 1]} />`

### 4. **FloatingShapeMesh Component**

This component is responsible for rendering a single floating shape. It uses the following:

- **Refs**: Utilizes `useRef` to create a reference to the mesh for rotation updates.
- **useFrame Hook**: Updates the rotation of the mesh on each frame based on the `rotationSpeed` from the `config`.
- **Float Component**: Wraps the mesh to provide floating animation with configurable speed and intensity.
- **meshPhysicalMaterial**: Defines the material properties of the mesh, including color, emissive properties, metalness, roughness, and transparency, which vary based on the `isDark` theme.

### 5. **FloatingShapesComponent**

This component renders a group of `FloatingShapeMesh` components. It:

- Determines the theme mode (`isDark`) based on the `theme` prop.
- Maps over `floatingShapeConfigs` to render each shape with its respective configuration and theme.

### 6. **Exported FloatingShapes**

The `FloatingShapes` component is exported as a memoized version of `FloatingShapesComponent` to optimize rendering performance by preventing unnecessary re-renders.

## How It Works

1. **Theme Handling**: The component receives a `theme` prop to determine the visual style (dark or light) of the shapes.

2. **Shape Configuration**: It uses `floatingShapeConfigs` to get the configuration for each shape, including position, scale, rotation speed, and float intensity.

3. **Rendering**: For each configuration, a `FloatingShapeMesh` is rendered, which includes:
   - Geometry selection based on the shape type.
   - Material properties that change based on the theme.
   - Animation using the `Float` component and `useFrame` hook for dynamic rotation.

4. **Performance Optimization**: The entire component is memoized to avoid unnecessary re-renders when props do not change.

This component is designed to be used within a 3D scene, providing a visually dynamic and theme-responsive set of floating shapes.