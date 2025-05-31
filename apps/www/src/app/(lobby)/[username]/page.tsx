import { UserProfile } from '@/src/components/profiles/user-profile'
import { prisma } from '@dalim/db'
import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'
import { Suspense } from 'react'
import { FontsList } from '@/src/components/creators/fonts/font-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'

interface ProfilePageProps {
    params: {
        username: string
    }
}

async function getUser(username: string) {
    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            name: true,
            username: true,
            bio: true,
            summary: true,
            image: true,
            coverImage: true,
            website: true,
            twitter: true,
            instagram: true,
            linkedin: true,
            createdAt: true,
            emailVerified: true,
        },
    })

    return user
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
    const user = await getUser(params.username)

    if (!user) {
        return {
            title: 'User Not Found',
        }
    }

    return {
        title: `${user.name || user.username} (${user.username})`,
        description: user.bio || `Check out ${user.name || user.username}'s profile`,
        openGraph: {
            title: `${user.name || user.username} (${user.username})`,
            description: user.bio || `Check out ${user.name || user.username}'s profile`,
            images: user.image ? [{ url: user.image }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${user.name || user.username} (${user.username})`,
            description: user.bio || `Check out ${user.name || user.username}'s profile`,
            images: user.image ? [user.image] : [],
        },
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const user = await getUser(params.username)

    if (!user) {
        notFound()
    }

    return (
        <div className="-mt-14">
            <UserProfile user={user} />
            <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

            <div className="mx-auto max-w-6xl border-x px-6 py-6">
                <div className="w-full">
                    <Tabs
                        defaultValue="fonts"
                        className="flex flex-col items-center">
                        <TabsList className="flex">
                            <TabsTrigger
                                value="fonts"
                                className="w-auto">
                                Fonts
                            </TabsTrigger>
                            <TabsTrigger
                                value="about"
                                className="w-auto">
                                About
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent
                            value="fonts"
                            className="w-full">
                            <Suspense fallback={'Loading...'}>
                                <FontsList />
                            </Suspense>
                        </TabsContent>

                        <TabsContent
                            value="about"
                            className="w-full">
                            About
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
