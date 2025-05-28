import { redirect } from 'next/navigation'
import { getCurrentUser } from '@dalim/auth'
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login') // or any fallback page
    }

    return (
        <div className="mb-6 text-center">
            <main className="relative mt-20 w-full overflow-hidden px-6">
                <h1 className="mb-3 text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">Settings</h1>
                <p className="text-primary/60 px-6 text-center text-xs md:text-sm lg:text-lg">Dashboard Access Coming Soon.</p>
                <div className="my-8 flex items-center justify-center gap-1">
                    <span className="relative flex h-3 w-3 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <p className="text-xs text-green-500">Available for New Projects</p>
                </div>
            </main>
            <div className="">
                <Link href={`/pricing`}>
                    <Button size={'lg'}>Let's Go</Button>
                </Link>
            </div>
        </div>
    )
}
