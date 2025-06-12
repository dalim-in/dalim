'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const ChromeMetadata: LogoMetadata = {
    name: 'Chrome',
    category: 'Browser',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Chrome = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                       <path
        d="M12,16.87c2.69,0,4.87-2.18,4.87-4.87s-2.18-4.87-4.87-4.87-4.87,2.18-4.87,4.87,2.18,4.87,4.87,4.87Z"
        fill="#ffffff"
      />
      <path
        d="M7.78,14.44L3.56,7.13c-1.74,3.01-1.74,6.73,0,9.74,1.74,3.01,4.96,4.87,8.44,4.87l4.22-7.31h0c-.43.74-1.04,1.36-1.78,1.78-1.51.87-3.36.87-4.87,0-.74-.43-1.36-1.04-1.78-1.78h0Z"
        fill="#229346"
      />
      <path
        d="M16.22,14.44l-4.22,7.31c3.48,0,6.7-1.86,8.44-4.87.85-1.48,1.3-3.16,1.3-4.87,0-1.71-.45-3.39-1.31-4.87h-8.44c.86,0,1.7.23,2.44.65.74.43,1.36,1.04,1.78,1.78.87,1.51.87,3.36,0,4.87h0Z"
        fill="#f9c119"
      />
      <path
        d="M12,15.86c2.13,0,3.86-1.73,3.86-3.86s-1.73-3.86-3.86-3.86-3.86,1.73-3.86,3.86,1.73,3.86,3.86,3.86Z"
        fill="#3f70b7"
      />
      <path
        d="M12,7.13h8.44c-.85-1.48-2.08-2.71-3.57-3.57-1.48-.86-3.16-1.31-4.87-1.31-1.71,0-3.39.45-4.87,1.31-1.48.86-2.71,2.09-3.56,3.57l4.22,7.31h0c-.87-1.51-.87-3.36,0-4.87.87-1.51,2.48-2.44,4.22-2.44h0Z"
        fill="#e33c2e"
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
            aria-label="Chrome"
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

Chrome.displayName = 'Chrome'
