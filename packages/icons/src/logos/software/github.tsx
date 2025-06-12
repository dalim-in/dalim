'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const GithubMetadata: LogoMetadata = {
    name: 'Github',
    category: 'Software',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Github = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <path d="M12,1.75C6.19,1.75,1.49,6.45,1.49,12.26c0,4.65,3.01,8.58,7.19,9.97.53.09.72-.22.72-.5,0-.25-.01-1.08-.01-1.96-2.64.49-3.32-.64-3.53-1.23-.12-.3-.63-1.23-1.08-1.48-.37-.2-.89-.68-.01-.7.83-.01,1.42.76,1.62,1.08.95,1.59,2.46,1.14,3.06.87.09-.68.37-1.14.67-1.41-2.34-.26-4.78-1.17-4.78-5.19,0-1.14.41-2.09,1.08-2.82-.11-.26-.47-1.34.11-2.79,0,0,.88-.28,2.89,1.08.84-.24,1.73-.35,2.63-.35s1.79.12,2.63.35c2.01-1.37,2.89-1.08,2.89-1.08.58,1.45.21,2.52.11,2.79.67.74,1.08,1.67,1.08,2.82,0,4.03-2.46,4.93-4.79,5.19.38.33.71.96.71,1.94,0,1.41-.01,2.54-.01,2.89,0,.28.2.6.72.5,4.15-1.39,7.16-5.33,7.16-9.97,0-5.81-4.7-10.51-10.51-10.51Z" />
                )

            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="Github"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}
            >
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

Github.displayName = 'Github'
