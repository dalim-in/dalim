'use client'

import { cn } from '@/src/lib/utils'
import { AnimatedList } from '@dalim/core/components/backgrunds/animated-list'
import Link from 'next/link'

interface Item {
    name: string
    description: string
    icon: string
    color: string
    time: string
    linkUrl: string
}

let notifications = [
    {
        name: 'Payment received',
        description: 'Dalim',
        time: '15m ago',
        icon: '💸',
        color: '#00C9A7',
    },
    {
        name: 'User signed up',
        description: 'Dalim',
        time: '10m ago',
        icon: '👤',
        color: '#FFB800',
    },
    {
        name: 'New message',
        description: 'Dalim',
        time: '5m ago',
        icon: '💬',
        color: '#FF3D71',
    },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time, linkUrl }: Item) => {
    return (
        <Link href={linkUrl}>
            <figure
                className={cn(
                    'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-3xl p-4',
                    // animation styles
                    'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
                    // dark styles
                    'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#5555551f_inset]'
                )}>
                <div className="flex flex-row items-center gap-2">
                    <div
                        className="flex size-10 items-center justify-center rounded-2xl"
                        style={{
                            backgroundColor: color,
                        }}>
                        <span className="text-lg">{icon}</span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
                            <span className="text-sm sm:text-lg">{name}</span>
                            <span className="mx-1">·</span>
                            <span className="text-xs text-gray-500">{time}</span>
                        </figcaption>
                        <p className="text-sm font-normal dark:text-white/60">{description}</p>
                    </div>
                </div>
            </figure>
        </Link>
    )
}

export function AgencyList({ className, linkUrl }: { className?: string; linkUrl: string }) {
    return (
        <div className={cn('lg:h-54 relative flex h-60 w-full flex-col overflow-hidden p-2 xl:h-60', className)}>
            <AnimatedList>
                {notifications.map((item, idx) => (
                    <Notification
                        linkUrl={linkUrl}
                        {...item}
                        key={idx}
                    />
                ))}
            </AnimatedList>

            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
        </div>
    )
}
