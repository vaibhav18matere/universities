# Documentation Guide for `FooterScrollToTop.tsx`

## Overview

The `FooterScrollToTop.tsx` file defines a React component named `FooterScrollToTop`. This component provides a button that appears when the user scrolls down a webpage, allowing them to quickly return to the top of the page with a smooth scrolling effect. The component is designed to enhance user experience by providing easy navigation back to the top of long pages.

## Key Components

### 1. `IconChevronUp` Function

- **Purpose**: This function returns an SVG icon representing an upward-pointing chevron. It is used as the visual indicator within the scroll-to-top button.
- **Structure**: The SVG has a viewBox of `0 0 24 24` and a path that defines the chevron shape. It uses the `currentColor` for its fill, allowing it to inherit the text color of its parent element.

### 2. `FooterScrollToTop` Component

- **State**: 
  - `isVisible`: A boolean state that determines whether the scroll-to-top button is visible. It is initialized to `false`.

- **Callback Function**:
  - `onScroll`: A function created using `useCallback` that updates the `isVisible` state based on the vertical scroll position (`window.scrollY`). The button becomes visible when the scroll position is greater than 400 pixels.

- **Effect Hook**:
  - `useEffect`: This hook adds an event listener to the `scroll` event of the `window` object when the component mounts. The listener calls the `onScroll` function. The effect also includes a cleanup function that removes the event listener when the component unmounts or when `onScroll` changes.

- **Return JSX**:
  - The component returns a `button` element with several classes for styling and positioning. The button is fixed at the bottom-right corner of the viewport and has a circular shape with a shadow and transition effects.
  - **Visibility**: The button's visibility is controlled by the `isVisible` state. When `isVisible` is `true`, the button is fully opaque (`opacity-100`). When `false`, it is hidden (`opacity-0`) and non-interactive (`pointer-events-none`).
  - **Click Event**: The button has an `onClick` handler that scrolls the window to the top smoothly using `window.scrollTo`.

## How It Works

1. **Visibility Control**: The component listens for scroll events on the window. When the user scrolls down more than 400 pixels, the `isVisible` state is set to `true`, making the button appear. If the scroll position is less than or equal to 400 pixels, the button remains hidden.

2. **Button Interaction**: When the button is visible and clicked, it triggers a smooth scroll animation that takes the user back to the top of the page.

3. **Styling and Positioning**: The button is styled to be visually appealing and is positioned in a fixed location at the bottom-right of the viewport, ensuring it is always accessible when visible.

## Conclusion

The `FooterScrollToTop` component is a simple yet effective UI element that enhances user navigation on long web pages. By leveraging React hooks and modern CSS techniques, it provides a seamless and interactive experience for users wishing to return to the top of the page.