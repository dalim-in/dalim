'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { IconsHandle, IconsProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const GlassesMetadata: IconMetadata = {
  name: "Glasses",
  category: "Accessibility",
  tags: ["help", "question", "support", "information", "circle", "faq"],
  description: "An icon depicting a question mark inside a circle, commonly used for help or support indications.",
  author: "Ali Imam",
  created: "2025-06-09",
  variants: ["stroke"]
}


export const Glasses = forwardRef<IconsHandle, IconsProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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
                  <motion.circle
  cx="6"
  cy="15"
  r="4"
  stroke={mainStrokeColor}
  fill="none"
  strokeWidth={strokeWidth}
  animate={controls}
  custom={{ loop, animation }}
  variants={pathVariants}
/>
<motion.circle
  cx="18"
  cy="15"
  r="4"
  stroke={mainStrokeColor}
  fill="none"
  strokeWidth={strokeWidth}
  animate={controls}
  custom={{ loop, animation }}
  variants={pathVariants}
/>
<motion.path
  d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"
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
  d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"
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
  d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"
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
            aria-label="Glasses"
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

Glasses.displayName = 'Glasses'
