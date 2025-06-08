'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type * as z from 'zod'
import { ScrollArea, ScrollBar } from '@dalim/core/ui/scroll-area'
import Image from 'next/image'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@dalim/core/ui/form'
import { Input } from '@dalim/core/ui/input'
import { Textarea } from '@dalim/core/ui/textarea'
import { Switch } from '@dalim/core/ui/switch'
import { Separator } from '@dalim/core/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Badge } from '@dalim/core/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'
import { toast } from '@dalim/core/hooks/use-toast'
import { Shield, User, Link, Settings } from 'lucide-react'
import type { ProfileSettingsFormProps } from '@/src/types/user'
import { profileSchema, securitySchema } from '@/src/types/zod'
import { SendVerificationEmail } from './send-verification-email'

export function ProfileSettingsForm({ user }: ProfileSettingsFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || '',
            username: user.username || '',
            email: user.email || '',
            bio: user.bio || '',
            summary: user.summary || '',
            image: user.image || '',
            coverImage: user.coverImage || '',
            website: user.website || '',
            twitter: user.twitter || '',
            instagram: user.instagram || '',
            linkedin: user.linkedin || '',
        },
    })

    const securityForm = useForm<z.infer<typeof securitySchema>>({
        resolver: zodResolver(securitySchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            isTwoFactorAuthEnabled: user.isTwoFactorAuthEnabled,
        },
    })

    async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
        setIsLoading(true)
        try {
            const response = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error('Failed to update profile')
            }

            toast({
                title: 'Profile updated',
                description: 'Your profile has been updated successfully.',
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update profile. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onSecuritySubmit(values: z.infer<typeof securitySchema>) {
        setIsLoading(true)
        try {
            const response = await fetch('/api/user/security', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error('Failed to update security settings')
            }

            toast({
                title: 'Security settings updated',
                description: 'Your security settings have been updated successfully.',
            })

            securityForm.reset({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                isTwoFactorAuthEnabled: values.isTwoFactorAuthEnabled,
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update security settings. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Tabs
            defaultValue="profile"
           className="mb-6">
            <TabsList className=" w-full md:w-auto items-center justify-center text-center shadow-xl overflow-hidden">
                <ScrollArea className="overflow-auto whitespace-nowrap">
                    <div className="space-x-2 flex gap-1">
                        <TabsTrigger
                            value="profile"
                            className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="social"
                            className="flex items-center gap-2">
                            <Link className="h-4 w-4" />
                            Social
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Security
                        </TabsTrigger>
                        <TabsTrigger
                            value="account"
                            className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Account
                        </TabsTrigger>
                    </div>
                    <ScrollBar
                        className="hidden"
                        orientation="horizontal"
                    />
                </ScrollArea>
            </TabsList>

            <TabsContent
                value="profile"
                className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your profile information and how others see you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...profileForm}>
                            <form
                                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                                className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={profileForm.watch('image') || '/placeholder.svg'} />
                                        <AvatarFallback className="text-lg">{profileForm.watch('name')?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <FormField
                                            control={profileForm.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Profile Image URL</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="https://example.com/image.jpg"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <FormField
                                        control={profileForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Display Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your display name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={profileForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="your_username"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>This is your unique identifier on the platform.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={profileForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={profileForm.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about yourself"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>Brief description for your profile. Maximum 160 characters.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={profileForm.control}
                                    name="summary"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Summary</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="A longer description about yourself, your work, or interests"
                                                    className="min-h-[100px] resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>Detailed summary for your profile. Maximum 500 characters.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="bg-brand relative h-64 overflow-hidden rounded-xl md:h-80">
                                    {user.coverImage && (
                                        <Image
                                            src={user.coverImage || '/placeholder.svg'}
                                            width={700}
                                            height={700}
                                            alt="Cover"
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>

                                <FormField
                                    control={profileForm.control}
                                    name="coverImage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cover Image URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://images.pexels.com/"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>Note: You can change your cover image from Pexels Image Address .</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent
                value="social"
                className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Social Links</CardTitle>
                        <CardDescription>Connect your social media accounts and website.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...profileForm}>
                            <form
                                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                                className="space-y-6">
                                <FormField
                                    control={profileForm.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://yourwebsite.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={profileForm.control}
                                    name="twitter"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Twitter</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="@yourusername"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={profileForm.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instagram</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="@yourusername"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={profileForm.control}
                                    name="linkedin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>LinkedIn</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://linkedin.com/in/yourusername"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Social Links'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent
                value="security"
                className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your password and security preferences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...securityForm}>
                            <form
                                onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
                                className="space-y-6">
                                <FormField
                                    control={securityForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter current password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Change Password</h4>

                                    <FormField
                                        control={securityForm.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter new password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>Leave blank if you don't want to change your password.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={securityForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm new password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Separator />

                                <FormField
                                    control={securityForm.control}
                                    name="isTwoFactorAuthEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                                                <FormDescription>Add an extra layer of security to your account.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isLoading}>
                                    {isLoading ? 'Updating...' : 'Update Security Settings'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent
                value="account"
                className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>View your account details and status.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-muted-foreground text-sm font-medium">Account ID</label>
                                <p className="bg-muted rounded-md p-2 pl-4 font-mono text-sm">{user.id}</p>
                            </div>
                            <div>
                                <label className="text-muted-foreground text-sm font-medium">Email Verification</label>
                                <div className="mt-1 flex items-center gap-2">
                                    {user.emailVerified ? (
                                        <Badge variant="default">Verified</Badge>
                                    ) : (
                                        <>
                                            <Badge variant="secondary">Not Verified</Badge>
                                            <SendVerificationEmail user={user} />
                                        </>
                                    )}
                                </div>
                                {!user.emailVerified && <p className="text-muted-foreground mt-1 text-xs">Click the verify button to receive a verification email at {user.email}</p>}
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h4 className="text-destructive text-sm font-medium">Danger Zone</h4>
                            <div className="border-destructive/20 space-y-4 rounded-lg border p-4">
                                <div>
                                    <h5 className="font-medium">Delete Account</h5>
                                    <p className="text-muted-foreground text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm">
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
