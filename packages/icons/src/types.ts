"use client";
 
import type { Variants, HTMLMotionProps } from "motion/react";  

export interface IconsHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

export interface LogosHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

export interface IconMetadata {
  name: string;
  category: string;
  tags: string[];
  description?: string;
  author?: string;
  created?: string;
  variants: ("stroke" | "solid" | "duotone" | "twotone" | "bulk")[]; 
}

export interface LogoMetadata {
  name: string;
  category: string;
  tags: string[];
  description?: string;
  author?: string;
  created?: string;
  variants: ("icon" | "wordmark")[];
}

export interface FlagMetadata {
  name: string;
  category: string;
  tags: string[];
  description?: string;
  author?: string;
  created?: string;
  variants: ("icon")[];
}

export interface IconStyle {
  fill?: string 
  strokeWidth?: number
  strokeLinecap?: "butt" | "round" | "square"
  strokeLinejoin?: "round" | "miter" | "bevel"
  strokeDasharray?: string
  opacity?: number
}

export interface LogosProps extends HTMLMotionProps<"div"> {
  size?: number
  color?: string
  variant?: "icon" | "wordmark"  
  fillColor?: string 
  iconStyle?: IconStyle   
  className?: string
}

export interface IconsProps extends HTMLMotionProps<"div"> {
  size?: number
  color?: string
  variant?: "stroke" | "solid" | "duotone" | "twotone" | "bulk"
  loop?: boolean
  animation?: boolean
  onClick?: () => void
  strokeColor?: string
  fillColor?: string
  secondaryColor?: string
  iconStyle?: IconStyle
  strokeWidth?: number
  outline?: boolean
  strokeDasharray?: string,
  strokeLinecap?: "butt" | "round" | "square"
  strokeLinejoin?: "round" | "miter" | "bevel"
  outlineColor?: string
  outlineWidth?: number
  className?: string
}

export const pathVariants: Variants = {
  normal: { pathLength: 1.1, pathOffset: 0, opacity: 1 },
  animate: (custom) => {
    const { loop, animation } = typeof custom === "object" ? custom : { loop: custom, animation: true }
    return {
      pathLength: [0, 1.1],
      pathOffset: 0,
      opacity: [0, 1],
      transition: {
        duration: 1,
        repeat: loop ? Number.POSITIVE_INFINITY : 0,
        ease: "easeInOut",
        opacity: { duration: 0.5, delay: 0.1 },
        repeatDelay: loop ? 0.7 : 0,
    },
  }
  },
}

// Animation variants for the key part
export const keyVariants: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: (custom) => {
    const { loop, animation } = typeof custom === "object" ? custom : { loop: custom, animation: true }
    return {
      opacity: [0, 1],
      scale: [0.8, 1],
      transition: {
        duration: 0.3,
        repeat: loop ? Number.POSITIVE_INFINITY : 0,
        repeatType: "reverse",
        repeatDelay: loop ? 0.7 : 0,
      },
    }
  },
}

// Animation variants for the access cards
export const cardVariants: Variants = {
  normal: { opacity: 1, x: 0 },
  animate: (custom) => {
    const { loop, animation } = typeof custom === "object" ? custom : { loop: custom, animation: true }
    return {
      opacity: [0, 1],
      x: [-10, 0],
      transition: {
        duration: 0.3,
        delay: 0.2,
        repeat: loop ? Number.POSITIVE_INFINITY : 0,
        repeatType: "reverse",
        repeatDelay: loop ? 0.7 : 0,
      },
    }
  },
}

export const topVariants: Variants = {
  normal: { opacity: 1, x: 0 },
  animate: (custom) => {
    const { loop, animation } = typeof custom === "object" ? custom : { loop: custom, animation: true }
    return {
      opacity: [0, 1],
      y: [-5, 0],
      transition: {
        duration: 0.3,
        delay: 0.3,
        repeat: loop ? Number.POSITIVE_INFINITY : 0,
        repeatType: "reverse",
        repeatDelay: loop ? 0.7 : 0,
      },
    }
  },
}



export interface ExportOptions {
  format: ExportFormat
  size: number
  quality?: number
  backgroundColor?: string
  transparent?: boolean
  duration?: number // for animations
  fps?: number // for animations
}

export type StaticExportFormat = 'png' | 'svg' | 'jpg' | 'webp' | 'react'
export type AnimatedExportFormat = 'gif' | 'mp4' | 'webm' | 'png-sequence' | 'react-animated'
export type ExportFormat = StaticExportFormat | AnimatedExportFormat

export interface ExportPreset {
  name: string
  description: string
  options: Partial<ExportOptions>
}
