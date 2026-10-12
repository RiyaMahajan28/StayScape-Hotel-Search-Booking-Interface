"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "soulea-theme";
const THEME_SESSION_KEY = "soulea-theme-session";
const DEFAULT_THEME = "light";

const ThemeContext = createContext(undefined);

const isTheme = (value) => value === "light" || value === "dark";

function readStoredTheme() {
  for (const [storage, key] of [
    ["localStorage", THEME_STORAGE_KEY],
    ["sessionStorage", THEME_SESSION_KEY],
  ]) {
    try {
      const value = window[storage].getItem(key);
      if (isTheme(value)) return value;
    } catch {
      // Storage access can be blocked in privacy modes; fall through safely.
    }
  }

  return DEFAULT_THEME;
}

// In-memory copy so toggling still works when storage is unavailable.
let currentTheme = null;
const listeners = new Set();

const themeStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    currentTheme ??= readStoredTheme();
    return currentTheme;
  },
  getServerSnapshot() {
    return DEFAULT_THEME;
  },
  setTheme(theme) {
    currentTheme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      window.sessionStorage.setItem(THEME_SESSION_KEY, theme);
    } catch {
      // Storage can be blocked in privacy or incognito modes.
    }
    listeners.forEach((listener) => listener());
  },
};

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: themeStore.setTheme,
      toggleTheme: () => themeStore.setTheme(theme === "light" ? "dark" : "light"),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
}
