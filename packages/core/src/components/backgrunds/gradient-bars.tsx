'use client'

import React, { useState } from 'react'

export const GradientBars: React.FC = () => {
    const [numBars] = useState(15)

    const calculateHeight = (index: number, total: number) => {
        const position = index / (total - 1)
        const maxHeight = 100
        const minHeight = 40

        const center = 0.5
        const distanceFromCenter = Math.abs(position - center)
        const heightPercentage = Math.pow(distanceFromCenter * 2, 2)

        return minHeight + (maxHeight - minHeight) * heightPercentage
    }

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div
                className="flex h-full"
                style={{
                    width: '100%',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased',
                }}>
                {Array.from({ length: numBars }).map((_, index) => {
                    const height = calculateHeight(index, numBars)
                    return (
                        <div
                            key={index}
                            style={{
                                flex: '1 0 calc(100% / 15)',
                                maxWidth: 'calc(100% / 15)',
                                height: '100%',
                                background: 'linear-gradient(to top, #fff200, transparent)',
                                transform: `scaleY(${height / 100})`,
                                transformOrigin: 'bottom',
                                transition: 'transform 0.5s ease-in-out',
                                animation: 'pulseBar 2s ease-in-out infinite alternate',
                                animationDelay: `${index * 0.1}s`,
                                outline: '2px solid rgba(0, 0, 0, 0)',
                                boxSizing: 'border-box',
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
} 
