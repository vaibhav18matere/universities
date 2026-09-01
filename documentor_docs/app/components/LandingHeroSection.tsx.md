# Documentation: `LandingHeroSection` Component

## Overview

The `LandingHeroSection` component is a React functional component designed to serve as a hero section for a landing page. It features a dynamic background image slideshow, animated text content, and interactive navigation dots. The component leverages the `gsap` library for animations and `next/image` for optimized image rendering.

## Purpose

The primary purpose of the `LandingHeroSection` component is to provide a visually appealing introduction to a webpage, specifically targeting users interested in MBBS programs abroad. It aims to capture user attention through animations and a rotating set of background images.

## Key Components

### Imports

- **`Image` from `next/image`:** Used for optimized image rendering.
- **React Hooks (`useEffect`, `useRef`, `useState`):** Utilized for managing component state and lifecycle.
- **`Link` from `next/link`:** Provides client-side navigation.
- **`gsap` and `ScrollTrigger`:** Libraries used for creating animations and scroll-based effects.

### Constants

- **`heroImageSources`:** A read-only array containing URLs of images used in the background slideshow.

### Functions

- **`prefersReducedMotion`:** A utility function that checks if the user has requested reduced motion via their system settings.

### Component: `LandingHeroSection`

#### State and Refs

- **`slideIndex`:** A state variable that tracks the current index of the displayed background image.
- **`sectionRef`, `contentRef`, `backgroundRef`:** References to DOM elements for the section, content, and background, respectively.

#### `useEffect` Hooks

1. **Image Slideshow Interval:**
   - Sets up an interval to change the `slideIndex` every 7 seconds, cycling through the `heroImageSources`.
   - The interval is cleared when the component unmounts or if the user prefers reduced motion.

2. **GSAP Animations:**
   - Initializes animations for the hero section content using `gsap`.
   - Animates the title, subtitle, call-to-action (CTA), and navigation dots with fade-in and slide-up effects.
   - Applies a scroll-triggered animation to the background, moving it vertically as the user scrolls.

#### JSX Structure

- **`<section>`:**
  - The main container with a reference (`sectionRef`) and accessibility label "Welcome".
  - Contains the background and content elements.

- **Background:**
  - A `<div>` with a reference (`backgroundRef`) that holds the slideshow images.
  - Each image is rendered using the `Image` component with conditional opacity based on `slideIndex`.
  - Includes gradient overlays for visual effects.

- **Content:**
  - A `<div>` with a reference (`contentRef`) that contains the hero text and interactive elements.
  - **Title (`<h1>`):** Displays the main message.
  - **Subtitle (`<p>`):** Provides additional information.
  - **CTA (`<Link>`):** A button linking to the directory section of the site.
  - **Navigation Dots:** Buttons that allow users to manually select a background image.

## How It Works

1. **Image Slideshow:**
   - The component cycles through a set of background images every 7 seconds, unless the user prefers reduced motion.

2. **Animations:**
   - On component mount, GSAP animations are initialized to animate the appearance of text and CTA elements.
   - A scroll-triggered animation moves the background vertically as the user scrolls.

3. **Interactivity:**
   - Users can manually change the background image by clicking on the navigation dots, which update the `slideIndex`.

## Accessibility

- The component uses ARIA attributes to enhance accessibility, such as `aria-label` for the section and `aria-current` for the active navigation dot.

## Conclusion

The `LandingHeroSection` component is a well-structured and visually dynamic hero section designed to engage users with animations and interactive elements. It effectively uses modern web technologies to deliver an optimized and accessible user experience.