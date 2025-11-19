import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// PUBLIC_INTERFACE
export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

/**
 * PUBLIC_INTERFACE
 * ThemeProvider - Context Provider for theme state (light/dark)
 * Applies theme to <html data-theme="">
 * @param {object} props - React props
 */
export function ThemeProvider({ children, initial = "light" }) {
  const [theme, setTheme] = useState(() => initial);

  // Toggle theme light/dark
  // PUBLIC_INTERFACE
  const toggleTheme = useCallback(() => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }, []);

  // Side effect: apply current theme to document root (for CSS variables)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Accessibility: update page body class for dark or light for easy selection
  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.body.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  // Compose context value
  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useTheme - hook for accessing and manipulating theme.
 */
export function useTheme() {
  return useContext(ThemeContext);
}
