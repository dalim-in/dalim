'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const DrizzleORMMetadata: LogoMetadata = {
    name: 'DrizzleORM',
    category: 'Database',
    tags: ['technology', 'design'],
    description: 'An icon representing the DrizzleORM platform logo',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const DrizzleORM = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <rect
                            width="9.631"
                            height="40.852"
                            fill="#C5F74F"
                            rx="4.816"
                            transform="matrix(.87303 .48767 -.49721 .86763 43.48 67.304)"
                        />
                        <rect
                            width="9.631"
                            height="40.852"
                            fill="#C5F74F"
                            rx="4.816"
                            transform="matrix(.87303 .48767 -.49721 .86763 76.94 46.534)"
                        />
                        <rect
                            width="9.631"
                            height="40.852"
                            fill="#C5F74F"
                            rx="4.816"
                            transform="matrix(.87303 .48767 -.49721 .86763 128.424 46.535)"
                        />
                        <rect
                            width="9.631"
                            height="40.852"
                            fill="#C5F74F"
                            rx="4.816"
                            transform="matrix(.87303 .48767 -.49721 .86763 94.957 67.304)"
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
            aria-label="DrizzleORM"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 160 160"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

DrizzleORM.displayName = 'DrizzleORM'
