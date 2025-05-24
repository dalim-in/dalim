import React from 'react'
import { cn, getTimeOfDayGreeting } from '@/src/lib/utils'
import Image from 'next/image'
import { BlogCard } from './blog-stacks'
import { AboutMe } from './about-me'
import { AgencyList } from './lists'
import { AGENCY_URL } from '@dalim/auth'

export function ProductBento() {
    const timeOfDayGreeting = getTimeOfDayGreeting()
    const features = [
        {
            title: 'Ali Imam',
            description: `${timeOfDayGreeting} I am Ali, an experienced Design Engineer. Learn more about me.`,
            skeleton: <SkeletonOne />,
            className: 'col-span-1 md:col-span-3 lg:col-span-2 border-b md:border-r dark:border-neutral-800',
        },
        {
            title: 'Fonts',
            description: 'Discover beautifully crafted typefaces for every creative project — from modern displays to.',
            skeleton: <SkeletonTwo />,
            className: 'col-span-1 md:col-span-3 lg:col-span-2 border-b lg:border-r dark:border-neutral-800',
        },
        {
            title: 'Agency',
            description: 'Get agency-level designs without the agency price. A flat monthly rate for all your design needs.',
            skeleton: <SkeletonThree />,
            className: 'col-span-1 md:col-span-3 md:border-r lg:border-b lg:border-r-0 lg:col-span-2 border-b md:border-b-0 dark:border-neutral-800',
        },
        {
            title: 'Works',
            description: 'Welcome to My Creative Playground! Welcome to My Creative Playground!',
            skeleton: <SkeletonFour />,
            className: 'col-span-1 md:col-span-3 lg:col-span-6 md:border-none',
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
    return <p className="text-left text-xl tracking-tight text-black md:text-2xl md:leading-snug dark:text-white">{children}</p>
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return <p className={cn('text-left text-sm md:text-base', 'text-center font-normal text-neutral-500 dark:text-neutral-300', 'mx-0 my-2 max-w-sm text-left md:text-sm')}>{children}</p>
}

export const SkeletonOne = () => {
    return (
        <div className="">
            <AboutMe linkTo={'/about'} />
        </div>
    )
}

export const SkeletonThree = () => {
    return (
        <div className=" ">
            <AgencyList linkUrl={AGENCY_URL}/>
        </div>
    )
}

export const SkeletonTwo = () => {
    return (
        <div className=" ">
            <BlogCard />
        </div>
    )
}

export const SkeletonFour = () => {
    return (
        <div className="">
            <div className=" ">
                <Image
                    src="/images/blogs/gradient/cover.jpg"
                    alt="header"
                    width={800}
                    height={800}
                    className="mt-10 h-[200px] w-full rounded-xl object-cover"
                />
            </div>
        </div>
    )
}
