# SceneInteractionProvider.tsx Documentation

## Overview

The `SceneInteractionProvider.tsx` file is a React component that provides context for managing scene interactions, specifically focusing on scroll progress and mouse position within a web application. It utilizes the `gsap` library, along with its `ScrollTrigger` plugin, to track and respond to scroll events. Additionally, it considers user preferences for reduced motion to enhance accessibility.

## Key Components

### Types

- **MousePosition**: A TypeScript type representing the mouse position with `x` and `y` coordinates, both of which are read-only numbers.

- **SceneInteractionValue**: A TypeScript type that defines the structure of the context value provided by the `SceneInteractionProvider`. It includes:
  - `scrollProgress`: A mutable reference object holding the current scroll progress as a number.
  - `mouse`: A mutable reference object holding the current mouse position as a `MousePosition`.
  - `reducedMotion`: A boolean indicating whether the user prefers reduced motion.

### Context

- **SceneInteractionContext**: A React context initialized with a `null` default value. It is used to provide and consume the `SceneInteractionValue` throughout the component tree.

### Components

- **SceneInteractionProvider**: A React component that acts as a context provider for scene interaction data. It accepts the following prop:
  - `children`: React nodes that will have access to the context.

### Hooks and Effects

- **readReducedMotionPreference**: A function that checks the user's system preferences for reduced motion using the `window.matchMedia` API.

- **useEffect**: Two `useEffect` hooks are used:
  1. To set the initial state of `reducedMotion` based on user preferences.
  2. To manage scroll and mouse event listeners, updating the context values accordingly. This effect is dependent on the `reducedMotion` state.

- **useMemo**: Used to memoize the context value, ensuring that it only changes when `reducedMotion` changes.

### Custom Hook

- **useSceneInteraction**: A custom hook that provides access to the `SceneInteractionContext`. It throws an error if used outside of the `SceneInteractionProvider`.

## How It Works

1. **Initialization**: The `SceneInteractionProvider` initializes `scrollProgress` and `mouse` using `useRef`, and `reducedMotion` using `useState`.

2. **Reduced Motion Preference**: On component mount, the first `useEffect` sets the `reducedMotion` state based on the user's system preferences.

3. **Scroll and Mouse Event Handling**:
   - If `reducedMotion` is `false`, the second `useEffect` sets up a `ScrollTrigger` to track scroll progress and updates `scrollProgress.current`.
   - It also adds a `mousemove` event listener to update `mouse.current` with normalized coordinates.
   - A timeout is set to refresh the `ScrollTrigger` after 400 milliseconds.

4. **Cleanup**: On component unmount or when `reducedMotion` changes, the effect cleans up by killing the `ScrollTrigger`, removing the mouse event listener, and clearing the timeout.

5. **Context Provision**: The `SceneInteractionProvider` wraps its children with the `SceneInteractionContext.Provider`, passing the memoized context value.

6. **Context Consumption**: The `useSceneInteraction` hook allows components to access the context value, ensuring they are within the provider.

## Usage

To use the `SceneInteractionProvider`, wrap it around components that need access to scroll progress and mouse position data. Use the `useSceneInteraction` hook within these components to access the context values.

```jsx
<SceneInteractionProvider>
  <YourComponent />
</SceneInteractionProvider>
```

In `YourComponent`, use the hook:

```jsx
const { scrollProgress, mouse, reducedMotion } = useSceneInteraction();
```

This setup allows `YourComponent` to respond to changes in scroll progress and mouse position, while respecting user preferences for reduced motion.