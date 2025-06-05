'use client'

import * as React from 'react'
import { Equal, X } from 'lucide-react'

import { Button } from '../../../ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '../../../ui/drawer'
import { PhoneLinkSelect } from './link-select'
import { ThemeSwitch } from '../footer/theme-switch'
import Link from 'next/link'
import { DialogTitle } from '@radix-ui/react-dialog'
import { DALIM_URL } from '@dalim/auth'

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export function MobileWWW({ children }: ProtectedLayoutProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const infoLinks = [
        { label: 'About', href: '/about' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blogs', href: '/blogs' },
        { label: 'Creators', href: '/creators' },
        { label: 'Contact', href: '/contact' },
    ]
    return (
        <div className="block md:hidden">
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={'icon'}
                        variant="ghost">
                        {isOpen ? <X className="h-5 w-5" /> : <Equal className="h-5 w-5" />}
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="border-brand bg-brand space-y-4 p-6">
                    <DialogTitle>
                        <PhoneLinkSelect />
                    </DialogTitle>
                    <div className="">
                        <div className="">{children}</div>
                        <div className="mx-2 my-4 space-y-4 text-xl text-white dark:text-black">
                            {infoLinks.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="block transition-colors hover:underline">
                                    {label}
                                </Link>
                            ))}
                            <ThemeSwitch />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export function MobileAgency({ children }: ProtectedLayoutProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const infoLinks = [
        { label: 'About', href: `${DALIM_URL}/about` },
        { label: 'Pricing', href: `${DALIM_URL}/pricing` },
        { label: 'Blogs', href: `${DALIM_URL}/blogs` },
        { label: 'Creators', href: `${DALIM_URL}/creators` }, 
    ]
    return (
        <div className="block md:hidden">
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={'icon'}
                        variant="ghost">
                        {isOpen ? <X className="h-5 w-5" /> : <Equal className="h-5 w-5" />}
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="border-brand bg-brand space-y-4 p-6">
                    <DialogTitle></DialogTitle>
                    <div className="">
                        <PhoneLinkSelect />
                        <div className="mt-1">{children}</div>
                        <div className="mx-2 my-6 space-y-6 text-xl text-white dark:text-black">
                            {infoLinks.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="block transition-colors hover:underline">
                                    {label}
                                </Link>
                            ))}
                            <ThemeSwitch />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export function MobileWorks({ children }: ProtectedLayoutProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const infoLinks = [
        { label: 'About', href: `${DALIM_URL}/about` },
        { label: 'Pricing', href: `${DALIM_URL}/pricing` },
        { label: 'Blogs', href: `${DALIM_URL}/blogs` },
        { label: 'Creators', href: `${DALIM_URL}/creators` }, 
    ]
    return (
        <div className="block md:hidden">
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={'icon'}
                        variant="ghost">
                        {isOpen ? <X className="h-5 w-5" /> : <Equal className="h-5 w-5" />}
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="border-brand bg-brand space-y-4 p-6">
                    <DialogTitle></DialogTitle>
                    <div className="">
                        <PhoneLinkSelect />
                        <div className="mt-1">{children}</div>
                        <div className="mx-2 my-6 space-y-6 text-xl text-white dark:text-black">
                            {infoLinks.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="block transition-colors hover:underline">
                                    {label}
                                </Link>
                            ))}
                            <ThemeSwitch />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export function MobileUI({ children }: ProtectedLayoutProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const infoLinks = [
        { label: 'UI', href: '/ui' },
        { label: 'Blocks', href: '/blocks' },
        { label: 'Colors', href: '/colors' },
        { label: 'Easings', href: '/easings' }
    ]
    return (
        <div className="block md:hidden">
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={'icon'}
                        variant="ghost">
                        {isOpen ? <X className="h-5 w-5" /> : <Equal className="h-5 w-5" />}
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="border-brand bg-brand space-y-4 p-6">
                    <DialogTitle>
                        <PhoneLinkSelect />
                    </DialogTitle>
                    <div className="">
                        <div className="">{children}</div>
                        <div className="mx-2 my-4 space-y-4 text-xl text-white dark:text-black">
                            {infoLinks.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="block transition-colors hover:underline">
                                    {label}
                                </Link>
                            ))}
                            <ThemeSwitch />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}


export function MobileFonts({ children }: ProtectedLayoutProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const infoLinks = [
        { label: 'Fonts', href: '/fonts' },
        { label: 'Typography', href: '#' }
    ]
    return (
        <div className="block md:hidden">
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={'icon'}
                        variant="ghost">
                        {isOpen ? <X className="h-5 w-5" /> : <Equal className="h-5 w-5" />}
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="border-brand bg-brand space-y-4 p-6">
                    <DialogTitle>
                        <PhoneLinkSelect />
                    </DialogTitle>
                    <div className="">
                        <div className="">{children}</div>
                        <div className="mx-2 my-4 space-y-4 text-xl text-white dark:text-black">
                            {infoLinks.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="block transition-colors hover:underline">
                                    {label}
                                </Link>
                            ))}
                            <ThemeSwitch />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}


export function MobileGraphic({ children }: ProtectedLayoutProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const infoLinks = [
        { label: 'Graphic', href: '/graphic' },
        { label: 'Backgrounds', href: '/backgrounds' }
    ]
    return (
        <div className="block md:hidden">
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={'icon'}
                        variant="ghost">
                        {isOpen ? <X className="h-5 w-5" /> : <Equal className="h-5 w-5" />}
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="border-brand bg-brand space-y-4 p-6">
                    <DialogTitle>
                        <PhoneLinkSelect />
                    </DialogTitle>
                    <div className="">
                        <div className="">{children}</div>
                        <div className="mx-2 my-4 space-y-4 text-xl text-white dark:text-black">
                            {infoLinks.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="block transition-colors hover:underline">
                                    {label}
                                </Link>
                            ))}
                            <ThemeSwitch />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
