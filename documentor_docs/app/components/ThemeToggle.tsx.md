# ThemeToggle Component Documentation

## Overview

The `ThemeToggle` component is a React component designed to allow users to switch between light and dark themes in a web application. It utilizes a button that, when clicked, toggles the theme and updates the button's icon and label accordingly.

## File Path

`app/components/ThemeToggle.tsx`

## Key Components

### 1. IconSun Component

- **Purpose**: Represents the sun icon, which is used to indicate the light mode.
- **Structure**: 
  - An SVG element with a viewBox of `0 0 24 24`.
  - Contains a circle and several paths to form the sun shape.
  - Attributes:
    - `className`: `"h-5 w-5"` for size.
    - `fill`: `"none"` to ensure the icon is not filled.
    - `stroke`: `"currentColor"` to inherit the current text color.
    - `strokeWidth`: `2` for line thickness.
    - `aria-hidden`: Used to hide the icon from screen readers.

### 2. IconMoon Component

- **Purpose**: Represents the moon icon, which is used to indicate the dark mode.
- **Structure**:
  - An SVG element with a viewBox of `0 0 24 24`.
  - Contains a single path to form the moon shape.
  - Attributes:
    - `className`: `"h-5 w-5"` for size.
    - `fill`: `"currentColor"` to fill the icon with the current text color.
    - `aria-hidden`: Used to hide the icon from screen readers.

### 3. ThemeToggleButtonClassName

- **Purpose**: A constant string that defines the CSS classes for styling the toggle button.
- **Classes**:
  - `inline-flex`, `h-10`, `w-10`, `shrink-0`, `items-center`, `justify-center`: For button layout and size.
  - `rounded-xl`: For rounded corners.
  - `border`, `border-slate-200`, `dark:border-slate-700`: For border styling in light and dark modes.
  - `bg-surface`, `dark:bg-slate-900`: For background color in light and dark modes.
  - `text-slate-700`, `dark:text-slate-200`: For text color in light and dark modes.
  - `shadow-sm`: For a subtle shadow effect.
  - `transition`, `hover:bg-surface-muted`, `hover:text-accent`, `active:scale-[0.98]`: For hover and active state transitions.

### 4. ThemeToggle Function

- **Purpose**: The main component function that renders the theme toggle button.
- **Functionality**:
  - Uses the `useTheme` hook to access the current theme and the `toggleTheme` function.
  - Determines if the current theme is dark by checking if `theme === "dark"`.
  - Renders a button with:
    - `type`: `"button"` to specify the button type.
    - `className`: Uses `themeToggleButtonClassName` for styling.
    - `onClick`: Calls `toggleTheme` to switch themes.
    - `aria-label`: Provides an accessible label that changes based on the current theme.
    - `title`: Provides a tooltip that changes based on the current theme.
    - Icon: Displays `IconSun` if the theme is dark, otherwise displays `IconMoon`.

## How It Works

1. **Theme Detection**: The component uses the `useTheme` hook to determine the current theme and provides a function to toggle it.
2. **Button Rendering**: A button is rendered with appropriate styling and accessibility attributes.
3. **Icon and Label Update**: The button's icon and label dynamically change based on the current theme. If the theme is dark, the sun icon is displayed with a label indicating a switch to light mode, and vice versa.
4. **Theme Toggling**: Clicking the button triggers the `toggleTheme` function, which switches the theme between light and dark modes.

This component is designed to be a simple and accessible way for users to toggle between themes in a React application.