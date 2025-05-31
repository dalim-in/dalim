'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '../../../lib/utils'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../../../ui/navigation-menu'
import { AGENCY_URL, DALIM_URL, FONTS_URL, LEARN_URL, WORKS_URL } from '@dalim/auth'

export function Menu() {
    return (
        <div className="hidden pl-1 md:block">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link
                            href="/about"
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[600px] lg:w-[900px] lg:grid-cols-[1fr_1fr_1fr]">
                                <div className="row-span-1 space-y-3">
                                    <ListItem
                                        href="/pricing"
                                        title="Pricing">
                                        World's Top Designers profile list. Download the Assets from users.
                                    </ListItem>
                                    <ListItem
                                        href={`${FONTS_URL}`}
                                        title="Fonts">
                                        Discover beautifully crafted typefaces for every creative project.
                                    </ListItem>
                                    <ListItem
                                        href="/blogs"
                                        title="Blogs">
                                        Creative Chronicles: Insights, Inspiration, and Design Trends
                                    </ListItem>
                                </div>
                                <li className="row-span-1">
                                    <NavigationMenuLink href={`${AGENCY_URL}`}>
                                        <div className="bg-secondary/60 hover:bg-accent flex h-full w-full select-none flex-col justify-end rounded-lg p-6 no-underline outline-none focus:shadow-md">
                                            <div className="text-primary mb-2 text-lg font-medium">Agency</div>
                                            <p className="text-muted-foreground text-sm leading-tight"> Design Without Limits. Get agency-level designs without the agency price.</p>
                                        </div>
                                    </NavigationMenuLink>
                                </li>
                                <div className="row-span-1 space-y-3">
                                    <ListItem
                                        href="/creators"
                                        title="Creators">
                                        World's Top Designers profile list. Download the Assets from users.
                                    </ListItem>
                                    <ListItem
                                        href={`${LEARN_URL}`}
                                        title="Learn">
                                        Learn Without Limits. Get agency-level designs without the agency price.
                                    </ListItem>
                                    <ListItem
                                        href={`${WORKS_URL}`}
                                        title="Works">
                                        Welcome to My Creative Playground! I’m Ali – Your Vision, My Design.
                                    </ListItem>
                                </div>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href="/docs"
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Docs</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export function MenuUI() {
    return (
        <div className="hidden pl-1 md:block">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/ui"
                            className={navigationMenuTriggerStyle()}>
                            UI
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/blocks"
                            className={navigationMenuTriggerStyle()}>
                            Blocks
                            <span className="ml-2 rounded-md bg-[#fff000] px-1.5 py-0.5 text-xs font-normal leading-none text-[#000000] no-underline group-hover:no-underline">New</span>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href="/colors"
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Colors</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href="/easings"
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Easings</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export function MenuAgency() {
    return (
        <div className="hidden pr-20 md:block">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link
                            href={`${WORKS_URL}`}
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Works</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href={`${DALIM_URL}/pricing`}
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}


export function MenuFonts() {
    return (
        <div className="hidden pr-20 md:block">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link
                            href={`/`}
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Fonts</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href={`#`}
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Graphics</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink
                ref={ref as React.Ref<HTMLAnchorElement>}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(props as any)}>
                <div className={cn('bg-secondary/60 hover:bg-accent block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors', className)}>
                    <div className="text-md text-primary">{title}</div>
                    <p className="text-muted-foreground/70 line-clamp-2 text-xs leading-snug">{children}</p>
                </div>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'
