"use client"

import { useState, useEffect } from "react"
import { Button } from "@dalim/core/ui/button"
import { Badge } from "@dalim/core/ui/badge"
import { ScrollArea } from "@dalim/core/ui/scroll-area"
import { Card, CardContent } from "@dalim/core/ui/card"
import { MessageCircle, Bell, Check, CheckCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Notification } from "@/src/types/chat"


export function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications")
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: "PATCH",
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
      }
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.isRead)

    await Promise.all(unreadNotifications.map((notification) => markAsRead(notification.id)))
  }

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id)
    }

    // Handle navigation based on notification type
    if (notification.type === "NEW_MESSAGE" && notification.data?.conversationId) {
      router.push(`/dashboard/chat?conversationId=${notification.data.conversationId}`)
    } else if (notification.type === "CONVERSATION_STATUS_CHANGED" && notification.data?.conversationId) {
      router.push(`/dashboard/chat?conversationId=${notification.data.conversationId}`)
    }
  }

  const formatTime = (dateString: string) => {
    const now = new Date()
    const notificationTime = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "NEW_MESSAGE":
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case "CONVERSATION_STATUS_CHANGED":
        return <Bell className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  if (loading) {
    return <div className="p-8 text-center">Loading notifications...</div>
  }

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{unreadCount} unread notifications</Badge>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      )}

      <ScrollArea className="h-[794px]">
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="p-2 text-center text-muted-foreground">No notifications yet</div>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  !notification.isRead ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{notification.title}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{formatTime(notification.createdAt)}</span>
                          {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {notification.content && (
                        <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
                      )}
                      <Badge variant="outline" className="text-xs mt-2">
                        {notification.type.replace("_", " ").toLowerCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}