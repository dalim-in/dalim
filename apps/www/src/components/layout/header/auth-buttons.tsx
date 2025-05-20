'use client'

import { authClient } from '@/src/lib/auth/auth-client'
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'
import { SignIn } from './sign-in' 
import { Skeleton } from '@dalim/core/ui/skeleton'

export function AuthButtons() {
    const { data, isPending } = authClient.useSession()
    if (isPending)
        return (
            <div className=''>
                <Skeleton className="h-9 w-9 rounded-md" />
            </div>
        )

    const session = data

    return !session ? (
        <div className="flex justify-center gap-2">
            <Link href="/login">
                <Button>Login</Button>
            </Link>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            <SignIn />
        </div>
    )
}
