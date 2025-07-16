'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const AdobeMetadata: LogoMetadata = {
    name: 'Adobe',
    category: 'Design',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Adobe = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <g clipPath="url(#adobe__clip0_906_1839)">
                            <path
                                d="M56.9686 0H90.4318V80L56.9686 0Z"
                                fill="#EB1000"
                            />
                            <path
                                d="M33.4632 0H0V80L33.4632 0Z"
                                fill="#EB1000"
                            />
                            <path
                                d="M45.1821 29.4668L66.5199 80.0002H52.5657L46.1982 63.9461H30.6182L45.1821 29.4668Z"
                                fill="#EB1000"
                            />
                        </g>
                        <defs>
                            <clipPath id="adobe__clip0_906_1839">
                                <rect
                                    width="90.4318"
                                    height="80"
                                    fill="white"
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
            aria-label="Adobe"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 91 80"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Adobe.displayName = 'Adobe'
