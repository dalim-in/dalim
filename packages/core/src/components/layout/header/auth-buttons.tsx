'use client'

import { authClient } from '@dalim/auth'
import Link from 'next/link'
import { Button } from '../../../ui/button'
import { SignIn } from './sign-in' 
import { Skeleton } from '../../../ui/skeleton'

export function AuthButtons() {
    const { data, isPending } = authClient.useSession()
    if (isPending)
        return (
            <div>
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
