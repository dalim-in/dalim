'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const TwitchMetadata: LogoMetadata = {
    name: 'Twitch',
    category: 'Design',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Twitch = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <path
                            fill="#fff"
                            d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z"
                        />
                        <g fill="#9146ff">
                            <path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z" />
                            <path d="M1700 550h200v600h-200zm-550 0h200v600h-200z" />
                        </g>
                    </>
                )

            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="Twitch"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 2400 2800"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Twitch.displayName = 'Twitch'
