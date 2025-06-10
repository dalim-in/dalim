'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { IconsHandle, IconsProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const CircleDotDashedMetadata: IconMetadata = {
    name: 'CircleDotDashed',
    category: 'Shapes',
    tags: ['backwards', 'reverse', 'direction', 'south', 'down', 'arrow'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['stroke'],
}

export const CircleDotDashed = forwardRef<IconsHandle, IconsProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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
                        <motion.path d="M10.1 2.18a9.93 9.93 0 0 1 3.8 0" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />
<motion.path d="M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />
<motion.path d="M21.82 10.1a9.93 9.93 0 0 1 0 3.8" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />
<motion.path d="M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />
<motion.path d="M13.9 21.82a9.94 9.94 0 0 1-3.8 0" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />
<motion.path d="M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />
<motion.path d="M2.18 13.9a9.93 9.93 0 0 1 0-3.8" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />
<motion.path d="M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />
<motion.circle cx="12" cy="12" r="1" stroke={mainStrokeColor} fill="none" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} animate={controls} custom={{ loop, animation }} variants={pathVariants} />

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
            aria-label="CircleDotDashed"
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

CircleDotDashed.displayName = 'CircleDotDashed'
