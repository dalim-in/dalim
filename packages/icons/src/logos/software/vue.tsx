'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const VueMetadata: LogoMetadata = {
    name: 'Vue',
    category: 'Software',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Vue = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <path
                            d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"
                            fill="#41B883"
                        />
                        <path
                            d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"
                            fill="#41B883"
                        />
                        <path
                            d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"
                            fill="#35495E"
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
            aria-label="Vue"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 256 221"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Vue.displayName = 'Vue'
