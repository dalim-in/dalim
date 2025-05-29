'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'

import { Calendar, Globe, Twitter, Instagram, Linkedin, LinkIcon, Share, MoreHorizontal, Eye } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { toast } from '@dalim/core/hooks/use-toast'
import Image from 'next/image'
import { BlueTick } from '@dalim/core/components/logos'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@dalim/core/ui/dropdown-menu'

type UserType = {
    id: string
    name: string | null
    username: string | null
    bio: string | null
    summary: string | null
    image: string | null
    coverImage: string | null
    website: string | null
    twitter: string | null
    instagram: string | null
    linkedin: string | null
    createdAt: Date
    emailVerified: Date | null
}

interface DetailedUserProfileProps {
    user: UserType
}

export function UserProfile({ user }: DetailedUserProfileProps) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${user.name || user.username}'s Profile`,
                    text: user.bio || `Check out ${user.name || user.username}'s profile`,
                    url: window.location.href,
                })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                // User cancelled sharing
            }
        } else {
            await navigator.clipboard.writeText(window.location.href)
            toast({
                title: 'Link copied',
                description: 'Profile link has been copied to clipboard.',
            })
        }
    }

    const socialLinks = [
        {
            name: 'Website',
            url: user.website,
            icon: Globe,
        },
        {
            name: 'Twitter',
            url: user.twitter?.startsWith('@') ? `https://twitter.com/${user.twitter.slice(1)}` : user.twitter?.startsWith('http') ? user.twitter : user.twitter ? `https://twitter.com/${user.twitter}` : null,
            icon: Twitter,
        },
        {
            name: 'Instagram',
            url: user.instagram?.startsWith('@') ? `https://instagram.com/${user.instagram.slice(1)}` : user.instagram?.startsWith('http') ? user.instagram : user.instagram ? `https://instagram.com/${user.instagram}` : null,
            icon: Instagram,
        },
        {
            name: 'LinkedIn',
            url: user.linkedin,
            icon: Linkedin,
        },
    ].filter((link) => link.url)

    return (
        <div className="mb-6">
            <div className="bg-brand relative h-64 overflow-hidden md:h-80">
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

            {/* Profile Content */}
            <div className="container relative z-10 mx-auto -mt-40 max-w-4xl px-6 md:-mt-20">
                <div className="space-y-3">
                    {/* Profile Header */}
                    <Card className="border-0 shadow-xl">
                        <CardContent className="">
                            <div className="flex gap-3">
                                {/* Avatar and Basic Info */}
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <div className="flex-shrink-0">
                                        <Avatar className="border-border/50 h-24 w-24 border-4 md:h-32 md:w-32">
                                            <AvatarImage src={user.image || '/placeholder.svg'} />
                                            <AvatarFallback className="text-2xl">{user.name?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="">
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-2xl font-bold md:text-3xl">{user.name || user.username}</h1>
                                            {user.emailVerified && <BlueTick className="h-5 w-5" />}
                                        </div>
                                        <p className="text-muted-foreground text-lg">{user.username}</p>
                                        {user.bio && <p className="mt-2 max-w-2xl text-lg">{user.bio}</p>}

                                        <div className="mt-2 flex flex-wrap gap-6 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>Joined {format(new Date(user.createdAt), 'MMMM yyyy')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-auto flex flex-col items-end justify-between">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={handleShare}>
                                                <Share className="mr-2 h-4 w-4" />
                                                Share Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <LinkIcon className="mr-2 h-4 w-4" />
                                                Copy Link
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Analytics
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <div className="items-end">
                                        {socialLinks.length > 0 && (
                                            <div className="flex items-center">
                                                {socialLinks.map((link) => {
                                                    const Icon = link.icon
                                                    return (
                                                        <Link
                                                            key={link.name}
                                                            href={link.url!}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:bg-muted flex items-center gap-3 rounded-lg p-2 transition-colors">
                                                            <Icon className="h-4 w-4 opacity-50" />
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-1 gap-3">
                        {/* Left Column */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Summary */}
                            {user.summary && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-wrap leading-relaxed">{user.summary}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Recent Activity */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
