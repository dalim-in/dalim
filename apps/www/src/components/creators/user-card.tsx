import { Button } from '@dalim/core/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Globe, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '@dalim/core/ui/separator'
import { User } from '@/src/types/user'

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

    const socialLinks = [
        { icon: Globe, url: user.website, label: 'Website' },
        { icon: Twitter, url: user.twitter ? `https://twitter.com/${user.twitter}` : null, label: 'Twitter' },
        { icon: Instagram, url: user.instagram ? `https://instagram.com/${user.instagram}` : null, label: 'Instagram' },
        { icon: Linkedin, url: user.linkedin ? `https://linkedin.com/in/${user.linkedin}` : null, label: 'LinkedIn' },
    ].filter((link) => link.url)

    return (
        <div className="group h-full overflow-hidden rounded-3xl border p-3 transition-all duration-200 hover:shadow-lg dark:hover:bg-neutral-900">
            <div className="relative flex md:items-center justify-between gap-3">
                <div className="grid md:flex items-center gap-3">
                    <div className="">
                        <Avatar className="border-primary/20 h-20 w-20 rounded-lg border">
                            <AvatarImage
                                src={user.image || undefined}
                                alt={displayName}
                            />
                            <AvatarFallback className="rounded text-lg font-semibold">{initials}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="">
                        <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-lg font-semibold">{displayName}</h3>
                                {user.username && <p className="text-muted-foreground text-sm">{user.username}</p>}
                            </div>
                        </div>
                        <div>{(user.bio || user.summary) && <p className="text-muted-foreground line-clamp-3 text-sm">{user.bio || user.summary}</p>}</div>
                    </div>
                </div>
                <div className="grid gap-2 md:px-3">
                    {socialLinks.length > 0 && (
                        <div className="flex flex-wrap justify-end gap-1">
                            {socialLinks.map((link, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                    asChild>
                                    <Link
                                        href={link.url!}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <link.icon className="h-3 w-3" />
                                        <span className="sr-only">{link.label}</span>
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-1 text-xs">
                        Fonts:<span className="text-sm font-semibold">{user.fonts.length}</span>
                    </div>
                    <Link href={`/${user.username || user.id}`}>
                        <Button variant={"outline"} size={'sm'}>View Creator</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
