"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@dalim/core/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@dalim/core/ui/avatar"
import { Badge } from "@dalim/core/ui/badge"
import { ScrollArea } from "@dalim/core/ui/scroll-area"
import { Button } from "@dalim/core/ui/button"
import { MessageCircle } from "lucide-react"
import type { Conversation, User } from "@/src/types/chat"

interface ConversationListProps {
  onConversationSelect: (conversation: Conversation) => void
  selectedConversationId?: string
}

export function ConversationList({ onConversationSelect, selectedConversationId }: ConversationListProps) {
  const { data: session } = useSession()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showNewChatDialog, setShowNewChatDialog] = useState(false)

  useEffect(() => {
    fetchConversations()
    fetchUsers()
  }, [])

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/chat/conversations")
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const startDirectConversation = async (otherUserId: string) => {
    try {
      const response = await fetch("/api/chat/conversations/direct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otherUserId }),
      })

      if (response.ok) {
        const conversation = await response.json()
        onConversationSelect(conversation)
        setShowNewChatDialog(false)
        await fetchConversations()
      }
    } catch (error) {
      console.error("Error starting conversation:", error)
    }
  }

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find((p) => p.userId !== session?.user?.id)?.user
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Conversations</h3>
          <Button size="sm" onClick={() => setShowNewChatDialog(!showNewChatDialog)}>
            <MessageCircle className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {showNewChatDialog && (
        <div className="p-4 border-b bg-background">
          <h4 className="font-medium mb-2">Start a conversation</h4>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted cursor-pointer"
                  onClick={() => startDirectConversation(user.id)}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"} className="text-xs">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {conversations.map((conversation) => {
            const otherParticipant = getOtherParticipant(conversation)
            const lastMessage = conversation.messages[0]

            return (
              <Card
                key={conversation.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedConversationId === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => onConversationSelect(conversation)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={otherParticipant?.image || undefined} />
                      <AvatarFallback>{otherParticipant?.name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{otherParticipant?.name || "Unknown User"}</p>
                        <Badge
                          variant={otherParticipant?.role === "ADMIN" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {otherParticipant?.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {lastMessage?.content || "No messages yet"}
                      </p>
                      {lastMessage && (
                        <p className="text-xs text-muted-foreground">{formatTime(lastMessage.createdAt)}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
