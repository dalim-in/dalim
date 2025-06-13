'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const MicrosoftMetadata: LogoMetadata = {
    name: 'Microsoft',
    category: 'Software',
    tags: ['technology', 'design', 'ai'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-13',
    variants: ['icon', 'wordmark'],
}

export const Microsoft = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <path
                            fill="#F1511B"
                            d="M121.666 121.666H0V0h121.666z"
                        />
                        <path
                            fill="#80CC28"
                            d="M256 121.666H134.335V0H256z"
                        />
                        <path
                            fill="#00ADEF"
                            d="M121.663 256.002H0V134.336h121.663z"
                        />
                        <path
                            fill="#FBBC09"
                            d="M256 256.002H134.335V134.336H256z"
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
            aria-label="Microsoft"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 256 256"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Microsoft.displayName = 'Microsoft'
