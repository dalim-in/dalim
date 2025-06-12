'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { IconsHandle, IconsProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const EyeOffMetadata: IconMetadata = {
  name: "EyeOff",
  category: "Accessibility",
  tags: ["help", "question", "support", "information", "circle", "faq"],
  description: "An icon depicting a question mark inside a circle, commonly used for help or support indications.",
  author: "Ali Imam",
  created: "2025-06-09",
  variants: ["stroke"]
}


export const EyeOff = forwardRef<IconsHandle, IconsProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
    const controls = useAnimation()
    const innerRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
    }))

    // Auto-start animation if loop is enabled
    useEffect(() => {
        if (loop) {
            controls.start('animate')
        }
    }, [loop, controls])

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (animation && !loop) {
                controls.start('animate')
            }
            onMouseEnter?.(e)
        },
        [controls, onMouseEnter, loop, animation]
    )

    const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (animation && !loop) {
                controls.start('normal')
            }
            onMouseLeave?.(e)
        },
        [controls, onMouseLeave, loop, animation]
    )

    // Determine stroke width based on strokeWidth

    // Determine colors based on props and variant
    const mainStrokeColor = strokeColor || color
    const mainFillColor = fillColor || color
    const secondaryFillColor = secondaryColor || `${color}40` // 40% opacity fallback

    // Determine which paths to render based on variant
    const renderPaths = () => {
        switch (variant) {
            case 'stroke':
                return (
                    <> 
                    <motion.path
  d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
  stroke={mainStrokeColor}
  fill="none"
  strokeWidth={strokeWidth}
  strokeLinecap={strokeLinecap}
  strokeLinejoin={strokeLinejoin}
  animate={controls}
  custom={{ loop, animation }}
  variants={pathVariants}
/>
<motion.path
  d="M14.084 14.158a3 3 0 0 1-4.242-4.242"
  stroke={mainStrokeColor}
  fill="none"
  strokeWidth={strokeWidth}
  strokeLinecap={strokeLinecap}
  strokeLinejoin={strokeLinejoin}
  animate={controls}
  custom={{ loop, animation }}
  variants={pathVariants}
/>
<motion.path
  d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
  stroke={mainStrokeColor}
  fill="none"
  strokeWidth={strokeWidth}
  strokeLinecap={strokeLinecap}
  strokeLinejoin={strokeLinejoin}
  animate={controls}
  custom={{ loop, animation }}
  variants={pathVariants}
/>
<motion.path
  d="m2 2 20 20"
  stroke={mainStrokeColor}
  fill="none"
  strokeWidth={strokeWidth}
  strokeLinecap={strokeLinecap}
  strokeLinejoin={strokeLinejoin}
  animate={controls}
  custom={{ loop, animation }}
  variants={pathVariants}
/>


                    </>
                )
             
            default:
                return 'stroke'
        }
    }

    return (
        <motion.div
            ref={innerRef}
            role="img"
            aria-label="EyeOff"
            className={cn('', className)}
            animate={controls}
            initial="normal"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={color}
                className={cn('', className)}
                strokeWidth={strokeWidth}
                strokeLinecap={strokeLinecap}
                strokeDasharray={strokeDasharray}
                strokeLinejoin={strokeLinejoin}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

EyeOff.displayName = 'EyeOff'
