import { SearchUsers } from '@/src/components/creators/search-users'
import { PageHeader } from '@dalim/core/components/common/page-header'
import { prisma } from '@dalim/db'

async function getUsers() {
    try {
        const users = await prisma.user.findMany({
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
                role: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return users
    } catch (error) {
        console.error('Failed to fetch users:', error)
        return []
    }
}

export default async function UsersPage() {
    const users = await getUsers()

    return (
        <div className="">
            <PageHeader
                badge="Creators"
                className="-mx-6 -mt-14"
                title={'Design Community Members'}
                subheading={`Discover and connect with our amazing community of ${users.length} members.`}
            />
            <div className="mx-auto max-w-6xl border-x px-6 py-6">
                <SearchUsers users={users} />
            </div>
        </div>
    )
}
