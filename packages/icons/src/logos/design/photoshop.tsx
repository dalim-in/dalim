'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const PhotoshopMetadata: LogoMetadata = {
    name: 'Photoshop',
    category: 'Design',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Photoshop = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
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
        fill="#061f34"
      />
      <path
        d="M6.65,15.82V7.47c0-.06.03-.09.08-.09.14,0,.27,0,.46,0,.19,0,.4,0,.62-.01.22,0,.46,0,.71-.01.25,0,.49,0,.74,0,.66,0,1.22.08,1.67.25.41.14.78.37,1.09.67.26.26.47.57.59.92.12.34.18.69.18,1.05,0,.7-.16,1.27-.48,1.72-.32.45-.78.8-1.31.99-.55.2-1.16.27-1.83.27-.19,0-.33,0-.4,0-.08,0-.2,0-.35,0v2.61s0,.03,0,.05c0,.02-.01.03-.03.04-.01.01-.03.02-.04.03-.02,0-.03,0-.05,0h-1.56c-.06,0-.09-.03-.09-.1ZM8.41,8.95v2.72c.11,0,.22.01.31.01h.43c.32,0,.63-.05.93-.15.26-.08.49-.23.67-.43.17-.2.25-.48.25-.84,0-.25-.06-.5-.19-.72-.14-.21-.34-.37-.57-.46-.3-.12-.63-.17-.95-.16-.21,0-.39,0-.56,0-.16,0-.27.01-.33.02Z"
        fill="#55a0d8"
      />
      <path
        d="M17.84,11.18c-.25-.13-.51-.22-.78-.27-.3-.07-.6-.1-.91-.1-.17,0-.33.02-.49.06-.1.02-.19.08-.25.16-.04.07-.07.14-.07.22,0,.08.03.15.08.21.08.09.17.16.27.22.19.1.38.19.57.27.44.15.86.35,1.25.59.27.17.49.4.64.67.13.26.19.55.19.84,0,.38-.1.76-.31,1.08-.23.32-.54.58-.91.72-.4.17-.89.26-1.47.26-.37,0-.74-.03-1.1-.1-.29-.05-.56-.14-.83-.26-.03-.01-.05-.04-.07-.07-.02-.03-.02-.06-.02-.09v-1.41s0-.03,0-.04c0-.01.01-.02.03-.03.01,0,.02,0,.04,0,.01,0,.03,0,.03.01.31.18.65.32,1.01.4.31.08.63.12.95.12.3,0,.53-.04.67-.12.06-.03.12-.08.16-.14.04-.06.06-.13.06-.2,0-.11-.07-.22-.2-.33-.13-.1-.4-.23-.8-.38-.41-.14-.8-.34-1.16-.59-.26-.18-.47-.41-.61-.69-.13-.26-.19-.54-.19-.83,0-.35.09-.68.27-.98.21-.32.5-.58.85-.74.38-.19.86-.29,1.44-.29.34,0,.67.02,1.01.07.24.03.48.09.7.19.02,0,.03.01.05.03.01.01.02.03.03.05,0,.03.01.06.01.1v1.32s0,.03,0,.04c0,.01-.02.03-.03.03-.02,0-.04.01-.06.01s-.04,0-.06-.01Z"
        fill="#55a0d8"
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
            aria-label="Photoshop"
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

Photoshop.displayName = 'Photoshop'
