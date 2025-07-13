'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const PerplexityAIMetadata: LogoMetadata = {
    name: 'PerplexityAI',
    category: 'AI',
    tags: ['google', 'ai'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const PerplexityAI = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <path
                            fill="none"
                            stroke="#20808d"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M24 4.5v39M13.73 16.573v-9.99L24 16.573m0 14.5L13.73 41.417V27.01L24 16.573m0 0l10.27-9.99v9.99"
                        />
                        <path
                            fill="none"
                            stroke="#20808d"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.73 31.396H9.44V16.573h29.12v14.823h-4.29"
                        />
                        <path
                            fill="none"
                            stroke="#20808d"
                           strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M24 16.573L34.27 27.01v14.407L24 31.073"
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
            aria-label="PerplexityAI"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 48 48"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

PerplexityAI.displayName = 'PerplexityAI'
