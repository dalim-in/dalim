'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const YoutubeMusicMetadata: LogoMetadata = {
    name: 'YoutubeMusic',
    category: 'Music',
    tags: ['technology', 'design'],
    description: 'An icon representing the YoutubeMusic platform logo',
    author: 'Ali Imam',
    created: '2025-06-13',
    variants: ['icon', 'wordmark'],
}

export const YoutubeMusic = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <path
                            fill="none"
                            d="M0 0h192v192H0z"
                        />
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            fill="red"
                        />
                        <path
                            fill="#FFF"
                            d="M96 50.32c25.19 0 45.68 20.49 45.68 45.68S121.19 141.68 96 141.68 50.32 121.19 50.32 96 70.81 50.32 96 50.32m0-6.4c-28.76 0-52.08 23.32-52.08 52.08 0 28.76 23.32 52.08 52.08 52.08s52.08-23.32 52.08-52.08c0-28.76-23.32-52.08-52.08-52.08z"
                        />
                        <path
                            fill="#FFF"
                            d="m79 122 45-26-45-26z"
                        />
                    </>
                )
            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="YoutubeMusic"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 192 192"
                preserveAspectRatio="xMidYMid"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

YoutubeMusic.displayName = 'YoutubeMusic'
