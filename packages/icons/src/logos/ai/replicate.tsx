'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const ReplicateMetadata: LogoMetadata = {
    name: 'Replicate',
    category: 'AI',
    tags: ['google', 'ai'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Replicate = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <g clipPath="url(#clip0_1_3)">
                            <path
                                d="M726 310.438V392.476H438.068V726H346.302V310.438H726Z"
                                
                            />
                            <path
                                d="M726 155.219V237.402H264.845V726H173.078V155.219H726Z"
                                
                            />
                            <path
                                d="M726 0V82.1832H91.7664V726H0V0H726Z"
                                
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_3">
                                <rect
                                    width="726"
                                    height="726"
                                     
                                />
                            </clipPath>
                        </defs>
                    </>
                )

            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="Replicate"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 726 726"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Replicate.displayName = 'Replicate'
