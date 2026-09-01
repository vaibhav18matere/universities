# ThemeToggle Component Documentation

## Overview

The `ThemeToggle` component is a React component designed to allow users to switch between light and dark themes in a web application. It utilizes a button that toggles the theme state and visually represents the current theme using icons.

## File Path

`app/components/ThemeToggle.tsx`

## Key Components

### 1. IconSun Component

- **Purpose**: Represents the sun icon, which is used to indicate the light theme.
- **Structure**: 
  - An SVG element with a viewBox of `0 0 24 24`.
  - Contains a circle and several path elements to form the sun shape.
  - Uses `stroke` to define the icon's outline and `strokeWidth` for line thickness.
  - The icon is hidden from screen readers using `aria-hidden`.

### 2. IconMoon Component

- **Purpose**: Represents the moon icon, which is used to indicate the dark theme.
- **Structure**:
  - An SVG element with a viewBox of `0 0 24 24`.
  - Contains a single path element to form the moon shape.
  - Uses `fill` to define the icon's color.
  - The icon is hidden from screen readers using `aria-hidden`.

### 3. themeToggleButtonClassName

- **Purpose**: Provides a set of CSS classes for styling the theme toggle button.
- **Details**:
  - The button is styled to be a rounded square with a border and shadow.
  - It includes styles for different states such as hover and active.
  - Supports both light and dark themes with conditional styling.

### 4. ThemeToggle Component

- **Purpose**: The main component that renders a button to toggle between light and dark themes.
- **Functionality**:
  - Uses the `useTheme` hook to access the current theme and a function to toggle the theme.
  - Determines if the current theme is dark by checking if `theme === "dark"`.
  - Renders a button with:
    - `type="button"`: Specifies the button type.
    - `className`: Applies the predefined styles from `themeToggleButtonClassName`.
    - `onClick`: Calls `toggleTheme` to switch themes when clicked.
    - `aria-label`: Provides an accessible label for screen readers, indicating the action of the button.
    - `title`: Displays a tooltip with the current theme mode.
  - Conditionally renders `IconSun` or `IconMoon` based on the current theme.

## How It Works

1. **Theme Detection**: The component uses the `useTheme` hook to determine the current theme and provides a method to toggle it.
2. **Button Rendering**: A button is rendered with appropriate styles and accessibility attributes.
3. **Icon Display**: Depending on the current theme, either the sun or moon icon is displayed within the button.
4. **Theme Toggling**: Clicking the button triggers the `toggleTheme` function, which switches the theme between light and dark.

This component is designed to be a simple and accessible way for users to switch themes in a React application.