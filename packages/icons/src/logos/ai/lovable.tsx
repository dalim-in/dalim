'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const LovableMetadata: LogoMetadata = {
    name: 'Lovable',
    category: 'AI',
    tags: ['google', 'ai'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Lovable = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <mask
                            id="b"
                            width={121}
                            height={122}
                            x={0}
                            y={0}
                            maskUnits="userSpaceOnUse"
                            style={{
                                maskType: 'alpha',
                            }}>
                            <path
                                fill="url(#a)"
                                fillRule="evenodd"
                                d="M36.069 0c19.92 0 36.068 16.155 36.068 36.084v13.713h12.004c19.92 0 36.069 16.156 36.069 36.084 0 19.928-16.149 36.083-36.069 36.083H0v-85.88C0 16.155 16.148 0 36.069 0Z"
                                clipRule="evenodd"
                            />
                        </mask>
                        <g mask="url(#b)">
                            <g filter="url(#c)">
                                <ellipse
                                    cx={52.738}
                                    cy={65.101}
                                    fill="#4B73FF"
                                    rx={81.373}
                                    ry={81.192}
                                />
                            </g>
                            <g filter="url(#d)">
                                <ellipse
                                    cx={61.673}
                                    cy={20.547}
                                    fill="#FF66F4"
                                    rx={104.216}
                                    ry={81.192}
                                />
                            </g>
                            <g filter="url(#e)">
                                <ellipse
                                    cx={78.666}
                                    cy={5.268}
                                    fill="#FF0105"
                                    rx={81.373}
                                    ry={71.304}
                                />
                            </g>
                            <g filter="url(#f)">
                                <ellipse
                                    cx={63.121}
                                    cy={20.527}
                                    fill="#FE7B02"
                                    rx={48.937}
                                    ry={48.829}
                                />
                            </g>
                        </g>
                        <defs>
                            <filter
                                id="c"
                                width={235.52}
                                height={235.159}
                                x={-65.022}
                                y={-52.478}
                                colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse">
                                <feFlood
                                    floodOpacity={0}
                                    result="BackgroundImageFix"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    result="effect1_foregroundBlur_572_319"
                                    stdDeviation={18.194}
                                />
                            </filter>
                            <filter
                                id="d"
                                width={281.208}
                                height={235.159}
                                x={-78.93}
                                y={-97.032}
                                colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse">
                                <feFlood
                                    floodOpacity={0}
                                    result="BackgroundImageFix"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    result="effect1_foregroundBlur_572_319"
                                    stdDeviation={18.194}
                                />
                            </filter>
                            <filter
                                id="e"
                                width={235.52}
                                height={215.383}
                                x={-39.094}
                                y={-102.423}
                                colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse">
                                <feFlood
                                    floodOpacity={0}
                                    result="BackgroundImageFix"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    result="effect1_foregroundBlur_572_319"
                                    stdDeviation={18.194}
                                />
                            </filter>
                            <filter
                                id="f"
                                width={170.649}
                                height={170.432}
                                x={-22.204}
                                y={-64.688}
                                colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse">
                                <feFlood
                                    floodOpacity={0}
                                    result="BackgroundImageFix"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    result="effect1_foregroundBlur_572_319"
                                    stdDeviation={18.194}
                                />
                            </filter>
                            <linearGradient
                                id="a"
                                x1={40.453}
                                x2={76.933}
                                y1={21.433}
                                y2={121.971}
                                gradientUnits="userSpaceOnUse">
                                <stop
                                    offset={0.025}
                                    stopColor="#FF8E63"
                                />
                                <stop
                                    offset={0.56}
                                    stopColor="#FF7EB0"
                                />
                                <stop
                                    offset={0.95}
                                    stopColor="#4B73FF"
                                />
                            </linearGradient>
                        </defs>
                    </>
                )

            case 'wordmark':
                return <></>

            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="Lovable"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 121 122"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Lovable.displayName = 'Lovable'
