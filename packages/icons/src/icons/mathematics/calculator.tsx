'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { IconsHandle, IconsProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const CalculatorMetadata: IconMetadata = {
    name: 'Calculator',
    category: 'Mathematics',
    tags: ['backwards', 'reverse', 'direction', 'south', 'down', 'arrow'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-09',
    variants: ['stroke'],
}

export const Calculator = forwardRef<IconsHandle, IconsProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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
                        <motion.rect
                            width="16"
                            height="20"
                            x="4"
                            y="2"
                            rx="2"
                            stroke={mainStrokeColor}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={pathVariants}
                        />
                        <motion.line
                            x1="8"
                            x2="16"
                            y1="6"
                            y2="6"
                            stroke={mainStrokeColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={pathVariants}
                        />
                        <motion.line
                            x1="16"
                            x2="16"
                            y1="14"
                            y2="18"
                            stroke={mainStrokeColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            animate={controls}
                            custom={{ loop, animation }}
                            variants={pathVariants}
                        />
                        {['M16 10h.01', 'M12 10h.01', 'M8 10h.01', 'M12 14h.01', 'M8 14h.01', 'M12 18h.01', 'M8 18h.01'].map((d, i) => (
                            <motion.path
                                key={i}
                                d={d}
                                stroke={mainStrokeColor}
                                fill="none"
                                strokeWidth={strokeWidth}
                                strokeLinecap={strokeLinecap}
                                strokeLinejoin={strokeLinejoin}
                                animate={controls}
                                custom={{ loop, animation }}
                                variants={pathVariants}
                            />
                        ))}
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
            aria-label="Calculator"
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

Calculator.displayName = 'Calculator'
