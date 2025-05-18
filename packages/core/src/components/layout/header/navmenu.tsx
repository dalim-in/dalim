"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../ui/navigation-menu"

export function Menu() {
  return (
    <div className="hidden pl-1 md:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Designali</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[600px] lg:w-[900px] lg:grid-cols-[1fr_1fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink href="/about">
                    <div className="bg-secondary/60 hover:bg-accent flex h-full w-full flex-col justify-end rounded-lg p-6 no-underline outline-none select-none focus:shadow-md">
                      <div className="text-primary mb-2 text-lg font-medium">
                        About
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Welcome to My Creative Playground! I’m Ali – Your
                        Vision, My Design.
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink href="/agency/works">
                    <div className="bg-secondary/60 hover:bg-accent flex h-full w-full flex-col justify-end rounded-lg p-6 no-underline outline-none select-none focus:shadow-md">
                      <div className="text-primary mb-2 text-lg font-medium">
                        Works
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Welcome to My Creative Playground! I’m Ali – Your
                        Vision, My Design.
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/agency" title="Agency">
                  Design Without Limits. Get agency-level designs without the
                  agency price.
                </ListItem>
                <ListItem href="/profile" title="Profiles">
                  World's Top Designers profile list. Download the Assets from
                  users.
                </ListItem>

                <ListItem href="/blog" title="Blogs">
                  Creative Chronicles: Insights, Inspiration, and Design Trends
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/fonts"
              className={navigationMenuTriggerStyle()}
            >
              Fonts
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none font-normal text-[#000000] no-underline group-hover:no-underline">
                New
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/graphic"
              className={navigationMenuTriggerStyle()}
            >
              Graphic
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none font-normal text-[#000000] no-underline group-hover:no-underline">
                New
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Components
              </NavigationMenuLink>
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
              href="/fonts"
              className={navigationMenuTriggerStyle()}
            >
              Fonts
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none font-normal text-[#000000] no-underline group-hover:no-underline">
                New
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/graphic"
              className={navigationMenuTriggerStyle()}
            >
              Graphic
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none font-normal text-[#000000] no-underline group-hover:no-underline">
                New
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Components
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export function MenuAgency() {
  return (
    <div className="hidden pl-1 md:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/works" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Works
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        <div
          className={cn(
            "bg-secondary/60 hover:bg-accent block space-y-1 rounded-md p-4 leading-none no-underline transition-colors outline-none select-none",
            className
          )}
        >
          <div className="text-md text-primary">{title}</div>
          <p className="text-muted-foreground/70 line-clamp-2 text-xs leading-snug">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
