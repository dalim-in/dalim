'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const PremiereProMetadata: LogoMetadata = {
    name: 'PremierePro',
    category: 'Design',
    tags: ['technology', 'design'],
    description: 'An icon representing access control or authentication with a key and access cards',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const PremierePro = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
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
        d="M5.71,2.51h12.57c1.91,0,3.45,1.54,3.45,3.45v12.09c0,1.91-1.54,3.45-3.45,3.45H5.71c-1.91,0-3.45-1.54-3.45-3.45V5.96c0-1.91,1.54-3.45,3.45-3.45Z"
        fill="#1e1b57"
      />
      <path
        d="M6.89,15.82V7.47c0-.06.02-.09.08-.09.14,0,.27,0,.45,0,.19,0,.4,0,.62-.02.22,0,.45,0,.71-.02.25,0,.49,0,.74,0,.67,0,1.22.08,1.67.25.41.14.78.37,1.09.67.26.26.46.58.59.92.12.34.19.69.19,1.05,0,.7-.16,1.27-.49,1.73-.32.45-.78.8-1.31.99-.55.2-1.16.28-1.83.28-.19,0-.32,0-.41,0-.08,0-.19,0-.35,0v2.6c0,.06-.03.11-.09.11h-1.57c-.06,0-.1-.03-.1-.11ZM8.66,8.95v2.73c.11,0,.22.02.32.02h.43c.32,0,.63-.05.93-.15.26-.07.49-.23.67-.43.17-.2.25-.48.25-.84,0-.25-.06-.5-.19-.72-.14-.21-.33-.37-.57-.46-.3-.12-.62-.17-.96-.16-.21,0-.4,0-.55,0-.16,0-.28,0-.33,0Z"
        fill="#9695c9"
      />
      <path
        d="M14.16,9.42h1.42c.08,0,.15.06.17.13.02.06.04.13.05.2.02.08.03.17.04.25,0,.09.02.19.02.29.24-.28.54-.52.87-.7.37-.21.8-.32,1.23-.32.06,0,.11.03.11.09v1.61c0,.06-.04.09-.13.09-.29,0-.59.02-.88.08-.24.05-.46.12-.68.22-.15.07-.3.17-.41.3v4.14c0,.08-.03.11-.11.11h-1.6c-.06,0-.12-.03-.13-.1v-4.53c0-.19,0-.4,0-.61,0-.21,0-.42-.02-.63,0-.19-.02-.37-.03-.55,0-.04.02-.08.06-.09,0,0,.02,0,.02,0Z"
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
            aria-label="PremierePro"
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

PremierePro.displayName = 'PremierePro'
