# Documentation Guide for `lib/theme-storage.ts`

This document provides a detailed explanation of the `lib/theme-storage.ts` file, which is responsible for handling theme-related operations in a web application. The file primarily deals with storing, retrieving, and applying theme modes (either "light" or "dark") using the browser's local storage and system preferences.

## Purpose

The purpose of this module is to manage the theme mode of a web application. It allows the application to:

1. Store the user's theme preference in the browser's local storage.
2. Retrieve the stored theme preference.
3. Determine the system's preferred theme mode.
4. Apply the selected theme mode to the document.

## Key Components

### Constants

- **`THEME_STORAGE_KEY`**: A constant string key `"university-directory-theme"` used to store and retrieve the theme mode from the browser's local storage.

### Functions

1. **`isThemeMode(value: string | null): value is ThemeMode`**

   - **Purpose**: This type guard function checks if a given string value is a valid `ThemeMode`.
   - **Parameters**: 
     - `value`: A string or null value that needs to be checked.
   - **Returns**: A boolean indicating whether the value is either `"light"` or `"dark"`.

2. **`readStoredTheme(): ThemeMode | null`**

   - **Purpose**: Retrieves the stored theme mode from the browser's local storage.
   - **Returns**: 
     - The stored theme mode if it is valid (`"light"` or `"dark"`).
     - `null` if the theme mode is not set or if the code is executed in a non-browser environment (e.g., server-side).

3. **`resolveSystemTheme(): ThemeMode`**

   - **Purpose**: Determines the system's preferred theme mode based on the user's operating system settings.
   - **Returns**: 
     - `"dark"` if the system prefers a dark color scheme.
     - `"light"` if the system prefers a light color scheme or if the code is executed in a non-browser environment.

4. **`applyThemeToDocument(theme: ThemeMode): void`**

   - **Purpose**: Applies the specified theme mode to the document by toggling the "dark" class on the document's root element.
   - **Parameters**: 
     - `theme`: The theme mode to be applied, either `"light"` or `"dark"`.
   - **Behavior**: Adds the "dark" class to the document's root element if the theme is `"dark"`; otherwise, it removes the "dark" class.

## How It Works

- The module uses the browser's `localStorage` to persist the user's theme preference across sessions.
- It provides a mechanism to check if a stored value is a valid theme mode using the `isThemeMode` function.
- The `readStoredTheme` function attempts to read the theme from `localStorage` and validates it.
- The `resolveSystemTheme` function uses the `window.matchMedia` API to detect the system's preferred color scheme.
- The `applyThemeToDocument` function manipulates the document's class list to reflect the chosen theme, ensuring the UI is styled accordingly.

This module is essential for maintaining a consistent user experience by respecting user preferences and system settings for theme modes.