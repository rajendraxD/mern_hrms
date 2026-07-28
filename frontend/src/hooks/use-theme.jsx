import { createContext, useContext, useEffect, useState, useCallback } from "react"

const STORAGE_KEY = "theme"
const THEMES = ["light", "dark", "system"]

function getSystemTheme() {
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getResolvedTheme(saved) {
  return saved === "system" ? getSystemTheme() : saved
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "system"
  })

  const setTheme = useCallback((t) => {
    localStorage.setItem(STORAGE_KEY, t)
    setThemeState(t)
  }, [])

  // apply .dark class to <html>
  useEffect(() => {
    const resolved = getResolvedTheme(theme)
    document.documentElement.classList.toggle("dark", resolved === "dark")
  }, [theme])

  // listen for system preference changes when in "system" mode
  useEffect(() => {
    if (theme !== "system") return
    const mq = matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      document.documentElement.classList.toggle("dark", mq.matches)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
