# Documentation Guide for `FooterScrollToTop.tsx`

## Overview

The `FooterScrollToTop.tsx` file defines a React component named `FooterScrollToTop`. This component provides a button that appears when the user scrolls down a webpage, allowing them to quickly return to the top of the page. The button is styled to be fixed at the bottom-right corner of the viewport and includes a chevron-up icon to indicate its functionality.

## Key Components

### 1. `IconChevronUp` Function

- **Purpose**: This function returns an SVG element representing an upward-pointing chevron icon. It is used within the `FooterScrollToTop` component to visually indicate the "scroll to top" action.
- **Structure**: The SVG has a viewBox of `0 0 24 24` and a path that defines the chevron shape. It uses the `currentColor` for its fill, allowing it to inherit the text color of its parent element.

### 2. `FooterScrollToTop` Component

- **State**: 
  - `isVisible`: A boolean state that determines whether the button is visible. It is initialized to `false`.

- **Effects**:
  - `useEffect`: This hook adds an event listener to the window's `scroll` event. The listener triggers the `onScroll` function, which updates the `isVisible` state based on the vertical scroll position (`window.scrollY`). The button becomes visible when the scroll position exceeds 400 pixels. The effect cleans up by removing the event listener when the component is unmounted or when `onScroll` changes.

- **Callback**:
  - `onScroll`: A `useCallback` hook is used to memoize the scroll event handler. It sets `isVisible` to `true` if the scroll position is greater than 400 pixels, otherwise `false`.

- **Return**:
  - The component returns a `button` element with several characteristics:
    - **Positioning**: The button is fixed at the bottom-right corner of the viewport. It uses CSS custom properties and media queries to adjust its position and size responsively.
    - **Visibility**: The button's visibility is controlled by the `isVisible` state. When `isVisible` is `true`, the button is fully opaque and interactive. When `false`, it is transparent and non-interactive.
    - **Styling**: The button has a rounded shape, background color (`bg-accent`), text color (`text-accent-foreground`), and shadow (`shadow-lg`). It includes hover and active states for visual feedback.
    - **Functionality**: Clicking the button triggers a smooth scroll to the top of the page using `window.scrollTo`.

## How It Works

1. **Initialization**: The component initializes with the `isVisible` state set to `false`, meaning the button is initially hidden.

2. **Scroll Detection**: As the user scrolls down the page, the `onScroll` function checks the scroll position. If it exceeds 400 pixels, `isVisible` is set to `true`, making the button visible.

3. **Button Interaction**: When the button is visible and clicked, it smoothly scrolls the page back to the top.

4. **Cleanup**: The `useEffect` hook ensures that the scroll event listener is removed when the component is unmounted or when dependencies change, preventing potential memory leaks.

This component enhances user experience by providing a convenient way to navigate back to the top of long pages.