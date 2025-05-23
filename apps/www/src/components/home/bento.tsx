import React from 'react'
import { cn } from '@/src/lib/utils'
import Image from 'next/image' 

export function ProductBento() {
    const features = [
        {
            title: 'Graphic',
            description: 'Discover the essence of creativity in our exquisite collection of top-tier abstract design assets. Each piece is a blend of beauty and utility, perfect for elevating any project.',
            skeleton: <SkeletonOne />,
            className: 'col-span-1 md:col-span-4 lg:col-span-4 border-b md:border-r dark:border-neutral-800',
        },
        {
            title: 'Fonts',
            description: 'Discover beautifully crafted typefaces for every creative project — from modern displays to vintage-inspired lettering.',
            skeleton: <SkeletonTwo />,
            className: 'col-span-1 md:col-span-2 lg:col-span-2 border-b dark:border-neutral-800',
        },
        {
            title: 'Agency',
            description: 'Get agency-level designs without the agency price. A flat monthly rate for all your design needs.',
            skeleton: <SkeletonThree />,
            className: 'col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-b-0 md:border-r dark:border-neutral-800',
        },
        {
            title: 'Works',
            description: 'Welcome to My Creative Playground! Welcome to My Creative Playground!',
            skeleton: <SkeletonFour />,
            className: 'col-span-1 md:col-span-3 lg:col-span-3   md:border-none',
        },
    ]
    return (
        <div className="relative mb-6">
            <div className="relative">
                <div className="grid grid-cols-1 rounded-3xl border md:grid-cols-6 lg:grid-cols-6 dark:border-neutral-800">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className="h-full w-full">{feature.skeleton}</div>
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    return <div className={cn(`relative overflow-hidden p-4 sm:p-8`, className)}>{children}</div>
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return <p className="mx-auto max-w-5xl text-left text-xl tracking-tight text-black md:text-2xl md:leading-snug dark:text-white">{children}</p>
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return <p className={cn('mx-auto max-w-4xl text-left text-sm md:text-base', 'text-center font-normal text-neutral-500 dark:text-neutral-300', 'mx-0 my-2 max-w-sm text-left md:text-sm')}>{children}</p>
}

export const SkeletonOne = () => {
    return (
        <div className="relative mt-6 flex h-full">
            <Image
                src="/images/2.jpeg"
                alt="header"
                width={800}
                height={800}
                className="h-[200px] w-full rounded-3xl object-cover"
            />
        </div>
    )
}

export const SkeletonThree = () => {
    return (
       <div className="relative mt-6 flex h-full">
            <Image
                 src="/images/2.jpeg"
                alt="header"
                width={800}
                height={800}
                className="h-[200px] w-full rounded-3xl object-cover"
            />
        </div>
    )
}

export const SkeletonTwo = () => {
    return (
       <div className="relative mt-6 flex h-full">
            <Image
                 src="/images/2.jpeg"
                alt="header"
                width={800}
                height={800}
                className="h-[200px] w-full rounded-3xl object-cover"
            />
        </div>
    )
}

export const SkeletonFour = () => {
    return (
        <div className="">
           <div className="relative mt-6 flex h-full">
                <Image
                     src="/images/2.jpeg"
                    alt="header"
                    width={800}
                    height={800}
                    className="h-[200px] w-full rounded-3xl object-cover"
                />
            </div>
        </div>
    )
}
