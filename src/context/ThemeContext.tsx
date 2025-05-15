
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"

type Theme = "light" | "dark"

export interface ThemeContextType {
  theme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [theme, setTheme] = useState<Theme>(colorScheme === "dark" ? "dark" : "light")

  useEffect(() => {
    if (colorScheme) {
      setTheme(colorScheme === "dark" ? "dark" : "light")
    }
  }, [colorScheme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  const isDarkMode = theme === "dark"

  return <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
