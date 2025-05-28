"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Magnet } from "lucide-react"
 
import { Button } from "@/registry/default/ui/button"

export default function ButtonMagneticExample() {
  return (
    <ButtonMagnetic>
      <Magnet />
      Move Me
    </ButtonMagnetic>
  )
}

type ButtonMagneticProps = React.ComponentProps<typeof Button>

function ButtonMagnetic({ 
  children,
  ...props
}: ButtonMagneticProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLButtonElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setPosition({ x, y })
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <Button asChild {...props}>
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={position}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.1,
        }} >
        {children}
      </motion.button>
    </Button>
  )
}
