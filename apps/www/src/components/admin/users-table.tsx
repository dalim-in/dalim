/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Badge } from '@dalim/core/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@dalim/core/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@dalim/core/ui/alert-dialog'
import { Checkbox } from '@dalim/core/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Search, Trash2, Shield, AlertTriangle, ExternalLink, UserCheck, UserX, Crown, User, Eye } from 'lucide-react'
import { adminDeleteUser, adminBulkDeleteUsers, adminUpdateUserRole, adminToggleUserStatus } from '@/src/actions/users'
import { toast } from '@dalim/core/hooks/use-toast'
import { format } from 'date-fns'
import { Label } from '@dalim/core/ui/label'
import { Switch } from '@dalim/core/ui/switch'

const roles = [
    { value: '', label: 'All Roles' },
    { value: 'USER', label: 'User' },
    { value: 'ADMIN', label: 'Admin' },
]

const statuses = [
    { value: '', label: 'All Statuses' },
    { value: 'verified', label: 'Verified' },
    { value: 'unverified', label: 'Unverified' },
]

interface AdminUsersTableProps {
    users: Array<{
        id: string
        name: string | null
        username: string | null
        email: string | null
        image: string | null
        role: string
        emailVerified: Date | null
        createdAt: Date
        updatedAt: Date
        _count: {
            graphics: number
            fonts: number
        }
    }>
    total: number
    pages: number
    currentpage: number
}

