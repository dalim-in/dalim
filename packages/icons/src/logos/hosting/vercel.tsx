'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const VercelMetadata: LogoMetadata = {
  name: 'Vercel',
  category: 'Hosting',
  tags: ['technology', 'design'],
  description: 'An icon representing the Vercel platform logo',
  author: 'Ali Imam',
  created: '2025-06-10',
  variants: ['icon', 'wordmark'],
}

export const Vercel = forwardRef<LogosHandle, LogosProps>(
  (
    {
      className,
      size = '24',
      color = 'currentColor',
      variant = 'icon',
      iconStyle = 'default',
      ...props
    },
    ref
  ) => {
    const renderPaths = () => {
      switch (variant) {
        case 'icon':
          return <path d="M12,3.03l10.36,17.94H1.64L12,3.03Z" />
        default:
          return 'icon'
      }
    }

    return (
      <motion.div 
        role="img"
        aria-label="Vercel"
        className={cn('', className)}
        initial="normal"
        style={{ width: size, height: size, color }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={cn('', className)}
        >
          {renderPaths()}
        </svg>
      </motion.div>
    )
  }
)

Vercel.displayName = 'Vercel'
