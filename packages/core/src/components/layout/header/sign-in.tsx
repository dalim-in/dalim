'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../../../ui/dropdown-menu'
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
                side="left"
                className="mt-5 w-56">
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
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
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
