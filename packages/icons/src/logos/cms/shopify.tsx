'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LogosHandle, LogosProps, LogoMetadata } from '../../types'

export const ShopifyMetadata: LogoMetadata = {
    name: 'Shopify',
    category: 'CMS',
    tags: ['technology', 'design'],
    description: 'An icon representing the Shopify platform logo',
    author: 'Ali Imam',
    created: '2025-06-10',
    variants: ['icon', 'wordmark'],
}

export const Shopify = forwardRef<LogosHandle, LogosProps>(({ className, size = '24', color = 'currentColor', variant = 'icon', iconStyle = 'default', ...props }, ref) => {
    const renderPaths = () => {
        switch (variant) {
            case 'icon':
                return (
                    <>
                        <g clip-path="url(#clip0_34_315)">
                            <path
                                d="M39.2152 11.6403C39.1854 11.4203 38.9956 11.2985 38.8387 11.2851C38.6821 11.2718 35.3681 11.0225 35.3681 11.0225C35.3681 11.0225 33.0665 8.70266 32.8139 8.44589C32.5611 8.18927 32.0675 8.26733 31.8759 8.32459C31.8477 8.33303 31.373 8.48175 30.5879 8.72843C29.819 6.48232 28.4622 4.41823 26.0751 4.41823C26.0092 4.41823 25.9413 4.42095 25.8735 4.42486C25.1946 3.51337 24.3537 3.11737 23.6273 3.11737C18.0666 3.11737 15.41 10.1747 14.5771 13.761C12.4163 14.4407 10.8813 14.924 10.6853 14.9865C9.47919 15.3706 9.44105 15.4092 9.28268 16.563C9.1635 17.4365 6.00774 42.2135 6.00774 42.2135L30.5981 46.891L43.922 43.9647C43.922 43.9647 39.2446 11.8603 39.2152 11.6403ZM29.2288 9.15517L27.148 9.80899C27.1488 9.66011 27.1495 9.51365 27.1495 9.35347C27.1495 7.95752 26.9586 6.83356 26.6524 5.94256C27.8824 6.09927 28.7016 7.52008 29.2288 9.15517ZM25.1267 6.21937C25.4686 7.08927 25.691 8.3377 25.691 10.0224C25.691 10.1085 25.6902 10.1874 25.6895 10.2671C24.3363 10.6926 22.8659 11.1546 21.3922 11.6181C22.2196 8.37597 23.7707 6.81006 25.1267 6.21937ZM23.4746 4.6316C23.7146 4.6316 23.9563 4.71433 24.1877 4.87601C22.4056 5.72738 20.4954 7.87163 19.6887 12.1536L16.2919 13.2217C17.2368 9.9556 19.4805 4.6316 23.4746 4.6316Z"
                                fill="#95BF46"
                            />
                            <path
                                d="M38.8385 11.2851C38.6819 11.2718 35.3679 11.0224 35.3679 11.0224C35.3679 11.0224 33.0663 8.70264 32.8137 8.44588C32.7192 8.35034 32.5917 8.30137 32.4584 8.28027L30.5991 46.8907L43.9218 43.9647C43.9218 43.9647 39.2444 11.8602 39.215 11.6402C39.1852 11.4202 38.9954 11.2985 38.8385 11.2851Z"
                                fill="#5E8E3E"
                            />
                            <path
                                d="M26.0749 18.7594L24.432 23.7208C24.432 23.7208 22.9926 22.9409 21.2281 22.9409C18.6414 22.9409 18.5113 24.5889 18.5113 25.0042C18.5113 27.2702 24.3294 28.1385 24.3294 33.4462C24.3294 37.6221 21.7206 40.3111 18.203 40.3111C13.9818 40.3111 11.8232 37.644 11.8232 37.644L12.9534 33.8527C12.9534 33.8527 15.1723 35.7868 17.0447 35.7868C18.2681 35.7868 18.7658 34.8088 18.7658 34.0943C18.7658 31.1385 13.9925 31.0066 13.9925 26.1496C13.9925 22.0616 16.8826 18.1057 22.7165 18.1057C24.9644 18.1057 26.0749 18.7594 26.0749 18.7594Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_34_315">
                                <rect
                                    width="38"
                                    height="44"
                                    fill="white"
                                    transform="translate(6 3)"
                                />
                            </clipPath>
                        </defs>
                    </>
                )
            default:
                return 'icon'
        }
    }

    return (
        <motion.div
            role="img"
            aria-label="Shopify"
            className={cn('', className)}
            initial="normal"
            style={{ width: size, height: size, color }}
            {...props}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 50 50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('', className)}>
                {renderPaths()}
            </svg>
        </motion.div>
    )
})

Shopify.displayName = 'Shopify'
