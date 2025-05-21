'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@dalim/core/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@dalim/core/ui/dropdown-menu'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Badge } from '@dalim/core/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@dalim/core/ui/alert-dialog'
import { toast } from 'sonner'
import { Check, MoreHorizontal, Search, Trash, UserCog, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import UserDetailDialog from './user-detail-dialog'
import { UserStats } from "./user-stats"

// Define the User type based on your Prisma schema
type User = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    role: 'ADMIN' | 'USER'
    premium: boolean
    banned: boolean
    banReason?: string | null
    banExpires?: number | null
    createdAt: Date
    updatedAt: Date
    _count?: {
        sessions: number
    }
}

type Stats = {
  totalUsers: number
  verifiedUsers: number
  premiumUsers: number
  bannedUsers: number
  admins: number
  newUsersToday: number
}

interface AdminDashboardProps {
  initialUsers: User[]
  stats: Stats
}

export default function AdminUsersTable({ initialUsers, stats }: AdminDashboardProps) {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const router = useRouter()

    const handleDeleteUser = async () => {
        if (!selectedUser) return

        try {
            const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Failed to delete user')
            }

            toast.success('User deleted successfully')
            setDeleteDialogOpen(false)
            // Remove user from the state
            setUsers(users.filter((user) => user.id !== selectedUser.id))
        } catch (error) {
            console.error('Error deleting user:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to delete user')
        }
    }

    const handleUserUpdated = (updatedUser: User) => {
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
        toast.success('User updated successfully')
    }

    const filteredUsers = users.filter((user) => user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className='mb-6'><UserStats stats={stats} />
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage all users in your application</CardDescription>
                <div className="mt-4 flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                        <Input
                            placeholder="Search users..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => router.refresh()}>Refresh</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md -mt-3 border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Sessions</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-muted-foreground h-24 text-center">
                                        {searchQuery ? 'No users found matching your search' : 'No users found'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={user.image || undefined}
                                                        alt={user.name}
                                                    />
                                                    <AvatarFallback>{user.name?.charAt(0) || '?'}</AvatarFallback>
                                                </Avatar>
                                                <div className="font-medium">{user.name || 'Unnamed User'}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.emailVerified ? (
                                                <Badge
                                                    variant="outline"
                                                    className="border-green-200 bg-green-50 text-green-700">
                                                    <Check className="mr-1 h-3 w-3" /> Verified
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="border-amber-200 bg-amber-50 text-amber-700">
                                                    <X className="mr-1 h-3 w-3" /> Unverified
                                                </Badge>
                                            )}
                                            {user.banned && (
                                                <Badge
                                                    variant="destructive"
                                                    className="ml-2">
                                                    Banned
                                                </Badge>
                                            )}
                                            {user.premium && (
                                                <Badge
                                                    variant="outline"
                                                    className="ml-2 border-purple-200 bg-purple-50 text-purple-700">
                                                    Premium
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>{user.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="outline">{user._count?.sessions || 0} active</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedUser(user)
                                                            setEditDialogOpen(true)
                                                        }}>
                                                        <UserCog className="mr-2 h-4 w-4" />
                                                        Edit User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedUser(user)
                                                            setDeleteDialogOpen(true)
                                                        }}
                                                        className="text-red-600">
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Delete User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            {/* Delete User Confirmation Dialog */}
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the user account for <span className="font-medium">{selectedUser?.email}</span>. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteUser}
                            className="bg-red-600 hover:bg-red-700">
                            Delete User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit User Dialog */}
            {selectedUser && (
                <UserDetailDialog
                    user={selectedUser}
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    onUserUpdated={handleUserUpdated}
                />
            )}
        </Card>
        </div>
    )
}
