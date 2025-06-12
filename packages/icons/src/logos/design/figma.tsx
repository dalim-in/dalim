'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const FigmaMetadata: LogoMetadata = {
    name: 'Figma',
    category: 'Design',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Figma = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <defs>
                            <clipPath id="clippath">
                                <rect
                                    x="5.67"
                                    y="2.51"
                                    width="12.66"
                                    height="18.98"
                                    fill="none"
                                />
                            </clipPath>
                        </defs>
                        <g clipPath="url(#clippath)">
                            <g>
                                <path
                                    d="M8.84,21.49c1.75,0,3.16-1.42,3.16-3.16v-3.16h-3.16c-1.75,0-3.16,1.42-3.16,3.16s1.42,3.16,3.16,3.16Z"
                                    fill="#47ba7e"
                                />
                                <path
                                    d="M5.67,12c0-1.75,1.42-3.16,3.16-3.16h3.16v6.33h-3.16c-1.75,0-3.16-1.42-3.16-3.16Z"
                                    fill="#8062aa"
                                />
                                <path
                                    d="M5.67,5.67c0-1.75,1.42-3.16,3.16-3.16h3.16v6.33h-3.16c-1.75,0-3.16-1.42-3.16-3.16Z"
                                    fill="#f04f23"
                                />
                                <path
                                    d="M12,2.51h3.16c1.75,0,3.16,1.42,3.16,3.16s-1.42,3.16-3.16,3.16h-3.16V2.51Z"
                                    fill="#f37264"
                                />
                                <path
                                    d="M18.33,12c0,1.75-1.42,3.16-3.16,3.16s-3.16-1.42-3.16-3.16,1.42-3.16,3.16-3.16,3.16,1.42,3.16,3.16Z"
                                    fill="#46b8e9"
                                />
                            </g>
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
            aria-label="Figma"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Figma.displayName = 'Figma'
