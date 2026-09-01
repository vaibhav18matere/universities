# Documentation Guide for `app/layout.tsx`

This document provides a detailed explanation of the `app/layout.tsx` file, which is a part of a Next.js application. This file defines the root layout component for the application, setting up global styles, fonts, metadata, and the overall structure of the HTML document.

## Purpose

The `app/layout.tsx` file is responsible for defining the root layout of the application. It sets up the HTML structure, applies global styles, initializes themes, and includes essential components like the header and footer. This layout is used to wrap all pages of the application, ensuring a consistent look and feel across the site.

## Key Components

### Imports

- **Metadata and Viewport Types**: The file imports `Metadata` and `Viewport` types from Next.js, which are used to define the metadata and viewport settings for the application.
- **Fonts**: The `Geist_Mono` and `Inter` fonts are imported from Google Fonts via Next.js's font optimization feature.
- **Components**: The file imports several components:
  - `SiteFooter`: The footer component of the site.
  - `SiteHeader`: The header component of the site.
  - `ThemeProvider`: A component that provides theme context to the application.
  - `UniverseBackground`: A component that likely provides a background visual effect.
- **Theme Storage Key**: A constant `THEME_STORAGE_KEY` is imported from a theme storage utility, used for theme persistence.
- **Global Styles**: The global CSS styles are imported from `./globals.css`.

### Font Initialization

- **Inter Font**: Initialized with a CSS variable `--font-inter` and supports the Latin subset.
- **Geist Mono Font**: Initialized with a CSS variable `--font-geist-mono` and supports the Latin subset.

### Theme Initialization Script

A self-invoking function is defined as `themeInitScript` to manage the theme based on user preference stored in `localStorage` or the system's color scheme preference. It toggles the `dark` class on the `documentElement` based on the theme.

### Viewport Configuration

The `viewport` object defines the viewport settings:
- `width`: Set to `device-width` to ensure the layout adapts to the device's width.
- `initialScale`: Set to `1` for default zoom level.
- `viewportFit`: Set to `cover` to ensure the viewport covers the entire screen.

### Metadata Configuration

The `metadata` object defines the metadata for the application:
- `title`: Default title is "University Directory — University fees", with a template for dynamic titles.
- `description`: Provides a brief description of the application's purpose.

### RootLayout Component

The `RootLayout` component is the default export of the file. It is a functional component that takes `children` as a prop and returns the HTML structure of the application.

#### HTML Structure

- **`<html>` Element**: 
  - `lang`: Set to "en" for English language.
  - `class`: Includes font variables and utility classes for full height and antialiasing.
  - `suppressHydrationWarning`: Used to suppress hydration warnings in React.

- **`<head>` Element**: 
  - Includes a `<script>` tag with `dangerouslySetInnerHTML` to inject the `themeInitScript`.

- **`<body>` Element**: 
  - `class`: Includes classes for theme transition, flex layout, and text styling.
  - Wraps the main content with `ThemeProvider`, `UniverseBackground`, `SiteHeader`, and `SiteFooter`.
  - The `main` element contains the `children` prop, allowing page-specific content to be rendered.

## Conclusion

The `app/layout.tsx` file is a crucial part of the Next.js application, providing a consistent layout and styling across all pages. It manages global styles, fonts, metadata, and theme initialization, ensuring a cohesive user experience.