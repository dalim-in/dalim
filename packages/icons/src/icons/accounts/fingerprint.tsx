'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { IconsHandle, IconsProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const FingerprintMetadata: IconMetadata = {
    name: 'Fingerprint',
    category: 'Accounts',
    tags: ['backwards', 'reverse', 'direction', 'south', 'down', 'arrow'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-13',
    variants: ['stroke'],
}

export const Fingerprint = forwardRef<IconsHandle, IconsProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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
  <motion.path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" {...motionProps} />
  <motion.path d="M14 13.12c0 2.38 0 6.38-1 8.88" {...motionProps} />
  <motion.path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" {...motionProps} />
  <motion.path d="M2 12a10 10 0 0 1 18-6" {...motionProps} />
  <motion.path d="M2 16h.01" {...motionProps} />
  <motion.path d="M21.8 16c.2-2 .131-5.354 0-6" {...motionProps} />
  <motion.path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" {...motionProps} />
  <motion.path d="M8.65 22c.21-.66.45-1.32.57-2" {...motionProps} />
  <motion.path d="M9 6.8a6 6 0 0 1 9 5.2v2" {...motionProps} />
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
            aria-label="Fingerprint"
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

Fingerprint.displayName = 'Fingerprint'
