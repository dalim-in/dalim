"use client"

import { useEffect, useState } from "react"
import PatternShowcase from "@/src/components/pattern/pattern-showcase"
import { gridPatterns } from "@/src/lib/patterns"
import { Toaster } from "sonner"

export default function Home() {
  const [activePattern, setActivePattern] = useState<string | null>(null)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Find the active pattern object
  const activePatternObj = activePattern
    ? gridPatterns.find((p) => p.id === activePattern)
    : null

  // Update theme based on pattern background color
  useEffect(() => {
    if (activePatternObj) {
      // Check if pattern ID starts with "dark-" or contains specific dark colors
      const background = activePatternObj.style.background || ""
      const isDark =
        activePatternObj.id.startsWith("dark-") ||
        (typeof background === "string" &&
          (background.includes("#0") ||
            background.includes("#1") ||
            background.includes("rgba(0,") ||
            background.includes("rgba(1,")))

      setTheme(isDark ? "dark" : "light")
    } else {
      setTheme("light")
    }
  }, [activePattern, activePatternObj])

  return (
    <>
      <div className="relative min-h-screen">
        {activePatternObj && (
          <div className="fixed inset-0 -z-10" style={activePatternObj.style} />
        )}
        <div className="relative z-10">
          <PatternShowcase
            activePattern={activePattern}
            setActivePattern={setActivePattern}
            theme={theme}
          />
        </div>
      </div>
      <Toaster />
    </>
  )
}
