"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system"
    return (localStorage.getItem("theme") as Theme | null) ?? "system"
  })

  useEffect(() => {
    const root = document.documentElement
    localStorage.setItem("theme", theme)

    if (theme !== "system") {
      root.classList.toggle("dark", theme === "dark")
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const applySystemTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      root.classList.toggle("dark", e.matches)
    }

    applySystemTheme(mediaQuery)
    mediaQuery.addEventListener("change", applySystemTheme)
    return () => mediaQuery.removeEventListener("change", applySystemTheme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
