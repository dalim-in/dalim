import { Card, CardContent, CardHeader } from '@dalim/core/ui/card' 
import { Button } from '@dalim/core/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Globe, Twitter, Instagram, Linkedin, Calendar  } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type User = {
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
}

interface UserCardProps {
    user: User
}

export function UserCard({ user }: UserCardProps) {
    const displayName = user.name || user.username || 'Anonymous User'
    const initials = displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    })

    const socialLinks = [
        { icon: Globe, url: user.website, label: 'Website' },
        { icon: Twitter, url: user.twitter ? `https://twitter.com/${user.twitter}` : null, label: 'Twitter' },
        { icon: Instagram, url: user.instagram ? `https://instagram.com/${user.instagram}` : null, label: 'Instagram' },
        { icon: Linkedin, url: user.linkedin ? `https://linkedin.com/in/${user.linkedin}` : null, label: 'LinkedIn' },
    ].filter((link) => link.url)

    return (
        <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg">
            
            {user.coverImage && (
                <div className="relative -mt-6 h-24 overflow-hidden bg-brand ">
                    <Image
                        width={100}
                        height={100}
                        src={user.coverImage || '/placeholder.svg'}
                        alt="Cover"
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            {!user.coverImage && <div className="h-24 -mt-6 bg-brand" />}

            <CardHeader className="relative pb-2">
                {/* Avatar */}
                <div className="absolute -top-12 left-4">
                    <Avatar className="border-background rounded-xl h-16 w-16 border-4">
                        <AvatarImage
                            src={user.image || undefined}
                            alt={displayName}
                        />
                        <AvatarFallback className="text-lg rounded font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                </div>
 
                <div className="pt-8">
                    <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-lg font-semibold">{displayName}</h3>
                            {user.username && <p className="text-muted-foreground text-sm">@{user.username}</p>}
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Bio/Summary */}
                {(user.bio || user.summary) && <p className="text-muted-foreground line-clamp-3 text-sm">{user.bio || user.summary}</p>}

                {/* Social Links */}
                {socialLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {socialLinks.map((link, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                asChild>
                                <Link
                                    href={link.url!}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <link.icon className="h-4 w-4" />
                                    <span className="sr-only">{link.label}</span>
                                </Link>
                            </Button>
                        ))}
                    </div>
                )}

                {/* Join Date */}
                <div className="text-muted-foreground flex items-center gap-2 border-t pt-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {joinDate}</span>
                </div>

                {/* View Profile Button */}
                <Button
                    variant="outline"
                    className="w-full"
                    asChild>
                    <Link href={`/${user.username || user.id}`}>View Profile</Link>
                </Button>
            </CardContent>
        </Card>
    )
}
