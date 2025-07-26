"use client"

import type React from "react"
import { useMemo, type HTMLAttributes } from "react"
import { motion } from "motion/react"

import { cn } from "@/registry/default/lib/utils"

export default function Component() {
  return (
    <div className="bg-background relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <SpaceWarpBackground color="lime-500" height={0.5} line={100}>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="z-10 text-center text-3xl font-semibold tracking-tighter whitespace-pre-wrap text-black md:text-7xl dark:text-white">
              Hyperspace Jump
            </p>
          </div>
        </div>
      </SpaceWarpBackground>
    </div>
  )
}


interface SpaceWarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  speed?: number
  color?: string
  height?: number
  line?: number
}

const WarpLine = ({
  angle,
  delay,
  color,
  height,
  duration,
}: {
  angle: number
  delay: number
  color: string
  height: number
  duration: number
}) => {
  return (
    <motion.div
      className={`absolute h-${height} bg-gradient-to-r from-transparent via-${color} to-transparent`}
      style={{
        left: "50%",
        top: "50%",
        transformOrigin: "0 50%",
        transform: `rotate(${angle}deg)`,
        width: "0px",
      }}
      initial={{
        width: "0px",
        opacity: 0,
      }}
      animate={{
        width: "200vw",
        opacity: [0, 5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      }}
    />
  )
}

export const SpaceWarpBackground: React.FC<SpaceWarpBackgroundProps> = ({
  children,
  className,
  speed = 1,
  height= 1,
  color= "yellow-500",
  line = 50,
  ...props
}) => {
  const lineCount = line
  const warpLines = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => ({
      id: i,
      angle: (360 / lineCount) * i + Math.random() * 1,
      delay: Math.random() * speed * 2,
      duration: speed * 2 + Math.random(),
    }))
  }, [speed])

  return (
    <div className={cn(className)} {...props}>
      
        {warpLines.map((line) => (
          <WarpLine
            height={height}
            color={color}
            key={`line-${line.id}`}
            angle={line.angle}
            delay={line.delay}
            duration={line.duration}
          />
        ))}
 
      <div className="relative z-10 p-8">{children}</div>
    </div>
  )
}
