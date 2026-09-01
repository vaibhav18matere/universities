# ScrollReveal Component Documentation

## Overview

The `ScrollReveal` component is a React component designed to animate its child elements when they enter the viewport. It leverages the `gsap` library along with the `ScrollTrigger` plugin to create smooth, customizable animations triggered by scrolling.

## Purpose

The primary purpose of the `ScrollReveal` component is to enhance user experience by adding visual animations to elements as they appear in the viewport. This can be particularly useful for drawing attention to specific content or creating a more dynamic and engaging interface.

## Key Components

### Imports

- **React Hooks**: The component uses `useEffect` and `useRef` from React to manage side effects and reference DOM elements, respectively.
- **gsap**: The GreenSock Animation Platform (GSAP) is used for creating animations.
- **ScrollTrigger**: A GSAP plugin that triggers animations based on the scroll position.

### Types

- **ScrollRevealAnimation**: A TypeScript type that defines the possible animation styles: `"fade-up"`, `"fade-in"`, and `"scale-in"`.

- **ScrollRevealProps**: A TypeScript type that defines the properties accepted by the `ScrollReveal` component:
  - `children`: The content to be animated.
  - `className`: Optional CSS class for styling.
  - `animation`: The type of animation to apply (default is `"fade-up"`).
  - `delay`: The delay before the animation starts (default is `0`).
  - `duration`: The duration of the animation (default is `0.9` seconds).
  - `stagger`: The stagger delay for animating multiple elements (default is `0`).

### Functions

- **prefersReducedMotion**: A utility function that checks if the user has requested reduced motion in their system preferences. If so, animations are disabled.

- **getAnimationFrom**: Returns the initial state of the animation based on the specified `ScrollRevealAnimation`.

- **getAnimationTo**: Returns the final state of the animation based on the specified `ScrollRevealAnimation`.

### Component Logic

- **useRef**: A reference (`containerRef`) is created to access the DOM element that wraps the children.

- **useEffect**: This hook is used to set up the animation when the component mounts and to clean up when it unmounts or when dependencies change.
  - **Container Check**: If the `containerRef` is null or if reduced motion is preferred, the effect returns early.
  - **Targets**: Determines the elements to animate. If `stagger` is greater than 0, it selects elements with the `data-scroll-reveal-item` attribute; otherwise, it selects the container itself.
  - **GSAP Context**: Sets up the animation using `gsap.fromTo`, specifying the initial and final animation states, duration, delay, stagger, easing, and scroll trigger settings.
  - **Cleanup**: Returns a cleanup function that reverts the GSAP context when the component unmounts or dependencies change.

### JSX

- The component returns a `div` element that wraps the `children` and applies the `className` if provided. The `div` is referenced by `containerRef` for animation purposes.

## Usage

To use the `ScrollReveal` component, wrap the content you want to animate within it. You can customize the animation type, delay, duration, and stagger through props.

```jsx
<ScrollReveal animation="fade-in" delay={0.5} duration={1.2} stagger={0.2}>
  <div>Your content here</div>
</ScrollReveal>
```

This setup will animate the content with a "fade-in" effect, starting after a 0.5-second delay, lasting 1.2 seconds, and staggering the animation of child elements by 0.2 seconds if applicable.