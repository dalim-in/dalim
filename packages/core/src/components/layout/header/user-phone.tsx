'use client'

import { DALIM_URL } from '@dalim/auth'
import { Card, CardContent } from '../../../ui/card'
import type { User } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Button } from '../../../ui/button'
import { useCallback } from 'react'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, 'name' | 'image' | 'email'> & { role?: 'USER' | 'ADMIN' }
}

export function UserPhone({ user }: UserAccountNavProps) {
    const handleLogout = useCallback(() => {
        signOut({ callbackUrl: `${DALIM_URL}` })
    }, [])
    return (
        <Card className="w-full p-4">
            <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 rounded-full border">
                    <AvatarImage
                        src={user.image ?? ''}
                        alt=""
                    />
                    <AvatarFallback className="from-foreground via-muted-foreground to-muted bg-gradient-to-br opacity-70" />
                </Avatar>
                <div>
                    {user.name && <p className="text-xl font-medium">{user.name}</p>}
                    {user.email && <p className="text-muted-foreground max-w-[200px] truncate text-sm">{user.email}</p>}
                </div>
            </div>
            <CardContent className="space-y-4 p-0">
                <Link
                    href={`${DALIM_URL}/dashboard`}
                    className="flex items-center justify-between">
                    <span>Dashboard</span>
                    <kbd className="text-muted-foreground text-xs">⌘D</kbd>
                </Link>

                {user.role === 'ADMIN' && (
                    <Link
                        href={`${DALIM_URL}/admin`}
                        className="flex items-center justify-between">
                        <span>Admin</span>
                        <kbd className="text-muted-foreground text-xs">⌘A</kbd>
                    </Link>
                )}
                <Button
                    className="w-full"
                    onClick={handleLogout}>
                    <span>Log out</span>
                </Button>
            </CardContent>
        </Card>
    )
}
