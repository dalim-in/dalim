'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const AppleMetadata: LogoMetadata = {
    name: 'Apple',
    category: 'Software',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Apple = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <path d="M20.38,8.5c-.13.1-2.38,1.37-2.38,4.19,0,3.26,2.87,4.42,2.95,4.45-.01.07-.46,1.58-1.51,3.12-.94,1.35-1.92,2.71-3.42,2.71s-1.88-.87-3.61-.87-2.28.9-3.65.9-2.32-1.25-3.42-2.79c-1.27-1.81-2.3-4.62-2.3-7.28,0-4.27,2.78-6.54,5.51-6.54,1.45,0,2.67.95,3.58.95s2.22-1.01,3.88-1.01c.63,0,2.88.06,4.36,2.18ZM15.23,4.51c.68-.81,1.17-1.94,1.17-3.06,0-.16-.01-.31-.04-.44-1.11.04-2.44.74-3.23,1.67-.63.71-1.21,1.84-1.21,2.98,0,.17.03.34.04.4.07.01.18.03.3.03,1,0,2.25-.67,2.98-1.57h0Z" />
                    </>
                )

             
            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="Apple"
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

Apple.displayName = 'Apple'
