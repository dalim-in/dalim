'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const CursorMetadata: LogoMetadata = {
    name: 'Cursor',
    category: 'Software',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Cursor = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <path
                            d="M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z"
                            fill="url(#lobe-icons-cursorundefined-fill-0)"
                        />
                        <path
                            d="M22.35 18V6L11.925 0v12l10.425 6z"
                            fill="url(#lobe-icons-cursorundefined-fill-1)"
                        />
                        <path
                            d="M11.925 0L1.5 6v12l10.425-6V0z"
                            fill="url(#lobe-icons-cursorundefined-fill-2)"
                        />
                        <path
                            d="M22.35 6L11.925 24V12L22.35 6z"
                            fill="#555"
                        />
                        <path
                            d="M22.35 6l-10.425 6L1.5 6h20.85z"
                            fill="currentColor"
                        />
                        <defs>
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                id="lobe-icons-cursorundefined-fill-0"
                                x1={11.925}
                                x2={11.925}
                                y1={12}
                                y2={24}>
                                <stop
                                    offset={0.16}
                                    stopColor="currentColor"
                                    stopOpacity={0.39}
                                />
                                <stop
                                    offset={0.658}
                                    stopColor="currentColor"
                                    stopOpacity={0.8}
                                />
                            </linearGradient>
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                id="lobe-icons-cursorundefined-fill-1"
                                x1={22.35}
                                x2={11.925}
                                y1={6.037}
                                y2={12.15}>
                                <stop
                                    offset={0.182}
                                    stopColor="currentColor"
                                    stopOpacity={0.31}
                                />
                                <stop
                                    offset={0.715}
                                    stopColor="currentColor"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                id="lobe-icons-cursorundefined-fill-2"
                                x1={11.925}
                                x2={1.5}
                                y1={0}
                                y2={18}>
                                <stop
                                    stopColor="currentColor"
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset={0.667}
                                    stopColor="currentColor"
                                    stopOpacity={0.22}
                                />
                            </linearGradient>
                        </defs>
                    </>
                )

            case 'wordmark':
                return (
                    <>
                        <path d="M.88,12c0-1.14.73-1.78,1.79-1.78h1.28v.68h-1.23c-.65,0-1.09.37-1.09,1.1s.44,1.1,1.09,1.1h1.23v.68h-1.28c-1.06,0-1.79-.65-1.79-1.78ZM4.61,12.65v-2.43h.71v2.28c0,.44.23.6.6.6h.43c.37,0,.6-.16.6-.6v-2.28h.71v2.43c0,.77-.51,1.13-1.19,1.13h-.66c-.69,0-1.2-.37-1.2-1.14,0,0,0,0,0,0ZM8.43,10.22h2.11c.72,0,1.08.39,1.08,1.01,0,.4-.19.72-.49.8.31.04.46.26.46.53v1.23h-.72v-1.06c0-.19-.06-.32-.31-.32h-1.42v1.38h-.72v-3.57h0ZM10.44,11.74c.33,0,.46-.17.46-.43,0-.27-.13-.42-.47-.42h-1.29v.85h1.3,0ZM12.25,13.11h1.97c.24,0,.39-.13.39-.37s-.16-.35-.41-.37l-.99-.08c-.62-.05-1.05-.36-1.05-1.03s.47-1.05,1.09-1.05h1.95v.68h-1.91c-.27,0-.42.13-.42.37s.15.35.42.37l1.01.07c.61.05,1.02.37,1.02,1.03s-.43,1.06-1.06,1.06h-2.02v-.68h0ZM15.69,11.99c0-1.08.78-1.84,1.83-1.84h.01c1.05,0,1.83.76,1.83,1.84s-.79,1.85-1.83,1.85h-.01c-1.05,0-1.83-.76-1.83-1.85ZM17.52,13.15c.65,0,1.12-.46,1.12-1.15s-.47-1.15-1.12-1.15-1.11.46-1.11,1.15.47,1.15,1.11,1.15ZM19.93,10.22h2.11c.72,0,1.08.39,1.08,1.01,0,.4-.19.72-.49.8.31.04.46.26.46.53v1.23h-.72v-1.06c0-.19-.06-.32-.31-.32h-1.42v1.38h-.72v-3.57h0ZM21.94,11.74c.33,0,.46-.17.46-.43,0-.27-.13-.42-.47-.42h-1.29v.85h1.3s0,0,0,0Z" />
                    </>
                )

            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="Cursor"
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

Cursor.displayName = 'Cursor'
