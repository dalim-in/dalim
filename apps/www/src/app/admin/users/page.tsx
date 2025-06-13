import { auth } from '@dalim/auth'
import { redirect } from 'next/navigation'
import { getAllUsersForAdmin } from '@/src/actions/users'
import { AdminUsersTable } from '@/src/components/admin/users-table'

interface AdminUsersPageProps {
    searchParams: {
        page?: string
        search?: string
        role?: string
        status?: string
    }
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
    const session = await auth()

    // Check if user is admin
    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/')
    }

    const page = Number.parseInt(searchParams.page || '1')
    const search = searchParams.search || ''
    const role = searchParams.role || ''
    const status = searchParams.status || ''

    const { users, total, pages, currentpage } = await getAllUsersForAdmin({
        page,
        search,
        role,
        status,
        limit: 15,
    })

    return (
        <div className="mt-3">
            <AdminUsersTable
                users={users}
                total={total}
                pages={pages}
                currentpage={currentpage}
            />
        </div>
    )
}
