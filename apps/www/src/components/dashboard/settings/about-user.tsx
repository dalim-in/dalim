'use client'

import { PublicUser } from '@/src/types/user'
import Image from 'next/image'
import Link from 'next/link'

export function DashboardUser({ user }: { user: PublicUser }) {
    return (
        <div>
            <div className="grid items-center gap-3">
                <div className="mt-3 flex items-center gap-4">
                    <Image
                        src={user.image || '/placeholder.svg'}
                        width={48}
                        height={48}
                        alt={user.name || 'Avatar'}
                        className="aspect-square rounded-full border"
                    />
                    <h1 className="inline-flex items-baseline text-3xl font-bold sm:text-5xl">{user.name}</h1>
                </div>
                <div className="flex flex-wrap gap-4">
                    <p className="text-md text-primary/70">{user.email}</p>
                    <div className="h-6 border-r"></div>
                    <Link href={`/graphic/profile/${user.username}`}>
                        <p className="text-md text-ali hover:underline">{user.username}</p>
                    </Link>
                    <div className="h-6 border-r"></div>
                    <p className="text-md text-primary/70">{user.bio}</p>
                    <div className="h-6 border-r"></div>
                    <div className="flex items-center gap-2">
                        Joined
                        <p className="text-primary/70 text-xs">{user.createdAt ? new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(user.createdAt)) : 'N/A'}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 w-full rounded-md border p-3 md:p-6">
                <p className="text-primary/70 text-sm">{user.summary}</p>
            </div>
        </div>
    )
}
