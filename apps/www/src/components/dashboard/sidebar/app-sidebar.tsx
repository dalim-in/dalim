'use client'

import * as React from 'react'
import { Frame, Map, PieChart, Settings2, SquareTerminal } from 'lucide-react'
import Image from 'next/image'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from '@dalim/core/ui/sidebar'
import { AGENCY_URL, UI_URL, WORKS_URL } from '@dalim/auth'
import { PublicUser } from '@/src/types/user'
import { SidebarOptInForm } from './sidebar-opt-in-form'

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'General',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                { title: 'Downloads', url: '#' },
                { title: 'Chats', url: '#' },
                { title: 'Designs', url: '#' },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                { title: 'General', url: '#' },
                { title: 'Team', url: '#' },
                { title: 'Billing', url: '#' },
            ],
        },
    ],
    projects: [
        { name: 'Agency', url: AGENCY_URL, icon: Frame },
        { name: 'UI', url: UI_URL, icon: PieChart },
        { name: 'Works', url: WORKS_URL, icon: Map },
    ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    user: PublicUser
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
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
                                <div className="pl-3">
                                    {state !== 'collapsed' && (
                                        <div className='space-y-1'>
                                            <div>
                                                <span className="text-xs">Username: </span>
                                                <span className="text-md text-brand cursor-pointer hover:underline">{user.username}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs">Bio: </span>
                                                <span className="text-md text-brand cursor-pointer hover:underline">{user.bio || " "}</span>
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
