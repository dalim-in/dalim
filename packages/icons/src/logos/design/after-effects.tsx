'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const AfterEffectsMetadata: LogoMetadata = {
    name: 'AfterEffects',
    category: 'Design',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const AfterEffects = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                       <defs>
    <clipPath id="clippath">
      <rect x="2.26" y="2.51" width="19.47" height="18.98" fill="none" />
    </clipPath>
  </defs>
  <g clipPath="url(#clippath)">
    <g>
      <path
        d="M18.29,2.51H5.71c-1.9,0-3.45,1.54-3.45,3.45v12.09c0,1.9,1.54,3.45,3.45,3.45h12.57c1.9,0,3.45-1.54,3.45-3.45V5.96c0-1.9-1.54-3.45-3.45-3.45Z"
        fill="#1e1b57"
      />
      <path
        d="M10.09,13.87h-3.02l-.61,1.91s-.03.07-.06.09c-.03.02-.06.03-.1.03h-1.53c-.09,0-.12-.05-.09-.14l2.61-7.49c.03-.08.05-.15.08-.26.03-.17.05-.35.05-.53,0-.01,0-.03,0-.04,0-.01.01-.02.02-.03,0,0,.02-.02.03-.02.01,0,.02,0,.04,0h2.08c.06,0,.1.02.1.07l2.96,8.32c.03.09,0,.13-.08.13h-1.7s-.06,0-.08-.02-.04-.04-.05-.07l-.67-1.94ZM7.54,12.25h2.06c-.05-.17-.11-.37-.18-.59-.07-.22-.14-.45-.22-.7-.08-.25-.16-.5-.24-.74-.08-.25-.15-.49-.22-.72-.07-.23-.12-.44-.18-.63h-.01c-.07.35-.17.7-.27,1.04-.12.39-.25.79-.37,1.2-.13.41-.25.79-.37,1.14Z"
        fill="#9695c9"
      />
      <path
        d="M17.47,13.12h-2.57c.03.25.12.5.25.72.15.22.35.39.59.49.33.14.68.21,1.04.2.28,0,.56-.04.84-.09.25-.03.49-.1.72-.19.04-.03.07-.01.07.07v1.24s0,.07-.02.1c-.01.02-.04.04-.06.06-.26.11-.53.2-.81.24-.38.07-.76.1-1.15.1-.62,0-1.14-.1-1.55-.29-.4-.17-.74-.44-1.02-.77-.26-.31-.45-.68-.56-1.06-.11-.38-.17-.78-.17-1.18,0-.44.07-.87.2-1.29.13-.41.34-.78.61-1.11.27-.32.6-.59.98-.77.38-.19.84-.25,1.36-.25.43-.01.86.07,1.26.25.33.14.63.36.86.65.21.28.38.59.48.92.1.32.16.66.16.99,0,.19,0,.37-.02.52-.01.16-.02.27-.03.34,0,.03-.02.06-.04.07-.02.02-.05.03-.08.03-.05,0-.14,0-.27.02-.13.01-.28.02-.47.03-.19,0-.39-.03-.59-.03ZM14.89,11.93h1.71c.21,0,.36,0,.46,0,.07,0,.13-.03.19-.06v-.08c0-.1-.02-.2-.05-.3-.07-.22-.21-.42-.4-.55s-.42-.2-.65-.19c-.22-.01-.44.04-.63.15-.19.11-.35.27-.45.47-.09.18-.15.38-.18.58Z"
        fill="#9695c9"
      />
    </g>
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
            aria-label="AfterEffects"
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

AfterEffects.displayName = 'AfterEffects'
