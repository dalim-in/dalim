'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const GeminiMetadata: LogoMetadata = {
    name: 'Gemini',
    category: 'AI',
    tags: ['google', 'ai'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Gemini = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <defs><linearGradient id="lobe-icons-gemini-fill" x1="0%" x2="68.73%" y1="100%" y2="30.395%"><stop offset="0%" stopColor="#1C7DFF" /><stop offset="52.021%" stopColor="#1C69FF" /><stop offset="100%" stopColor="#F0DCD6" /></linearGradient></defs><path d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12" fill="url(#lobe-icons-gemini-fill)" fillRule="nonzero" />
                    </>
                )

            case 'wordmark':
                return (
                    <>
                        <defs>
                            <style>
                                {`
            .cls-1 { mask: url(#mask); }
            .cls-2 { fill: #fff; fill-rule: evenodd; }
            .cls-3 { fill: url(#linear-gradient); }
          `}
                            </style>
                            <mask
                                id="mask"
                                x="-8.77"
                                y="-21.58"
                                width="52.4"
                                height="43.16"
                                maskUnits="userSpaceOnUse">
                                <g id="a">
                                    <path
                                        className="cls-2"
                                        d="M15.94,9.7c.09.2.13.41.13.63... (rest of long path here) ..."
                                    />
                                </g>
                            </mask>
                            <linearGradient
                                id="linear-gradient"
                                x1="-4.82"
                                y1="20.6"
                                x2="21.14"
                                y2="26.9"
                                gradientTransform="translate(0 26) scale(1 -1)"
                                gradientUnits="userSpaceOnUse">
                                <stop
                                    offset="0"
                                    stopColor="#4a9dd6"
                                />
                                <stop
                                    offset="0.52"
                                    stopColor="#5d81c1"
                                />
                                <stop
                                    offset="0.78"
                                    stopColor="#9477b5"
                                />
                                <stop
                                    offset="0.89"
                                    stopColor="#be698f"
                                />
                                <stop
                                    offset="1"
                                    stopColor="#d6645d"
                                />
                            </linearGradient>
                        </defs>
                        <g className="cls-1">
                            <path
                                className="cls-3"
                                d="M-8.77-21.58h52.4V21.58H-8.77V-21.58Z"
                            />
                        </g>
                    </>
                )

            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="Gemini"
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

Gemini.displayName = 'Gemini'

 