'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const FacebookMetadata: LogoMetadata = {
    name: 'Facebook',
    category: 'Social',
    tags: ['technology', 'design'],
    description: 'An icon representing the Facebook platform logo',
    author: 'Ali Imam',
    created: '2025-06-13',
    variants: ['icon', 'wordmark'],
}

export const Facebook = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <defs>
                            <linearGradient
                                x1="50%"
                                x2="50%"
                                y1="97.078%"
                                y2="0%"
                                id="a">
                                <stop
                                    offset="0%"
                                    stopColor="#0062E0"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#19AFFF"
                                />
                            </linearGradient>
                        </defs>
                        <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" />
                        <path
                            fill="#FFF"
                            d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
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
            aria-label="Facebook"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 36 36"
                fill="url(#a)"
                preserveAspectRatio="xMidYMid"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Facebook.displayName = 'Facebook'
