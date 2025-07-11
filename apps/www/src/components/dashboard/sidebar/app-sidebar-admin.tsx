'use client'

import * as React from 'react'
import { Frame, SquareLibrary, PenTool, Settings2, SquareCode, AArrowUp } from 'lucide-react'
import Image from 'next/image'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from '@dalim/core/ui/sidebar'
import { AGENCY_URL, FONTS_URL, UI_URL, WORKS_URL } from '@dalim/auth'
import { PublicUser } from '@/src/types/user'
import { SidebarOptInForm } from './sidebar-opt-in-form'
import Link from 'next/link'

const data = { 
    navMain: [
        {
            title: 'Designs',
            url: '',
            icon: PenTool,
            isActive: true,
            items: [
                { title: 'Fonts', url: '/admin/fonts' },
                { title: 'Graphics', url: '/admin/graphic' },
                { title: 'Users', url: '/admin/users' },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                { title: 'General', url: '/admin/settings' },
                { title: 'Team', url: '#' },
                { title: 'Billing', url: '#' },
            ],
        },
    ],
    projects: [
        { name: 'Agency', url: AGENCY_URL, icon: Frame },
        { name: 'UI', url: UI_URL, icon: SquareCode },
        { name: 'Works', url: WORKS_URL, icon: SquareLibrary },
         { name: 'Fonts', url: FONTS_URL, icon: AArrowUp },
    ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    user: PublicUser
}

export function AppSidebarAdmin({ user, ...props }: AppSidebarProps) {
    const { state } = useSidebar()
    return (
        <Sidebar
            className=""
            collapsible="icon"
            {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild>
                            <div>
                                <div className="flex aspect-square size-8 items-center justify-center">
                                    <Image
                                        src={user.image || '/placeholder.svg'}
                                        width={40}
                                        height={40}
                                        alt={user.name || 'Avatar'}
                                        className="aspect-square rounded-full border"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs opacity-60">{user.email}</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <div className="pl-2">
                                    {state !== 'collapsed' && (
                                        <div className="space-y-1">
                                            <div className='flex items-center gap-2'>
                                                <p className="text-xs">Username:</p>
                                                <Link href={`/${user.username}`}>
                                                    <span className="text-md text-brand cursor-pointer hover:underline">{user.username}</span>
                                                </Link>
                                            </div>
                                           <div className='flex items-center gap-2'>
                                                <p className="text-xs">Bio:</p>
                                                <span className="text-md">{user.bio || ' '}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <div className="p-1">{state !== 'collapsed' && <SidebarOptInForm />}</div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
