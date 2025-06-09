'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Card, CardContent } from '@dalim/core/ui/card'

import { Calendar, Globe, Twitter, Instagram, Linkedin } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import { BlueTick } from '@dalim/core/components/logos'
import { Separator } from '@dalim/core/ui/separator'
import { ShareButton } from '@dalim/core/components/common/share-button'
import { Button } from '@dalim/core/ui/button'
import { useSession } from 'next-auth/react'

interface FontType {
    id: string
    viewCount: number
    downloadCount: number
    userId: string
}

interface GraphicType {
    id: string
    viewCount: number
    downloadCount: number
    userId: string
}

type UserType = {
    graphics: GraphicType[]
    fonts: FontType[]
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
    const session = useSession()
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
        <div className="-mx-6 mb-6">
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

            <div className="relative z-10 mx-auto -mt-40 max-w-4xl px-6 md:-mt-20">
                <div className="space-y-3">
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
                                    <div className='flex gap-2 items-center'>
                                        <Link href={session ? '/dashboard/chats' : `/login`}>
                                            <Button>{session ? 'Message' : 'Message'}</Button>
                                        </Link>
                                        <ShareButton
                                            url={`/${user.username}`}
                                            title={`${user.name || user.username}'s Profile`}
                                            description={user.bio || `Check out ${user.name || user.username}'s amazing work!`}
                                            image={user.image || undefined}
                                            type="profile"
                                            variant="ghost"
                                            size="icon"
                                            showText={false}
                                        />
                                    </div>
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
                            <Separator className="mb-4 mt-6" />
                            <div className="flex justify-between">
                                <div className="flex items-center gap-1">
                                    <p className="text-primary/60 text-sm">Fonts</p>
                                    <h1 className="text-brand font-semibold">{user.fonts.length}</h1>
                                </div>
                                <div className="flex items-center gap-1">
                                    <p className="text-primary/60 text-sm">Graphic</p>
                                    <h1 className="text-brand font-semibold">{user.graphics.length}</h1>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
