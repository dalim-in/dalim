import { redirect } from 'next/navigation'
import { DashboardUser } from '@/src/components/dashboard/settings/about-user'
import { getCurrentUser } from '@dalim/auth'

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login') // or any fallback page
    }

    return (
        <div className="mb-4 w-full"> 
            <DashboardUser user={user} />
        </div>
    )
}
