import { prisma } from "@dalim/db"

export async function getUsers() {
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
                fonts: {
                    select: {
                        id: true,
                        name: true,
                        previewUrl: true,
                    },
                },
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