'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { IconsHandle, IconsProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const SpeechMetadata: IconMetadata = {
    name: 'Speech',
    category: 'Accessibility',
    tags: ['help', 'question', 'support', 'Speech', 'circle', 'faq'],
    description: 'An icon depicting a question mark inside a circle, commonly used for help or support indications.',
    author: 'Ali Imam',
    created: '2025-06-13',
    variants: ['stroke'],
}

export const Speech = forwardRef<IconsHandle, IconsProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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
    d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"
    stroke={mainStrokeColor}
    strokeWidth={strokeWidth}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    fill="none"
    animate={controls}
    custom={{ loop, animation }}
    variants={pathVariants}
  />
  <motion.path
    d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"
    stroke={mainStrokeColor}
    strokeWidth={strokeWidth}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    fill="none"
    animate={controls}
    custom={{ loop, animation }}
    variants={pathVariants}
  />
  <motion.path
    d="M17 15a3.5 3.5 0 0 0-.025-4.975"
    stroke={mainStrokeColor}
    strokeWidth={strokeWidth}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    fill="none"
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
            aria-label="Speech"
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

Speech.displayName = 'Speech'
