"use client"
 
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Toggle } from "@/registry/default/ui/toggle"

export default function ThemeToggle() { 
  const { theme, setTheme } = useTheme() 
  
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Toggle
          className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent"
          pressed={theme === "dark"}
          onPressedChange={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
          <Moon
            size={16}
            className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
            aria-hidden="true"
          />
          <Sun
            size={16}
            className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
            aria-hidden="true"
          />
        </Toggle>
      </div>
    </div>
  )
}
