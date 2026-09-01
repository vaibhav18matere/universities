# Documentation Guide for `LandingHeroSection.tsx`

## Overview

The `LandingHeroSection.tsx` file defines a React component named `LandingHeroSection`. This component is designed to be a hero section for a landing page, featuring a background image slideshow, animated text content, and interactive navigation dots. It utilizes the `gsap` library for animations and `next/image` for optimized image handling.

## Purpose

The primary purpose of the `LandingHeroSection` component is to provide a visually appealing introduction section for a webpage. It aims to capture the user's attention with a dynamic background image slideshow and animated text content, while also offering a call-to-action button to guide users to explore further.

## Key Components

### Imports

- **`Image` from `next/image`:** Used for optimized image rendering.
- **React Hooks (`useEffect`, `useRef`, `useState`):** Utilized for managing component state and lifecycle.
- **`Link` from `next/link`:** Provides client-side navigation.
- **`gsap` and `ScrollTrigger`:** Libraries used for creating animations and scroll-based effects.

### Constants

- **`heroImageSources`:** A read-only array containing URLs of images used in the slideshow.

### Helper Functions

- **`prefersReducedMotion`:** A function that checks if the user has requested reduced motion via their system settings.

### Component: `LandingHeroSection`

#### State and Refs

- **`slideIndex`:** A state variable that tracks the current index of the displayed image in the slideshow.
- **`sectionRef`, `contentRef`, `backgroundRef`:** References to DOM elements for the section, content, and background, respectively.

#### `useEffect` Hooks

1. **Slideshow Interval:**
   - Sets up an interval to automatically change the `slideIndex` every 7 seconds, cycling through the images.
   - Checks for reduced motion preference and disables the interval if enabled.

2. **GSAP Animations:**
   - Initializes animations for the text content using `gsap.timeline`.
   - Animates the opacity and position of the title, subtitle, call-to-action button, and navigation dots.
   - Sets up a scroll-triggered animation for the background using `ScrollTrigger`.

#### JSX Structure

- **`<section>`:**
  - The main container for the hero section, with a reference `sectionRef`.
  - Contains the background and content elements.

- **Background Elements:**
  - **Images:** Rendered using the `Image` component from `next/image`, with a transition effect based on `slideIndex`.
  - **Gradient Overlays:** Two divs with gradient backgrounds for visual effects.

- **Content Elements:**
  - **Title and Subtitle:** Text elements with data attributes for animation targeting.
  - **Call-to-Action Button:** A `Link` component styled as a button, directing users to a specific section of the page.
  - **Navigation Dots:** Buttons that allow users to manually select which image to display in the slideshow.

## How It Works

1. **Image Slideshow:**
   - The component cycles through a set of images, changing the visible image every 7 seconds unless the user prefers reduced motion.
   - Users can manually select an image using the navigation dots.

2. **Animations:**
   - On component mount, GSAP animations are initialized to animate the entry of text content.
   - A scroll-triggered animation moves the background image slightly as the user scrolls.

3. **Responsive Design:**
   - The component is designed to be responsive, adjusting its layout and styles based on screen size.

## Conclusion

The `LandingHeroSection` component is a well-structured and dynamic hero section designed to enhance the visual appeal of a landing page. It leverages modern web technologies to provide a smooth and engaging user experience, with considerations for accessibility and user preferences.