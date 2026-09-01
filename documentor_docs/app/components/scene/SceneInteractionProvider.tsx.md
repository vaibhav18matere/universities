# SceneInteractionProvider.tsx Documentation

## Overview

The `SceneInteractionProvider.tsx` file is a React component that provides context for managing scene interactions, specifically focusing on scroll progress and mouse position within a web application. It utilizes the `gsap` library, particularly the `ScrollTrigger` plugin, to track scroll progress and handle mouse movement events. This component is designed to be used as a context provider, allowing child components to access interaction data through a custom hook.

## Key Components

### Types

- **MousePosition**: An object type with two readonly properties:
  - `x`: The x-coordinate of the mouse position.
  - `y`: The y-coordinate of the mouse position.

- **SceneInteractionValue**: An object type with three readonly properties:
  - `scrollProgress`: A mutable reference object (`MutableRefObject<number>`) that holds the current scroll progress.
  - `mouse`: A mutable reference object (`MutableRefObject<MousePosition>`) that holds the current mouse position.
  - `reducedMotion`: A boolean indicating whether the user prefers reduced motion.

### Context

- **SceneInteractionContext**: A React context that holds a `SceneInteractionValue` or `null`. It is initialized with `null`.

### Provider Component

- **SceneInteractionProvider**: A React component that provides the `SceneInteractionContext` to its children. It manages the state and effects related to scroll progress and mouse position.

  - **Props**:
    - `children`: The child components that will have access to the context.

  - **State and Refs**:
    - `scrollProgress`: A `useRef` hook initialized to `0`, used to store the scroll progress.
    - `mouse`: A `useRef` hook initialized with `{ x: 0, y: 0 }`, used to store the mouse position.
    - `reducedMotion`: A `useState` hook initialized to `false`, used to store the user's reduced motion preference.

  - **Effects**:
    - An effect to set the `reducedMotion` state based on the user's system preference using `window.matchMedia`.
    - An effect to handle scroll progress and mouse movement:
      - Registers a `ScrollTrigger` to update `scrollProgress` based on the scroll position.
      - Adds an event listener for `mousemove` to update the `mouse` position.
      - Cleans up by removing the event listener and killing the `ScrollTrigger` on component unmount or when `reducedMotion` changes.

  - **Value**:
    - Uses `useMemo` to memoize the context value, which includes `scrollProgress`, `mouse`, and `reducedMotion`.

### Custom Hook

- **useSceneInteraction**: A custom hook that provides access to the `SceneInteractionContext`. It throws an error if used outside of a `SceneInteractionProvider`.

## How It Works

1. **Initialization**: The `SceneInteractionProvider` initializes the context with default values for scroll progress and mouse position. It also checks the user's reduced motion preference.

2. **Scroll and Mouse Tracking**: If reduced motion is not preferred, the component sets up a `ScrollTrigger` to track scroll progress and an event listener to track mouse movement. These values are stored in mutable refs.

3. **Context Provision**: The component provides the interaction data (scroll progress, mouse position, and reduced motion preference) to its children via the `SceneInteractionContext`.

4. **Accessing Context**: Child components can access the interaction data using the `useSceneInteraction` hook, ensuring they are within a `SceneInteractionProvider`.

This setup allows for efficient and centralized management of scene interactions, making it easier to build responsive and interactive web applications.