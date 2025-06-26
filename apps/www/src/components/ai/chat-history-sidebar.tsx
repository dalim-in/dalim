/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@dalim/core/ui/button" 
import { Badge } from "@dalim/core/ui/badge"
import { Plus, Trash2, MessageSquare, Clock, Globe, Lock } from "lucide-react"
import { getUserDesignChats, deleteDesignChat, toggleChatPrivacy } from "@/src/actions/design-chat"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"

interface DesignChat {
  id: string
  title: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  upvotes: number
  downvotes: number
  viewCount: number
  _count: {
    messages: number
  }
}

interface ChatHistorySidebarProps {
  onSelectChat: (chatId: string) => void
  onNewChat: () => void
  selectedChatId?: string | null
}

export function ChatHistorySidebar({ onSelectChat, onNewChat, selectedChatId }: ChatHistorySidebarProps) {
  const [chats, setChats] = useState<DesignChat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChats()
  }, [])

  const loadChats = async () => {
    try {
      const userChats = await getUserDesignChats()
      setChats(userChats as DesignChat[])
    } catch (error) {
      toast.error("Failed to load chat history")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (!confirm("Are you sure you want to delete this chat?")) {
      return
    }

    try {
      await deleteDesignChat(chatId)
      setChats(chats.filter((chat) => chat.id !== chatId))
      toast.success("Chat deleted successfully")
    } catch (error) {
      toast.error("Failed to delete chat")
    }
  }

  const handleTogglePrivacy = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      const updatedChat = await toggleChatPrivacy(chatId)
      setChats(chats.map((chat) => (chat.id === chatId ? { ...chat, isPublic: updatedChat.isPublic } : chat)))
      toast.success(`Chat is now ${updatedChat.isPublic ? "public" : "private"}`)
    } catch (error) {
      toast.error("Failed to update chat privacy")
    }
  }

  if (loading) {
    return (
      <div className="p-1">
        <div className="animate-pulse space-y-2">
          <div className="h-12 rounded"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 w-full border rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-1 h-auto overflow-y-auto">
      <div className="flex justify-center md:justify-start items-center gap-3 mb-6"> 
        <div> 
          <p className="text-sm text-slate-500">{chats.length} conversations</p>
        </div>
      </div>

      <Button
        onClick={onNewChat}
        className=" mb-2" 
      >
        <Plus className="w-4 h-4 " />
        New Design Chat
      </Button>

      <div className="space-y-2">
        {chats.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No design chats yet</p>
            <p className="text-sm">Start your first conversation!</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`cursor-pointer border p-3 rounded-md transition-all hover:shadow-md ${
                selectedChatId === chat.id
                  ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm line-clamp-2 flex-1">{chat.title}</h3>
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => handleTogglePrivacy(chat.id, e)}
                    >
                      {chat.isPublic ? (
                        <Globe className="w-3 h-3 text-green-600" />
                      ) : (
                        <Lock className="w-3 h-3 text-slate-500" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs truncate">
                      {chat._count.messages} messages
                    </Badge>
                    {chat.isPublic && (
                      <Badge variant="outline" className="text-xs truncate">
                        {chat.upvotes - chat.downvotes} votes
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
