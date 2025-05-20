'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@dalim/auth'
import { useSession } from '@dalim/auth'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../../../ui/dropdown-menu'
import { DALIM_URL } from '@dalim/auth'

import Link from 'next/link'

export function SignIn() {
    const { data: session } = useSession()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/login')
                        router.refresh()
                    },
                },
            })
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    if (!session) return null // ✅ safely guard

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage
                        src={session.user.image ?? '/brand/logo.svg'}
                        alt={session.user.name ?? 'A'}
                    />
                    <AvatarFallback>{(session.user.name ?? 'A').charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="left"
                className="mt-5 w-56">
                <DropdownMenuLabel className="pb-0 text-xl">{session.user.name}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-primary/60 pt-0 text-sm font-light">{session.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={`${DALIM_URL}/dashboard`}>
                            Dashboard
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    {session?.user?.role === 'ADMIN' && (
                        <DropdownMenuItem asChild>
                            <Link href={`${DALIM_URL}/admin`}>
                                Admin
                                <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
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
                <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
