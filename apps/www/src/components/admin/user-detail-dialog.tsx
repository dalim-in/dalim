'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@dalim/core/ui/dialog'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Switch } from '@dalim/core/ui/switch'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

// Define the User type based on your Prisma schema
type User = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    role: 'ADMIN' | 'USER'
    createdAt: Date
    updatedAt: Date
    _count?: {
        sessions: number
    }
}

interface UserDetailDialogProps {
    user: User
    open: boolean
    onOpenChange: (open: boolean) => void
    onUserUpdated: (user: User) => void
}

export default function UserDetailDialog({ user, open, onOpenChange, onUserUpdated }: UserDetailDialogProps) {
    const [name, setName] = useState(user.name || '')
    const [role, setRole] = useState<'ADMIN' | 'USER'>(user.role)
    const [emailVerified, setEmailVerified] = useState(user.emailVerified)
    const [loading, setLoading] = useState(false)

    const handleUpdateUser = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/admin/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    role,
                    emailVerified,
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Failed to update user')
            }

            const updatedUser = await response.json()
            onUserUpdated(updatedUser)
            onOpenChange(false)
        } catch (error) {
            console.error('Error updating user:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to update user')
        } finally {
            setLoading(false)
        }
    }

    const handleSendVerificationEmail = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/admin/users/${user.id}/send-verification`, {
                method: 'POST',
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Failed to send verification email')
            }

            toast.success('Verification email sent successfully')
        } catch (error) {
            console.error('Error sending verification email:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to send verification email')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>Update user details and permissions</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="email"
                            className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={user.email}
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="name"
                            className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="role"
                            className="text-right">
                            Role
                        </Label>
                        <Select
                            value={role}
                            onValueChange={(value) => setRole(value as 'ADMIN' | 'USER')}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="verified"
                            className="text-right">
                            Email Verified
                        </Label>
                        <div className="col-span-3 flex items-center gap-4">
                            <Switch
                                id="verified"
                                checked={emailVerified}
                                onCheckedChange={setEmailVerified}
                            />
                            {!emailVerified && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSendVerificationEmail}
                                    disabled={loading}>
                                    Send Verification
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Created</Label>
                        <div className="col-span-3 text-sm">{new Date(user.createdAt).toLocaleString()}</div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleUpdateUser}
                        disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
