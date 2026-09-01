# ThemeProvider.tsx Documentation

## Overview

The `ThemeProvider.tsx` file is a React component that manages and provides theme-related functionality to its child components. It allows for the setting, toggling, and storing of theme preferences (e.g., light or dark mode) using React Context and local storage.

## Key Components

### Imports

- **React Hooks and Types**: 
  - `createContext`, `useCallback`, `useContext`, `useEffect`, `useMemo`, `useState`, `ReactNode` are imported from React to manage state, context, and lifecycle within the component.
  
- **Theme Types**:
  - `ThemeMode` is imported from `@/lib/theme-types` to define the type of theme modes available.

- **Theme Utilities**:
  - `applyThemeToDocument`, `readStoredTheme`, `resolveSystemTheme`, `THEME_STORAGE_KEY` are imported from `@/lib/theme-storage` to handle theme application, retrieval, and storage.

### Types

- **ThemeContextValue**: 
  - An object type that includes:
    - `theme`: The current theme mode.
    - `setTheme`: A function to set the theme.
    - `toggleTheme`: A function to toggle between themes.

- **ThemeProviderProps**:
  - An object type that includes:
    - `children`: ReactNode representing the child components that will consume the theme context.

### ThemeContext

- **ThemeContext**: 
  - Created using `createContext` with an initial value of `null`. It holds the theme-related state and functions.

### ThemeProvider Component

- **Initialization**:
  - The component initializes the theme state using `useState` with a default value of `"light"`.

- **useEffect**:
  - On component mount, it reads the stored theme from local storage using `readStoredTheme`.
  - If no stored theme is found, it resolves the system theme using `resolveSystemTheme`.
  - The initial theme is then set and applied to the document using `applyThemeToDocument`.

- **setTheme Function**:
  - A `useCallback` hook is used to define `setTheme`, which updates the theme state, stores the new theme in local storage, and applies it to the document.

- **toggleTheme Function**:
  - Another `useCallback` hook defines `toggleTheme`, which switches the theme between "light" and "dark", updates the state, stores the new theme, and applies it to the document.

- **useMemo**:
  - The `value` object, containing `theme`, `setTheme`, and `toggleTheme`, is memoized to optimize performance and prevent unnecessary re-renders.

- **Provider**:
  - The `ThemeContext.Provider` wraps the `children` and provides the `value` object to all descendant components.

### useTheme Hook

- **useTheme**:
  - A custom hook that retrieves the theme context using `useContext`.
  - Throws an error if used outside of a `ThemeProvider`.

## Usage

To use the `ThemeProvider`, wrap it around the component tree where theme management is required. The `useTheme` hook can then be used within any descendant component to access and manipulate the theme.

```jsx
import { ThemeProvider, useTheme } from './ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <YourComponent />
    </ThemeProvider>
  );
}

function YourComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();

  // Use theme, setTheme, and toggleTheme as needed
}
```

This setup ensures that the theme state is globally accessible and manageable across the application.