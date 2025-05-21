import { redirect } from 'next/navigation'
import { auth } from '@dalim/auth'
import { headers } from 'next/headers'
import AdminUsersTable from '@/src/components/admin/users-table'
import { prisma } from '@dalim/db' 

export default async function AdminDashboard() {
    const session = await auth.api
        .getSession({
            headers: await headers(),
        })
        .catch(() => redirect('/login'))

    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/dashboard')
    }
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            _count: {
                select: {
                    sessions: true,
                },
            },
        },
    })

    const stats = {
        totalUsers: users.length,
        verifiedUsers: users.filter((user) => user.emailVerified).length,
        premiumUsers: users.filter((user) => user.premium).length,
        bannedUsers: users.filter((user) => user.banned).length,
        admins: users.filter((user) => user.role === 'ADMIN').length,
        newUsersToday: users.filter((user) => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return new Date(user.createdAt) >= today
        }).length,
    }
    return (
        <main className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                </div>
                 
                <AdminUsersTable
                    initialUsers={users}
                    stats={stats}
                />
            </div>
        </main>
    )
}
