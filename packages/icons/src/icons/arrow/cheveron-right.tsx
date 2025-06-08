'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { AccessIconHandle, AccessIconProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const cheveronrightMetadata: IconMetadata = {
  name: "ChevronRight",
  category: "Arrow",
  tags: ["key", "lock", "security", "access", "authentication", "permission"],
  description: "An icon representing access control or authentication with a key and access cards",
  author: "Ali Imam",
  created: "2023-05-15",
  variants: ["stroke", "solid", "duotone", "twotone", "bulk"]
}

export const ChevronRight = forwardRef<AccessIconHandle, AccessIconProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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
                            d="M8.56,18.88l6.88-6.88-6.88-6.88"
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
                            d="M15.72,11.03l-5.5-5.5c-.54-.54-1.41-.54-1.94,0s-.54,1.41,0,1.94l.97.97v7.11l-.97.97c-.54.54-.54,1.41,0,1.94.27.27.62.4.97.4s.7-.13.97-.4l5.5-5.5c.54-.54.54-1.41,0-1.94Z"
                            fill={mainFillColor}
                            strokeWidth={0}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={keyVariants}
                        />

                         
                    </>
                )
            case 'duotone':
                return (
                    <>
                        {/* Key part - animated with keyVariants */}
                        <motion.path
                            d="M15.44,12l-6.88,6.87"
                            fill={mainFillColor}
                            animate={controls}
                            strokeWidth={strokeWidth}
                            custom={{ loop, animation }}
                            variants={keyVariants}
                        />

                        {/* Access cards - animated with cardVariants */}
                        <motion.path
                            d="M8.56,5.12l6.87,6.88"
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
                        <motion.path
                            d="M19.73,12.54c.14-.35.14-.74,0-1.09-.07-.18-.18-.33-.31-.47l-5.7-5.7c-.56-.56-1.46-.56-2.01,0s-.56,1.46,0,2.01l1.01,1.01v2.26h-7.12c-.79,0-1.42.64-1.42,1.42s.64,1.42,1.42,1.42h7.12v2.26l-1.01,1.01c-.56.56-.56,1.46,0,2.01.28.28.64.42,1.01.42s.73-.14,1.01-.42l5.7-5.7c.13-.13.24-.29.31-.47Z"
                            stroke={mainStrokeColor}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={keyVariants}
                        />
 
                         
                    </>
                )
            case 'bulk':
                return (
                    <>
                        {/* Key part - animated with keyVariants */}
                        <motion.path
                            d="M8.56,18.88l6.88-6.88-6.88-6.88"
                            fill={mainFillColor}
                            animate={controls}
                            strokeWidth={strokeWidth}
                            custom={{ loop, animation }}
                            variants={keyVariants}
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

ChevronRight.displayName = 'ChevronRight'