export function AdminUsersTable({ users, total, pages, currentpage }: AdminUsersTableProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [isBulkDeleting, setIsBulkDeleting] = useState(false)
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [role, setRole] = useState(searchParams.get('role') || '')
    const [status, setStatus] = useState(searchParams.get('status') || '')

    const toggleItem = (list: string[], setList: (val: string[]) => void, value: string, checked: boolean) => {
        setList(checked ? [...list, value] : list.filter((v) => v !== value))
    }

    const updateURL = (newParams: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        router.push(`/admin/users?${params.toString()}`)
    }

    const handleSearch = () => {
        updateURL({ search, role, status, page: '1' })
    }

    const handleRoleChange = (newRole: string) => {
        setRole(newRole)
        updateURL({ search, role: newRole, status, page: '1' })
    }

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus)
        updateURL({ search, role, status: newStatus, page: '1' })
    }

    const handlePageChange = (page: number) => {
        updateURL({ page: page.toString() })
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedUsers(users.map((u) => u.id))
        } else {
            setSelectedUsers([])
        }
    }

    const handleSelectUser = (userId: string, checked: boolean) => {
        if (checked) {
            setSelectedUsers((prev) => [...prev, userId])
        } else {
            setSelectedUsers((prev) => prev.filter((id) => id !== userId))
        }
    }

    const handleDeleteUser = async (userId: string) => {
        setIsDeleting(true)
        try {
            const result = await adminDeleteUser(userId)
            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'User deleted successfully!',
                })
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to delete user',
                    variant: 'destructive',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsDeleting(false)
        }
    }

    const handleBulkDelete = async () => {
        if (selectedUsers.length === 0) return

        setIsBulkDeleting(true)
        try {
            const result = await adminBulkDeleteUsers(selectedUsers)
            if (result.success) {
                toast({
                    title: 'Success',
                    description: `${selectedUsers.length} users deleted successfully!`,
                })
                setSelectedUsers([])
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to delete users',
                    variant: 'destructive',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsBulkDeleting(false)
        }
    }

    const handleUpdateRole = async (userId: string, newRole: string) => {
        try {
            const result = await adminUpdateUserRole(userId, newRole as 'USER' | 'ADMIN')
            if (result.success) {
                toast({
                    title: 'Success',
                    description: `User role updated to ${newRole}!`,
                })
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to update user role',
                    variant: 'destructive',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        }
    }

    const handleToggleVerification = async (userId: string, verified: boolean) => {
        try {
            const result = await adminToggleUserStatus(userId, verified)
            if (result.success) {
                toast({
                    title: 'Success',
                    description: `User ${verified ? 'verified' : 'unverified'} successfully!`,
                })
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to update user status',
                    variant: 'destructive',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        }
    }

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.filter((u) => u.emailVerified).length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.filter((u) => u.role === 'ADMIN').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.reduce((sum, u) => sum + u._count.graphics + u._count.fonts, 0)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                    {/* Search */}
                    <div className="flex max-w-md flex-1 gap-2">
                        <Input
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button
                            size="icon"
                            onClick={handleSearch}>
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>

                    <Select
                        value={role}
                        onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles
                                .filter((r) => r.value !== '')
                                .map((r) => (
                                    <SelectItem
                                        key={r.value}
                                        value={r.value}>
                                        {r.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select
                        value={status}
                        onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses
                                .filter((s) => s.value !== '')
                                .map((s) => (
                                    <SelectItem
                                        key={s.value}
                                        value={s.value}>
                                        {s.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                disabled={isBulkDeleting}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected ({selectedUsers.length})
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                    Delete Selected Users
                                </AlertDialogTitle>
                                <AlertDialogDescription>Are you sure you want to delete {selectedUsers.length} selected users? This action cannot be undone and will permanently remove all their data including graphics, fonts, and account information.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleBulkDelete}
                                    disabled={isBulkDeleting}>
                                    {isBulkDeleting ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Users ({total})</CardTitle>
                </CardHeader>
                <CardContent>
                    {users.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-muted-foreground">No users found</p>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={selectedUsers.length === users.length}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Content</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedUsers.includes(user.id)}
                                                    onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={user.image || ''} />
                                                        <AvatarFallback>{user.name?.[0] || user.username?.[0] || user.email?.[0] || 'U'}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{user.name || user.username || 'No name'}</div>
                                                        <div className="text-muted-foreground text-sm">{user.email}</div>
                                                        {user.username && <div className="text-muted-foreground text-xs">@{user.username}</div>}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                                                            {user.role === 'ADMIN' ? <Crown className="mr-1 h-3 w-3" /> : <User className="mr-1 h-3 w-3" />}
                                                            {user.role}
                                                        </Badge>
                                                         
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={user.emailVerified ? 'default' : 'destructive'}>
                                                            {user.emailVerified ? <UserCheck className="mr-1 h-3 w-3" /> : <UserX className="mr-1 h-3 w-3" />}
                                                            {user.emailVerified ? 'Verified' : 'Unverified'}
                                                        </Badge>
                                                        <Switch
                                                            checked={!!user.emailVerified}
                                                            onCheckedChange={(checked) => handleToggleVerification(user.id, checked)}
                                                        />
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>{user._count.graphics} graphics</div>
                                                    <div className="text-muted-foreground">{user._count.fonts} fonts</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">{format(new Date(user.createdAt), 'MMM d, yyyy')}</div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {user.username && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            asChild>
                                                            <Link href={`/${user.username}`}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                disabled={isDeleting}>
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle className="flex items-center gap-2">
                                                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                                                    Delete User
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete "{user.name || user.username || user.email}"? This action cannot be undone and will permanently remove:
                                                                    <ul className="mt-2 list-inside list-disc space-y-1">
                                                                        <li>User account and profile</li>
                                                                        <li>{user._count.graphics} graphics and all associated images</li>
                                                                        <li>{user._count.fonts} fonts and all associated files</li>
                                                                        <li>All user data and settings</li>
                                                                    </ul>
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDeleteUser(user.id)}
                                                                    disabled={isDeleting}>
                                                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {pages > 1 && (
                                <div className="mt-6 flex justify-center gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handlePageChange(currentpage - 1)}
                                        disabled={currentpage === 1}>
                                        Previous
                                    </Button>

                                    {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                                        const page = i + 1
                                        return (
                                            <Button
                                                key={page}
                                                variant={currentpage === page ? 'default' : 'outline'}
                                                onClick={() => handlePageChange(page)}>
                                                {page}
                                            </Button>
                                        )
                                    })}

                                    <Button
                                        variant="outline"
                                        onClick={() => handlePageChange(currentpage + 1)}
                                        disabled={currentpage === pages}>
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
