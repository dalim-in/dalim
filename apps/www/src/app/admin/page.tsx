import { getCurrentUser } from '@dalim/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login') // Redirect to login if no user is found
    }

    if (!user || user.role !== 'ADMIN') {
        redirect('/dashboard') // Redirect to dashboard if no user or if user is not an admin
    }

    return (
        <main className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                </div>
            </div>
        </main>
    )
}
