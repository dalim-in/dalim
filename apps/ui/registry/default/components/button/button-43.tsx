"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [capsLock, setCapsLock] = useState(false)
  const [shift, setShift] = useState(false)
  const [numLock, setNumLock] = useState(true)
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  )

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKey(e.key)
      if (e.key === "CapsLock") setCapsLock((prev) => !prev)
      if (e.key === "Shift") setShift(true)
      if (e.key === "NumLock") setNumLock((prev) => !prev)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKey(null)
      if (e.key === "Shift") setShift(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const handleKeyPress = (key: string) => {
    setPressedKey(key)
    setTimeout(() => setPressedKey(null), 150)

    if (key === "CapsLock") {
      setCapsLock(!capsLock)
    } else if (key === "Shift") {
      setShift(!shift)
    } else if (key === "NumLock") {
      setNumLock(!numLock)
    } else {
      // Only turn off shift after a non-modifier key press
      if (shift) setShift(false)
    }
  }

  const getKeyDisplay = (key: string, shiftSymbol?: string) => {
    if (key.length === 1 && key.match(/[a-z]/)) {
      return capsLock || shift ? key.toUpperCase() : key
    }
    return shift && shiftSymbol ? shiftSymbol : key
  } 

  const isCompact = windowWidth < 768 // More compact layout on mobile

  const KeyButton = ({
    children,
    subLabel,
    className = "",
    variant = "outline" as const,
    onClick,
    isPressed = false,
    isActive = false,
    size = "default",
  }: {
    children: React.ReactNode
    subLabel?: React.ReactNode
    className?: string
    variant?: "outline" | "secondary" | "default"
    onClick?: () => void
    isPressed?: boolean
    isActive?: boolean
    size?: "sm" | "default" | "lg" | "xl"
  }) => {
    const sizeClasses = {
      sm: "h-8 min-w-8 text-xs",
      default: isCompact ? "h-10 min-w-10 text-xs" : "h-12 min-w-12 text-sm",
      lg: isCompact ? "h-10 min-w-16 text-xs" : "h-12 min-w-20 text-sm",
      xl: isCompact ? "h-10 min-w-20 text-xs" : "h-12 min-w-24 text-sm",
    }

    return (
      <Button
        variant={isActive ? "default" : variant}
        className={` ${sizeClasses[size]} relative flex flex-col items-center justify-center font-mono transition-all duration-150 ${isPressed ? "bg-muted scale-95 shadow-inner" : "shadow-[0_2px_0_0_rgba(0,0,0,0.1)]"} ${className} `}
        onClick={onClick}
      >
        {subLabel && (
          <span className="text-muted-foreground absolute top-1 left-1.5 text-[0.6rem] opacity-80">
            {subLabel}
          </span>
        )}
        {children}
      </Button>
    )
  }

  const numberRow = [
    { key: "`", shiftSymbol: "~" },
    { key: "1", shiftSymbol: "!" },
    { key: "2", shiftSymbol: "@" },
    { key: "3", shiftSymbol: "#" },
    { key: "4", shiftSymbol: "$" },
    { key: "5", shiftSymbol: "%" },
    { key: "6", shiftSymbol: "^" },
    { key: "7", shiftSymbol: "&" },
    { key: "8", shiftSymbol: "*" },
    { key: "9", shiftSymbol: "(" },
    { key: "0", shiftSymbol: ")" },
    { key: "-", shiftSymbol: "_" },
    { key: "=", shiftSymbol: "+" },
  ]

  const topRow = [
    { key: "q" },
    { key: "w" },
    { key: "e" },
    { key: "r" },
    { key: "t" },
    { key: "y" },
    { key: "u" },
    { key: "i" },
    { key: "o" },
    { key: "p" },
    { key: "[", shiftSymbol: "{" },
    { key: "]", shiftSymbol: "}" },
    { key: "\\", shiftSymbol: "|" },
  ]

  const middleRow = [
    { key: "a" },
    { key: "s" },
    { key: "d" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: ";", shiftSymbol: ":" },
    { key: "'", shiftSymbol: '"' },
  ]

  const bottomRow = [
    { key: "z" },
    { key: "x" },
    { key: "c" },
    { key: "v" },
    { key: "b" },
    { key: "n" },
    { key: "m" },
    { key: ",", shiftSymbol: "<" },
    { key: ".", shiftSymbol: ">" },
    { key: "/", shiftSymbol: "?" },
  ] 
  return (
    <div className="">
      <div className="space-y-1 sm:space-y-2">
        <div className="flex gap-2 md:gap-4">
          <div className="flex-1">
            {/* Number Row */}
            <div className="flex flex-wrap justify-center gap-1">
              {numberRow.map((item) => (
                <KeyButton
                  key={item.key}
                  onClick={() => handleKeyPress(item.key)}
                  isPressed={pressedKey === item.key}
                  subLabel={item.shiftSymbol}
                >
                  {getKeyDisplay(item.key, item.shiftSymbol)}
                </KeyButton>
              ))}
              <KeyButton
                className={isCompact ? "min-w-16" : "min-w-20"}
                onClick={() => handleKeyPress("Backspace")}
                isPressed={pressedKey === "Backspace"}
                size="lg"
              >
                ⌫
              </KeyButton>
            </div>

            {/* Top Row */}
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              <KeyButton
                size="lg"
                onClick={() => handleKeyPress("Tab")}
                isPressed={pressedKey === "Tab"}
              >
                Tab
              </KeyButton>
              {topRow.map((item) => (
                <KeyButton
                  key={item.key}
                  onClick={() => handleKeyPress(item.key)}
                  isPressed={pressedKey === item.key}
                  subLabel={item.shiftSymbol}
                >
                  {getKeyDisplay(item.key, item.shiftSymbol)}
                </KeyButton>
              ))}
            </div>

            {/* Middle Row */}
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              <KeyButton
                size="xl"
                onClick={() => handleKeyPress("CapsLock")}
                isPressed={pressedKey === "CapsLock"}
                isActive={capsLock}
              >
                Caps
              </KeyButton>
              {middleRow.map((item) => (
                <KeyButton
                  key={item.key}
                  onClick={() => handleKeyPress(item.key)}
                  isPressed={pressedKey === item.key}
                  subLabel={item.shiftSymbol}
                >
                  {getKeyDisplay(item.key, item.shiftSymbol)}
                </KeyButton>
              ))}
              <KeyButton
                size="xl"
                onClick={() => handleKeyPress("Enter")}
                isPressed={pressedKey === "Enter"}
              >
                Enter
              </KeyButton>
            </div>

            {/* Bottom Row */}
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              <KeyButton
                size="xl"
                onClick={() => handleKeyPress("Shift")}
                isPressed={pressedKey === "Shift"}
                isActive={shift}
              >
                Shift
              </KeyButton>
              {bottomRow.map((item) => (
                <KeyButton
                  key={item.key}
                  onClick={() => handleKeyPress(item.key)}
                  isPressed={pressedKey === item.key}
                  subLabel={item.shiftSymbol}
                >
                  {getKeyDisplay(item.key, item.shiftSymbol)}
                </KeyButton>
              ))}
              <KeyButton
                size="xl"
                onClick={() => handleKeyPress("Shift")}
                isPressed={pressedKey === "Shift"}
                isActive={shift}
              >
                Shift
              </KeyButton>
            </div>

            {/* Space Row */}
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              <KeyButton
                size="lg"
                onClick={() => handleKeyPress("Control")}
                isPressed={pressedKey === "Control"}
              >
                Ctrl
              </KeyButton>
              <KeyButton
                size="lg"
                onClick={() => handleKeyPress("Meta")}
                isPressed={pressedKey === "Meta"}
              >
                ⊞
              </KeyButton>
              <KeyButton
                size="lg"
                onClick={() => handleKeyPress("Alt")}
                isPressed={pressedKey === "Alt"}
              >
                Alt
              </KeyButton>
              <KeyButton
                className="max-w-xs flex-1"
                onClick={() => handleKeyPress(" ")}
                isPressed={pressedKey === " "}
              >
                {" "}
              </KeyButton>
              <KeyButton
                size="lg"
                onClick={() => handleKeyPress("Alt")}
                isPressed={pressedKey === "Alt"}
              >
                Alt
              </KeyButton>
              <KeyButton
                size="lg"
                onClick={() => handleKeyPress("ContextMenu")}
                isPressed={pressedKey === "ContextMenu"}
              >
                ☰
              </KeyButton>
              <KeyButton
                size="lg"
                onClick={() => handleKeyPress("Control")}
                isPressed={pressedKey === "Control"}
              >
                Ctrl
              </KeyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
