# ThemeProvider.tsx Documentation

## Overview

The `ThemeProvider.tsx` file is a React component that manages and provides theme-related functionality to its child components. It allows for the setting, toggling, and storing of theme preferences (e.g., light or dark mode) using React's Context API. This component ensures that the theme state is consistent across the application and persists user preferences using local storage.

## Key Components

### 1. **ThemeContext**

- **Type**: `React.Context<ThemeContextValue | null>`
- **Purpose**: Provides a context for theme-related data and functions. It is initialized with `null` and is later populated with the current theme state and functions to manipulate it.

### 2. **ThemeProvider**

- **Type**: `React.FC<ThemeProviderProps>`
- **Props**: 
  - `children`: ReactNode - The child components that will have access to the theme context.
- **Purpose**: 
  - Manages the theme state and provides functions to set and toggle the theme.
  - Initializes the theme state based on stored preferences or system settings.
  - Applies the theme to the document and stores the preference in local storage.

### 3. **useTheme**

- **Type**: `() => ThemeContextValue`
- **Purpose**: 
  - A custom hook that provides access to the theme context.
  - Ensures that the hook is used within a `ThemeProvider` by throwing an error if the context is `null`.

## How It Works

1. **State Initialization**:
   - The `ThemeProvider` component initializes the theme state using `useState` with a default value of `"light"`.
   - On component mount (`useEffect`), it reads the stored theme from local storage using `readStoredTheme()`.
   - If no stored theme is found, it resolves the system theme using `resolveSystemTheme()`.
   - The initial theme is then applied to the document using `applyThemeToDocument()`.

2. **Setting the Theme**:
   - The `setTheme` function updates the theme state, stores the new theme in local storage, and applies it to the document.
   - It is memoized using `useCallback` to prevent unnecessary re-creations.

3. **Toggling the Theme**:
   - The `toggleTheme` function switches the theme between "light" and "dark".
   - It updates the theme state, stores the new theme in local storage, and applies it to the document.
   - It is also memoized using `useCallback`.

4. **Providing Context**:
   - The `ThemeProvider` component uses `useMemo` to create a stable context value containing the current theme and the functions to manipulate it.
   - This context value is provided to child components via `ThemeContext.Provider`.

5. **Consuming Context**:
   - The `useTheme` hook allows components to access the theme context.
   - It ensures that it is used within a `ThemeProvider` by checking if the context is `null`.

## Usage

To use the `ThemeProvider`, wrap your application or component tree with it:

```jsx
import { ThemeProvider } from './path/to/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <YourComponent />
    </ThemeProvider>
  );
}
```

To access the theme context within a component, use the `useTheme` hook:

```jsx
import { useTheme } from './path/to/ThemeProvider';

function YourComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();

  // Use theme, setTheme, and toggleTheme as needed
}
```

This setup ensures that all components within the `ThemeProvider` can access and manipulate the theme state consistently.