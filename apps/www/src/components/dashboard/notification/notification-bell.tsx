'use client'

import { useState, useEffect } from 'react'
import { Button } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@dalim/core/ui/dropdown-menu'
import { ScrollArea } from '@dalim/core/ui/scroll-area'
import { Bell, Check } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { useRouter } from 'next/navigation'
import type { Notification } from '@/src/types/chat'
import { DALIM_URL } from '@dalim/auth'

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetchNotifications()
        fetchUnreadCount()

        // Poll for new notifications every 30 seconds
        const interval = setInterval(() => {
            fetchNotifications()
            fetchUnreadCount()
        }, 30000)

        return () => clearInterval(interval)
    }, [])

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${DALIM_URL}/api/notifications`)
            if (response.ok) {
                const data = await response.json()
                setNotifications(data)
            }
        } catch (error) {
            console.error('Error fetching notifications:', error)
        }
    }

    const fetchUnreadCount = async () => {
        try {
            const response = await fetch(`${DALIM_URL}/api/notifications/unread-count`)
            if (response.ok) {
                const data = await response.json()
                setUnreadCount(data.count)
            }
        } catch (error) {
            console.error('Error fetching unread count:', error)
        }
    }

    const markAsRead = async (notificationId: string) => {
        try {
            const response = await fetch(`${DALIM_URL}/api/notifications/${notificationId}/read`, {
                method: 'PATCH',
            })

            if (response.ok) {
                setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
                setUnreadCount((prev) => Math.max(0, prev - 1))
            }
        } catch (error) {
            console.error('Error marking notification as read:', error)
        }
    }

    const handleNotificationClick = async (notification: Notification) => {
        if (!notification.isRead) {
            await markAsRead(notification.id)
        }

        // Handle navigation based on notification type
        if (notification.type === 'NEW_MESSAGE' && notification.data?.conversationId) {
            router.push(`${DALIM_URL}/dashboard/chats?conversationId=${notification.data.conversationId}`)
        } else if (notification.type === 'CONVERSATION_STATUS_CHANGED' && notification.data?.conversationId) {
            router.push(`${DALIM_URL}/dashboard/chats?conversationId=${notification.data.conversationId}`)
        }

        setIsOpen(false)
    }

    const formatTime = (dateString: string) => {
        const now = new Date()
        const notificationTime = new Date(dateString)
        const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60))

        if (diffInMinutes < 1) return 'Just now'
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
        return `${Math.floor(diffInMinutes / 1440)}d ago`
    }

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'NEW_MESSAGE':
                return (
                    <Avatar className="h-9 w-9 border">
                        <AvatarImage
                            src={'/placeholder.svg'}
                            alt={'User'}
                        />
                        <AvatarFallback>{'A'}</AvatarFallback>
                    </Avatar>
                )
            case 'CONVERSATION_STATUS_CHANGED':
                return <Bell className="h-4 w-4 text-orange-500" />
            default:
                return <Bell className="h-4 w-4 text-gray-500" />
        }
    }

    return (
        <DropdownMenu
            open={isOpen}
            onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
                className="ml-1"
                asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs text-white">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && <Badge variant="secondary">{unreadCount} new</Badge>}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <ScrollArea className="h-[400px]">
                    {notifications.length === 0 ? (
                        <div className="text-muted-foreground p-4 text-center">No notifications yet</div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex cursor-pointer items-start space-x-3 p-3"
                                onClick={() => handleNotificationClick(notification)}>
                                <div className="mt-1 flex-shrink-0">{getNotificationIcon(notification.type)}</div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-medium">{notification.title}</p>
                                        <div className="flex items-center space-x-1">
                                            {!notification.isRead && <div className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 w-6 p-0"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    markAsRead(notification.id)
                                                }}>
                                                <Check className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mt-1 text-xs">{notification.content}</p>
                                    <p className="text-muted-foreground mt-1 text-xs">{formatTime(notification.createdAt)}</p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </ScrollArea>

                {notifications.length > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-muted-foreground cursor-pointer text-center text-sm"
                            onClick={() => {
                                router.push('/dashboard/notifications')
                                setIsOpen(false)
                            }}>
                            View all notifications
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
