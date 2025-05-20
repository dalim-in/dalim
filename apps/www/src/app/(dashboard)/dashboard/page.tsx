import { auth } from '@/src/lib/auth/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import UserCard from '@/src/components/dashboard/settings/user-card'

export default async function DashboardPage() {
    const [session, activeSessions] = await Promise.all([
        auth.api.getSession({
            headers: await headers(),
        }),
        auth.api.listSessions({
            headers: await headers(),
        }),
    ]).catch((e) => {
        console.log(e)
        throw redirect('/login')
    })
    return (
        <div className="w-full mb-10">
            <div className="flex flex-col gap-4">
                <UserCard
                    session={JSON.parse(JSON.stringify(session))}
                    activeSessions={JSON.parse(JSON.stringify(activeSessions))}
                />
            </div>
        </div>
    )
}
