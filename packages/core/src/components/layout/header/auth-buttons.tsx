'use client'

import { useEffect, useState } from 'react'
import { authClient } from '@dalim/auth'
import Link from 'next/link'
import { Button } from '../../../ui/button'
import { SignIn } from './sign-in'
import { Skeleton } from '../../../ui/skeleton'
import { DALIM_URL } from '@dalim/auth'

export function AuthButtons() {
    const { data, isPending } = authClient.useSession()
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        // Avoid rendering until after hydration
        return null
    }

    if (isPending) {
        return (
            <div>
                <Skeleton className="h-9 w-9 rounded-md" />
            </div>
        )
    }

    const session = data

    return !session ? (
        <div className="flex justify-center gap-2">
            <Link href={`${DALIM_URL}/login`}>
                <Button>Login</Button>
            </Link>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            <SignIn />
        </div>
    )
}
