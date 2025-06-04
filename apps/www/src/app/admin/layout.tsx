import { getCurrentUser } from '@dalim/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@dalim/core/ui/sidebar'

import { AppSidebarAdmin } from '@/src/components/dashboard/sidebar/app-sidebar-admin'

import { Separator } from '@dalim/core/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@dalim/core/ui/breadcrumb'

const title = 'Admin'
const description = 'Manage users and view system statistics'

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
}

export default async function BlocksLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login') // Redirect to login if no user is found
    }

    if (!user || user.role !== 'ADMIN') {
        redirect('/dashboard') // Redirect to dashboard if no user or if user is not an admin
    }
    return (
            <div className="relative -mx-6 -mt-14 h-[950px]">
                <SidebarProvider className="relative flex h-full">
                    <AppSidebarAdmin user={user} className="relative h-[950px] border-l" />
                    <SidebarInset className="">
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 h-4"
                                />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{user.name}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </header>
                        <div className="h-[870px] overflow-y-auto px-6">
                            {children} 
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
    )
}
