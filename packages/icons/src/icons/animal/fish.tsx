'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { IconsHandle, IconsProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const FishMetadata: IconMetadata = {
    name: 'Fish',
    category: 'Animal',
    tags: ['backwards', 'reverse', 'direction', 'south', 'down', 'arrow'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-13',
    variants: ['stroke'],
}

export const Fish = forwardRef<IconsHandle, IconsProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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

    const motionProps = {
        stroke: mainStrokeColor,
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
        fill: 'none',
        animate: controls,
        custom: { loop, animation },
        variants: pathVariants,
    }

    // Determine which paths to render based on variant
    const renderPaths = () => {
        switch (variant) {
            case 'stroke':
                return (
                    <>
                        <motion.path
                            d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"
                            {...motionProps}
                        />
                        <motion.path
                            d="M18 12v.5"
                            {...motionProps}
                        />
                        <motion.path
                            d="M16 17.93a9.77 9.77 0 0 1 0-11.86"
                            {...motionProps}
                        />
                        <motion.path
                            d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"
                            {...motionProps}
                        />
                        <motion.path
                            d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"
                            {...motionProps}
                        />
                        <motion.path
                            d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"
                            {...motionProps}
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
            aria-label="Fish"
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

Fish.displayName = 'Fish'
