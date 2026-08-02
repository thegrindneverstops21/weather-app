import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

{/* alias for the theme context to control theme switching */}
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

{/* create a context for the theme with default value undefined */}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

{/* provider component to provide the theme context to its children */}
export function ThemeProvider({ children }: { children: ReactNode }) {
    {/*persist theme across page reloads using localStorage*/}
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('weather-app-theme');
    return (saved as Theme) || "light";
  });

  {/* update theme across all components & persist the theme selection across page reloads */}
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('weather-app-theme', theme);
  }, [theme]);

  {/* function to handle the theme switch */}
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

{/* custom hook to use the theme context with an error message */}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}