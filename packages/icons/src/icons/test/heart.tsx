'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { AccessIconHandle, AccessIconProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const heartMetadata: IconMetadata = {
  name: "Heart",
  category: "health",
  tags: ["health", "love", "romantic", "beautiful"],
  description: "An icon representing access control or authentication with a key and access cards",
  author: "Ali Imam",
  created: "2023-05-15",
  variants: ["stroke", "solid", "duotone", "twotone", "bulk"]
}

export const Heart = forwardRef<AccessIconHandle, AccessIconProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'miter', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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
                        {/* Key part - animated with keyVariants */}
                        <motion.path
                            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
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
            case 'solid':
                return (
                    <>
                        {/* Key part - animated with keyVariants */}
                        <motion.path
                            d="M4.92,19.43c0,.42.17,.82.46,1.12l1.22,1.22c.31,.31.81,.31,1.12,0l1.68-1.68c.31-.31.31-.81,0-1.12l-.56-.56c-.31-.31-.31-.81,0-1.12l.56-.56c.31-.31.31-.81,0-1.12l-.56-.56c-.31-.31-.31-.81,0-1.12l.1-.1c.3-.3.46-.7.46-1.12v-.91c2.56-1.24,3.64-4.32,2.4-6.88-1.24-2.56-4.32-3.64-6.88-2.4-2.56,1.24-3.64,4.32-2.4,6.88.51,1.05,1.35,1.89,2.4,2.4v7.64ZM7.16,6.6c.22,0,.4.18.4.4s-.18.4-.4.4-.4-.18-.4-.4.18-.4.4-.4Z"
                            fill={mainFillColor}
                            strokeWidth={0}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={keyVariants}
                        />

                        {/* Access cards - animated with cardVariants */}
                        <motion.path
                            d="M13,14h6c.93,0,1.4,0,1.77.15.49.2.88.59,1.08,1.08.15.37.15.83.15,1.77s0,1.4-.15,1.77c-.2.49-.59.88-1.08,1.08-.37.15-.83.15-1.77.15h-6Z"
                            fill={mainFillColor}
                            animate={controls}
                            strokeWidth={0}
                            custom={{ loop, animation }}
                            variants={cardVariants}
                        />
                        <motion.path
                            d="M15,5h4c.93,0,1.4,0,1.77.15.49.2.88.59,1.08,1.08.15.37.15.83.15,1.77s0,1.4-.15,1.77c-.2.49-.59.88-1.08,1.08-.37.15-.83.15-1.77.15h-4Z"
                            fill={mainFillColor}
                            animate={controls}
                            strokeWidth={0}
                            custom={{ loop, animation }}
                            variants={cardVariants}
                        />
                    </>
                )
            case 'duotone':
                return (
                    <>
                        {/* Key part - animated with keyVariants */}
                        <motion.path
                            d="M4.92,19.43c0,.42.17,.82.46,1.12l1.22,1.22c.31,.31.81,.31,1.12,0l1.68-1.68c.31-.31.31-.81,0-1.12l-.56-.56c-.31-.31-.31-.81,0-1.12l.56-.56c.31-.31.31-.81,0-1.12l-.56-.56c-.31-.31-.31-.81,0-1.12l.1-.1c.3-.3.46-.7.46-1.12v-.91c2.56-1.24,3.64-4.32,2.4-6.88-1.24-2.56-4.32-3.64-6.88-2.4-2.56,1.24-3.64,4.32-2.4,6.88.51,1.05,1.35,1.89,2.4,2.4v7.64Z"
                            fill={mainFillColor}
                            animate={controls}
                            strokeWidth={strokeWidth}
                            custom={{ loop, animation }}
                            variants={keyVariants}
                        />

                        {/* Access cards - animated with cardVariants */}
                        <motion.path
                            d="M13,14h6c.93,0,1.4,0,1.77.15.49.2.88.59,1.08,1.08.15.37.15.83.15,1.77s0,1.4-.15,1.77c-.2.49-.59.88-1.08,1.08-.37.15-.83.15-1.77.15h-6ZM15,5h4c.93,0,1.4,0,1.77.15.49.2.88.59,1.08,1.08.15.37.15.83.15,1.77s0,1.4-.15,1.77c-.2.49-.59.88-1.08,1.08-.37.15-.83.15-1.77.15h-4Z"
                            fill={secondaryFillColor}
                            animate={controls}
                            strokeWidth={strokeWidth}
                            custom={{ loop, animation }}
                            variants={cardVariants}
                        />
                    </>
                )
            case 'twotone':
                return (
                    <>
                        {/* Key part - animated with keyVariants */}
                        <motion.path
                            d="M4.92,19.43c0,.42.17,.82.46,1.12l1.22,1.22c.31,.31.81,.31,1.12,0l1.68-1.68c.31-.31.31-.81,0-1.12l-.56-.56c-.31-.31-.31-.81,0-1.12l.56-.56c.31-.31.31-.81,0-1.12l-.56-.56c-.31-.31-.31-.81,0-1.12l.1-.1c.3-.3.46-.7.46-1.12v-.91c2.56-1.24,3.64-4.32,2.4-6.88-1.24-2.56-4.32-3.64-6.88-2.4-2.56,1.24-3.64,4.32-2.4,6.88.51,1.05,1.35,1.89,2.4,2.4v7.64Z"
                            stroke={mainStrokeColor}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={keyVariants}
                        />

                        {/* Access cards - animated with cardVariants */}
                        <motion.path
                            d="M13,14h6c.93,0,1.4,0,1.77.15.49.2.88.59,1.08,1.08.15.37.15.83.15,1.77s0,1.4-.15,1.77c-.2.49-.59.88-1.08,1.08-.37.15-.83.15-1.77.15h-6"
                            stroke={secondaryFillColor}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            strokeDasharray={strokeDasharray}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={cardVariants}
                        />
                        <motion.path
                            d="M15,5h4c.93,0,1.4,0,1.77.15.49.2.88.59,1.08,1.08.15.37.15.83.15,1.77s0,1.4-.15,1.77c-.2.49-.59.88-1.08,1.08-.37.15-.83.15-1.77.15h-4"
                            stroke={secondaryFillColor}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            strokeDasharray={strokeDasharray}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={cardVariants}
                        />
                    </>
                )
            case 'bulk':
                return (
                    <>
                        {/* Key part - animated with keyVariants */}
                        <motion.path
                            d="M4.92,19.43c0,.42.17,.82.46,1.12l1.22,1.22c.31,.31.81,.31,1.12,0l1.68-1.68c.31-.31.31-.81,0-1.12l-.56-.56c-.31-.31-.31-.81,0-1.12l.56-.56c.31-.31.31-.81,0-1.12l-.56-.56c-.31-.31-.31-.81,0-1.12l.1-.1c.3-.3.46-.7.46-1.12v-.91c2.56-1.24,3.64-4.32,2.4-6.88-1.24-2.56-4.32-3.64-6.88-2.4-2.56,1.24-3.64,4.32-2.4,6.88.51,1.05,1.35,1.89,2.4,2.4v7.64Z"
                            fill={mainFillColor}
                            animate={controls}
                            strokeWidth={strokeWidth}
                            custom={{ loop, animation }}
                            variants={keyVariants}
                        />

                        {/* Access cards - animated with cardVariants */}
                        <motion.path
                            d="M13,14h6c.93,0,1.4,0,1.77.15.49.2.88.59,1.08,1.08.15.37.15.83.15,1.77s0,1.4-.15,1.77c-.2.49-.59.88-1.08,1.08-.37.15-.83.15-1.77.15h-6ZM15,5h4c.93,0,1.4,0,1.77.15.49.2.88.59,1.08,1.08.15.37.15.83.15,1.77s0,1.4-.15,1.77c-.2.49-.59.88-1.08,1.08-.37.15-.83.15-1.77.15h-4Z"
                            fill={secondaryFillColor}
                            animate={controls}
                            strokeWidth={strokeWidth}
                            custom={{ loop, animation }}
                            variants={cardVariants}
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
            aria-label="Access"
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

Heart.displayName = 'Heart'
