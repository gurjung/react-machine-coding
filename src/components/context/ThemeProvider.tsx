import { createContext, useEffect, useState, useContext } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // React component
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    // to set data attributes
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
