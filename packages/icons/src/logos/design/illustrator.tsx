'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const IllustratorMetadata: LogoMetadata = {
    name: 'Illustrator',
    category: 'Design',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Illustrator = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
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
        fill="#2f1110"
      />
      <path
        d="M11.7,13.9h-3.02l-.61,1.91s-.03.07-.06.09c-.03.02-.06.03-.1.03h-1.53c-.09,0-.12-.05-.09-.14l2.61-7.52c.03-.08.05-.17.08-.27.03-.17.05-.35.05-.53,0-.01,0-.03,0-.04,0-.01.01-.02.02-.03s.02-.02.03-.02c.01,0,.02,0,.04,0h2.08c.06,0,.1.02.1.07l2.96,8.36c.03.09,0,.13-.08.13h-1.7s-.06,0-.08-.02c-.02-.02-.04-.04-.05-.07l-.67-1.93ZM9.15,12.25h2.06c-.05-.17-.11-.37-.18-.59-.07-.22-.14-.45-.22-.7-.08-.25-.16-.5-.24-.74-.08-.25-.15-.49-.22-.72-.07-.23-.12-.44-.18-.63h-.01c-.07.35-.17.7-.27,1.04-.12.39-.25.79-.37,1.2-.13.41-.25.79-.37,1.14Z"
        fill="#f8991d"
      />
      <path
        d="M16.04,8.75c-.13,0-.27-.02-.39-.07-.12-.05-.24-.12-.33-.22-.09-.1-.16-.22-.21-.34-.05-.13-.07-.26-.06-.4,0-.13.02-.27.07-.39.05-.12.13-.24.22-.33.1-.09.21-.16.33-.21.12-.05.26-.07.39-.07.31,0,.56.09.74.28.09.1.16.21.21.34s.07.26.06.39c0,.14-.02.27-.06.4-.05.13-.12.24-.22.34-.1.1-.22.17-.35.22-.13.05-.27.07-.41.07ZM15.13,15.79v-6.24c0-.08.03-.12.1-.12h1.61c.07,0,.1.04.1.12v6.24c0,.09-.03.13-.1.13h-1.59c-.08,0-.12-.04-.12-.13Z"
        fill="#f8991d"
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
            aria-label="Illustrator"
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

Illustrator.displayName = 'Illustrator'
