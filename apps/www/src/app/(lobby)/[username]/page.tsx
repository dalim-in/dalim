import { UserProfile } from '@/src/components/profiles/user-profile'
import { prisma } from '@dalim/db'
import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'

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
        <div className='-mx-6 -mt-14'>
            <UserProfile user={user} />
        </div>
    )
}
