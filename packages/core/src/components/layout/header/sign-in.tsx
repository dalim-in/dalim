'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,   DropdownMenuTrigger } from '../../../ui/dropdown-menu'
import { DALIM_URL } from '@dalim/auth'
import type { User } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, 'name' | 'image' | 'email'> & { role?: 'USER' | 'ADMIN' }
}

export function SignIn({ user }: UserAccountNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full">
                    <Avatar className="h-9 w-9 rounded-full border">
                        <AvatarImage
                            src={user.image ?? ''}
                            alt={''}
                        />
                        <AvatarFallback className="from-foreground via-muted-foreground to-muted bg-gradient-to-br opacity-70" />
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-56">
                <DropdownMenuLabel className="pb-0 text-xl">{user.name && <p className="font-medium">{user.name}</p>}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-primary/60 pt-0 text-sm font-light"> {user.email && <span className="text-muted-foreground w-[200px] truncate text-sm">{user.email}</span>}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={`${DALIM_URL}/dashboard`}>
                            Dashboard
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>

                    {user.role === 'ADMIN' && (
                        <DropdownMenuItem asChild>
                            <Link href={`${DALIM_URL}/admin`}>
                                Admin
                                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                            </Link>
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                        <Link href={`${DALIM_URL}/dashboard/settings`}>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={`${DALIM_URL}/dashboard/chats`}>
                            Chats
                            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`${DALIM_URL}/dashboard/fonts`}>
                            Fonts
                            <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`${DALIM_URL}/dashboard/graphic`}>
                            Graphic
                            <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>Upgrade to Pro</DropdownMenuItem> 
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault()
                        signOut({
                            callbackUrl: `${DALIM_URL}`,
                        })
                    }}>
                    <div className="flex items-center space-x-2.5">
                        <p className="text-sm">Log out </p>
                    </div>
                    <DropdownMenuShortcut>⌘+L</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
