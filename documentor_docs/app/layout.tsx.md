# Documentation Guide for `app/layout.tsx`

This document provides a detailed explanation of the `app/layout.tsx` file, which is a part of a Next.js application. This file defines the root layout component for the application, setting up global styles, fonts, metadata, and the overall structure of the HTML document.

## Purpose

The `app/layout.tsx` file is responsible for defining the root layout of the application. It sets up the HTML structure, applies global styles, initializes themes, and includes essential components like the header and footer. This layout is used to wrap all pages of the application, ensuring a consistent look and feel across the site.

## Key Components

### Imports

- **Metadata and Viewport Types**: These are imported from Next.js to define the metadata and viewport settings for the application.
- **Fonts**: The `Geist_Mono` and `Inter` fonts are imported from Google Fonts via Next.js's font optimization feature.
- **Components**: The `SiteFooter`, `SiteHeader`, `ThemeProvider`, and `UniverseBackground` components are imported from the application's components directory.
- **Theme Storage Key**: A constant `THEME_STORAGE_KEY` is imported from a library file to manage theme preferences.
- **Global Styles**: The `globals.css` file is imported to apply global CSS styles.

### Font Configuration

- **Inter Font**: Configured with a CSS variable `--font-inter` and supports the Latin subset.
- **Geist Mono Font**: Configured with a CSS variable `--font-geist-mono` and supports the Latin subset.

### Theme Initialization Script

A self-invoking function is defined as `themeInitScript` to initialize the theme based on the user's preference stored in `localStorage`. It defaults to the system's color scheme if no preference is found.

### Viewport Configuration

The `viewport` object defines the viewport settings:
- `width`: Set to `device-width` to ensure the layout adapts to the device's width.
- `initialScale`: Set to `1` for a default zoom level.
- `viewportFit`: Set to `cover` to ensure the viewport covers the entire screen.

### Metadata Configuration

The `metadata` object defines the default metadata for the application:
- **Title**: Default title is "University Directory — University fees", with a template for dynamic titles.
- **Description**: Provides a brief description of the application's purpose.

### RootLayout Component

The `RootLayout` component is the default export of the file. It is a functional component that returns the HTML structure of the application.

#### Structure

- **HTML Element**: The root element with language set to English (`lang="en"`). It applies the configured fonts and ensures full height and antialiased text rendering.
- **Head Element**: Contains a script tag that injects the `themeInitScript` to manage theme initialization.
- **Body Element**: 
  - Applies several CSS classes for layout and styling.
  - Wraps the content with the `ThemeProvider` to manage theme context.
  - Includes the `UniverseBackground`, `SiteHeader`, and `SiteFooter` components.
  - Defines a `main` section to render the `children` prop, which represents the main content of the page.

## How It Works

1. **Font and Theme Initialization**: The component initializes custom fonts and applies a theme based on user preferences or system settings.
2. **HTML Structure**: It sets up the basic HTML structure with a head and body, ensuring global styles and scripts are applied.
3. **Component Composition**: The layout includes essential components like the header, footer, and background, providing a consistent structure across all pages.
4. **Responsive Design**: The viewport settings ensure the application is responsive and fits various device screens.

This file is crucial for maintaining a consistent and responsive design across the application, leveraging Next.js features for optimized performance and user experience.