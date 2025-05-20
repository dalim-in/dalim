import { redirect } from 'next/navigation'
import { auth } from '@dalim/auth'
import { headers } from 'next/headers'
import UsersTable from '@/src/components/admin/users-table'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'

export default async function AdminDashboard() {
    const session = await auth.api
        .getSession({
            headers: await headers(),
        })
        .catch(() => redirect('/login'))
 
    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/dashboard')
    }

    return (
        <main className="flex flex-col">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
                <div className="mb-8 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage users and view system statistics</p>
                </div> 
                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UsersTable />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
