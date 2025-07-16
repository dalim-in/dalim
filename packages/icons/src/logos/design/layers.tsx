'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const LayersMetadata: LogoMetadata = {
    name: 'Layers',
    category: 'Design',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Layers = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <path
                            fill="#ffff"
                            fillOpacity="0.2"
                            d="M0 18.83L.08 6.832C.094 4.66 1.613 2.798 3.71 2.383L15.297.086c2.784-.552 5.368 1.627 5.35 4.51l-.08 12c-.015 2.171-1.534 4.032-3.631 4.448L5.349 23.341C2.565 23.893-.019 21.714 0 18.83z"
                        />
                        <path
                            fill="#ffff"
                            fillOpacity="0.5"
                            d="M5.677 23.617l.08-12C5.77 9.447 7.29 7.586 9.387 7.17l11.587-2.296c2.784-.552 5.368 1.626 5.349 4.51l-.08 12c-.014 2.171-1.533 4.032-3.63 4.448l-11.587 2.297c-2.784.551-5.368-1.627-5.349-4.51z"
                        />
                        <path
                            fill="#ffff"
                            fillOpacity="0.8"
                            d="M11.354 28.404l.08-12c.014-2.172 1.533-4.032 3.63-4.448l11.587-2.297c2.784-.552 5.368 1.627 5.349 4.51l-.08 12c-.014 2.172-1.533 4.033-3.63 4.448l-11.587 2.297c-2.784.552-5.368-1.627-5.35-4.51z"
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
            aria-label="Layers"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 32 33"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Layers.displayName = 'Layers'
