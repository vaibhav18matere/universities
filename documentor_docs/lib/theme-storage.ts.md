# Documentation Guide for `lib/theme-storage.ts`

## Overview

The `lib/theme-storage.ts` file is a TypeScript module designed to manage theme settings for a web application. It provides utilities to read, resolve, and apply theme modes, specifically focusing on light and dark themes. The module interacts with the browser's `localStorage` to persist user theme preferences and uses the `window.matchMedia` API to detect system theme preferences.

## Key Components

### Constants

- **`THEME_STORAGE_KEY`**: A constant string `"university-directory-theme"` used as the key for storing and retrieving the theme mode from `localStorage`.

### Type Imports

- **`ThemeMode`**: An imported type from `@/lib/theme-types`, representing the possible theme modes. Although the specific definition of `ThemeMode` is not provided in this file, it is implied to include at least `"light"` and `"dark"`.

### Functions

1. **`isThemeMode(value: string | null): value is ThemeMode`**

   - **Purpose**: A type guard function that checks if a given string value is a valid `ThemeMode`.
   - **Parameters**: 
     - `value`: A string or `null` that represents a potential theme mode.
   - **Returns**: A boolean indicating whether the `value` is `"light"` or `"dark"`.

2. **`readStoredTheme(): ThemeMode | null`**

   - **Purpose**: Retrieves the stored theme mode from the browser's `localStorage`.
   - **Returns**: 
     - The stored theme mode if it is valid (`"light"` or `"dark"`).
     - `null` if the theme mode is not set, invalid, or if the code is executed in a non-browser environment (e.g., server-side).

3. **`resolveSystemTheme(): ThemeMode`**

   - **Purpose**: Determines the system's preferred theme mode using the `window.matchMedia` API.
   - **Returns**: 
     - `"dark"` if the system prefers a dark color scheme.
     - `"light"` if the system prefers a light color scheme or if the code is executed in a non-browser environment.

4. **`applyThemeToDocument(theme: ThemeMode): void`**

   - **Purpose**: Applies the specified theme mode to the document by toggling the `"dark"` class on the `document.documentElement`.
   - **Parameters**: 
     - `theme`: The theme mode to apply, either `"light"` or `"dark"`.
   - **Behavior**: Adds the `"dark"` class if the theme is `"dark"`; otherwise, it removes the `"dark"` class.

## How It Works

- **Theme Detection and Storage**: The module provides functionality to detect the user's theme preference either from the stored value in `localStorage` or from the system's settings. It uses the `THEME_STORAGE_KEY` to store and retrieve the theme mode.
  
- **Theme Application**: Once a theme mode is determined, it can be applied to the document. The `applyThemeToDocument` function modifies the document's root element class list to reflect the chosen theme, enabling CSS styles associated with the `"dark"` class when the dark theme is active.

This module is essential for maintaining a consistent user experience by respecting user preferences and system settings for theme modes.