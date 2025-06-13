"use client"

import { useState } from "react"
import { Trash2Icon } from "lucide-react"
import { motion, useAnimation } from "motion/react"

import { cn } from "@/registry/default/lib/utils"
import { Button } from "@/registry/default/ui/button"

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  holdDuration?: number
}

export default function Components({
  className,
  holdDuration = 3000,
  ...props
}: BtnProps) {
  const [isHolding, setIsHolding] = useState(false)
  const controls = useAnimation()

  async function handleHoldStart() {
    setIsHolding(true)
    controls.set({ width: "0%" })
    await controls.start({
      width: "100%",
      transition: {
        duration: holdDuration / 1000,
        ease: "linear",
      },
    })
  }

  function handleHoldEnd() {
    setIsHolding(false)
    controls.stop()
    controls.start({
      width: "0%",
      transition: { duration: 0.1 },
    })
  }

  return (
    <Button
      className={cn("relative touch-none overflow-hidden", "", className)}
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
      onTouchCancel={handleHoldEnd}
      {...props}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={controls}
        className="bg-destructive absolute top-0 left-0 h-full"
      />
      <span className="relative z-10 flex w-full items-center justify-center gap-2">
        <Trash2Icon className="h-4 w-4" />
        {!isHolding ? "Hold me" : "Release"}
      </span>
    </Button>
  )
}
