import React from 'react'
import { cn, getTimeOfDayGreeting } from '@/src/lib/utils'
import { BlogCard } from './blog-stacks'
import { AboutMe } from './about-me'
import { AgencyList } from './lists'
import { AGENCY_URL, UI_URL } from '@dalim/auth'
import { PhotoGallery } from './work-images'
import Link from 'next/link'
import { PageHeader } from '@dalim/core/components/common/page-header'
import { Graphics } from './bento/graphic-grid'
import { FontsListWWW } from './bento/font-list'
import { MainIconsWWW } from '../../../../icons/src/components/icons/main-icons'

export function ProductBento() {
    const timeOfDayGreeting = getTimeOfDayGreeting()
    const features = [
        {
            id: 'about',
            title: 'Ali Imam',
            description: `${timeOfDayGreeting} I am Ali, an experienced Design Engineer. Learn more about me.`,
            skeleton: <SkeletonAbout />,
            className: 'col-span-1 md:col-span-3 lg:col-span-2 border-b md:border-r dark:border-neutral-800',
        },
        {
            id: 'ui',
            title: 'UI',
            description: 'Discover beautifully crafted typefaces for every creative project — from modern displays to.',
            skeleton: <SkeletonFonts />,
            className: 'col-span-1 md:col-span-3 lg:col-span-2 border-b lg:border-r dark:border-neutral-800',
        },
        {
            id: 'agency',
            title: 'Agency',
            description: 'Get agency-level designs without the agency price. A flat monthly rate for all your design needs.',
            skeleton: <SkeletonAgency />,
            className: 'col-span-1 md:col-span-6 md:border-b lg:border-r-0 lg:col-span-2 border-b dark:border-neutral-800',
        },
        {
            id: 'fonts',
            title: '',
            description: '',
            skeleton: <FontLists />,
            className: 'col-span-1 md:col-span-6 lg:col-span-6 border-b lg:border-r-0 dark:border-neutral-800',
        },
        {
            id: 'icons',
            title: '',
            description: '',
            skeleton: <SkeletonIcons />,
            className: 'col-span-1  h-full  border-b md:col-span-6 lg:col-span-6',
        },
        {
            id: 'graphic',
            title: '',
            description: '',
            skeleton: <SkeletonGraphic />,
            className: 'col-span-1 border-b md:col-span-6 lg:col-span-6',
        },
        {
            id: 'works-header',
            title: '',
            description: '',
            skeleton: <SkeletonFour />,
            className: 'col-span-1 md:border-b md:col-span-6 lg:col-span-6 md:border-none',
        },
        {
            id: 'works-gallery',
            title: '',
            description: '',
            skeleton: <SkeletonFive />,
            className: 'col-span-1 md:col-span-6 lg:col-span-6 md:border-none',
        },
    ]

    return (
        <div className="relative mb-6">
            <div className="relative">
                <div className="grid grid-cols-1 rounded-3xl border md:grid-cols-6 lg:grid-cols-6 dark:border-neutral-800">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            id={feature.id}
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

const FeatureCard = ({ id, children, className }: { id?: string; children?: React.ReactNode; className?: string }) => {
    return (
        <div
            id={id}
            className={cn(`relative overflow-hidden p-4 sm:p-8`, className)}>
            {children}
        </div>
    )
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return <p className="text-left text-xl tracking-tight text-black md:text-2xl md:leading-snug dark:text-white">{children}</p>
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return <p className={cn('text-left text-sm md:text-base', 'text-center font-normal text-neutral-500 dark:text-neutral-300', 'mx-0 my-2 max-w-sm text-left md:text-sm')}>{children}</p>
}

export const SkeletonAbout = () => {
    return <AboutMe linkTo={'/about'} />
}

export const SkeletonAgency = () => {
    return <AgencyList linkUrl={AGENCY_URL} />
}

export const SkeletonGraphic = () => {
    return (
        <div className="-mt-6">
           <Graphics />
        </div>
    )
}

export const SkeletonIcons = () => {
    return (
        <div className="-mb-12 -mt-14">
            <MainIconsWWW />
        </div>
    )
}

export const FontLists = () => {
    return (
        <div className="-mt-3">
            <FontsListWWW />
        </div>
    )
}

export const SkeletonFonts = () => {
    return (
        <Link href={`${UI_URL}`}>
            <BlogCard />
        </Link>
    )
}

export const SkeletonFour = () => {
    return (
        <PageHeader
            badge="Works"
            className="-mx-8 -mb-8 -mt-10"
            title={'Designs That Speak'}
            subheading="A curated collection of graphic design work—from branding and print to digital media—crafted to communicate, inspire, and leave a lasting impression."
        />
    )
}

export const SkeletonFive = () => {
    return <PhotoGallery />
}
