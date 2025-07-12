'use client'

import * as React from 'react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '../../lib/utils'
import { IconsHandle, IconsProps, cardVariants, IconMetadata, keyVariants, pathVariants } from '../../types'

export const UserCogMetadata: IconMetadata = {
    name: 'UserCog',
    category: 'Accounts',
    tags: ['backwards', 'reverse', 'direction', 'south', 'down', 'arrow'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-07-11',
    variants: ['stroke'],
}

export const UserCog = forwardRef<IconsHandle, IconsProps>(({ onMouseEnter, onMouseLeave, className, size = '24', animation = false, color = 'currentColor', variant = 'stroke', loop = false, strokeColor, fillColor, secondaryColor, iconStyle = 'default', strokeWidth = 1, strokeLinecap = 'round', strokeLinejoin = 'round', strokeDasharray = '0 0', outline = false, onClick, outlineColor = '#fff000', ...props }, ref) => {
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
                            d="M10 15H6a4 4 0 0 0-4 4v2"
                            {...motionProps}
                        />

                        <motion.path
                            d="m14.305 16.53.923-.382"
                            {...motionProps}
                        />

                        <motion.path
                            d="m15.228 13.852-.923-.383"
                            {...motionProps}
                        />

                        <motion.path
                            d="m16.852 12.228-.383-.923"
                            {...motionProps}
                        />

                        <motion.path
                            d="m16.852 17.772-.383.924"
                            {...motionProps}
                        />

                        <motion.path
                            d="m19.148 12.228.383-.923"
                            {...motionProps}
                        />

                        <motion.path
                            d="m19.53 18.696-.382-.924"
                            {...motionProps}
                        />

                        <motion.path
                            d="m20.772 13.852.924-.383"
                            {...motionProps}
                        />

                        <motion.path
                            d="m20.772 16.148.924.383"
                            {...motionProps}
                        />

                        <motion.circle
                            cx="18"
                            cy="15"
                            r="3"
                            {...motionProps}
                        />

                        <motion.circle
                            cx="9"
                            cy="7"
                            r="4"
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
            aria-label="Key"
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

UserCog.displayName = 'UserCog'
