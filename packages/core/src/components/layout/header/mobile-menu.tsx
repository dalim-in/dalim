'use client'

import * as React from 'react'
import { Equal, X } from 'lucide-react'

import { Button } from '../../../ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from '../../../ui/drawer'
import { PhoneLinkSelect } from './link-select'
import { ThemeSwitch } from '../footer/theme-switch'
import Link from 'next/link'

export function MobileWWW() {
    const [isOpen, setIsOpen] = React.useState(false)

    const infoLinks = [
        { label: 'About', href: '/about' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blogs', href: '/blogs' },
        { label: 'Docs', href: '/docs' },
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
                    <DrawerTitle></DrawerTitle>
                    <div className="">
                        <PhoneLinkSelect />
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
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Back</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export function MobileAgency() {
    const [isOpen, setIsOpen] = React.useState(false)

    const infoLinks = [
        { label: 'About', href: '/about' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blogs', href: '/blogs' },
        { label: 'Docs', href: '/docs' },
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
                    <DrawerTitle></DrawerTitle>
                    <div className="">
                        <PhoneLinkSelect />
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
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Back</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}