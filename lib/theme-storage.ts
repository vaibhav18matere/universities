import type { ThemeMode } from "@/lib/theme-types";

export const THEME_STORAGE_KEY = "university-directory-theme";

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function readStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemeMode(stored)) {
    return stored;
  }
  return null;
}

export function resolveSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyThemeToDocument(theme: ThemeMode): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
