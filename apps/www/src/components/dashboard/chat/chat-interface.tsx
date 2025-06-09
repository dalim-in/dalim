"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@dalim/core/ui/button"
import { Input } from "@dalim/core/ui/input" 

import { Avatar, AvatarFallback, AvatarImage } from "@dalim/core/ui/avatar"
import { Badge } from "@dalim/core/ui/badge"
import { ScrollArea } from "@dalim/core/ui/scroll-area"
import { Send, Paperclip, ImageIcon, File, X, MessageCircle, MoreHorizontal, CheckCircle, Archive, Trash2, AlertTriangle, Plus } from "lucide-react"
import { toast } from "sonner"
import type { Conversation, User } from "@/src/types/chat"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@dalim/core/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@dalim/core/ui/alert-dialog"
import { MessageActions } from "./message-actions"
import { CldImage } from "@dalim/core/components/common/gallery"


interface ChatInterfaceProps {
  conversationId?: string
  className?: string  
}

export function ChatInterface({ conversationId, className }: ChatInterfaceProps) {
  const { data: session } = useSession()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [showNewChatDialog, setShowNewChatDialog] = useState(false) 
  const [, setAdmins] = useState<User[]>([])
  const [statusLoading, setStatusLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchConversations()
    fetchUsers()
    fetchAdmins()
  }, [])

  useEffect(() => {
    if (conversationId) {
      fetchConversation(conversationId)
    }
  }, [conversationId])
 
  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/chat/conversations")
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
        if (data.length > 0 && !selectedConversation && !conversationId) {
          setSelectedConversation(data[0])
        }
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
      toast.error("Failed to load conversations")
    }
  }

  const fetchConversation = async (id: string) => {
    try {
      const response = await fetch(`/api/chat/conversations/${id}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedConversation(data)
      }
    } catch (error) {
      console.error("Error fetching conversation:", error)
      toast.error("Failed to load conversation")
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

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/users?role=admin")
      if (response.ok) {
        const data = await response.json()
        setAdmins(data)
      }
    } catch (error) {
      console.error("Error fetching admins:", error)
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
        setSelectedConversation(conversation)
        setShowNewChatDialog(false)
        await fetchConversations()
        toast.success("Conversation started")
      }
    } catch (error) {
      console.error("Error starting conversation:", error)
      toast.error("Failed to start conversation")
    }
  }

  const sendMessage = async () => {
    if (!selectedConversation || (!message.trim() && attachments.length === 0)) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("conversationId", selectedConversation.id)
      formData.append("content", message)

      attachments.forEach((file) => {
        formData.append("attachments", file)
      })

      const response = await fetch("/api/chat/messages", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const newMessage = await response.json()
        setSelectedConversation((prev) =>
          prev
            ? {
                ...prev,
                messages: [...prev.messages, newMessage],
              }
            : null,
        )
        setMessage("")
        setAttachments([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        await fetchConversations()
        toast.success("Message sent")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const updateConversationStatus = async (conversationId: string, status: "ACTIVE" | "CLOSED" | "ARCHIVED") => {
    try {
      setStatusLoading(true)
      const response = await fetch(`/api/chat/conversations/${conversationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setSelectedConversation((prev) => (prev ? { ...prev, status } : null))
        await fetchConversations()
        toast.success(`Conversation ${status.toLowerCase()}`)
      } else {
        toast.error("Failed to update conversation status")
      }
    } catch (error) {
      console.error("Error updating conversation status:", error)
      toast.error("Failed to update conversation status")
    } finally {
      setStatusLoading(false)
    }
  }

  const deleteConversation = async (conversationId: string) => {
    try {
      setDeleteLoading(true)
      const response = await fetch(`/api/chat/conversations/${conversationId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Remove from conversations list
        setConversations((prev) => prev.filter((c) => c.id !== conversationId))

        // Clear selected conversation if it was deleted
        if (selectedConversation?.id === conversationId) {
          setSelectedConversation(null)
        }

        setShowDeleteDialog(false)
        toast.success("Conversation deleted successfully")
      } else {
        toast.error("Failed to delete conversation")
      }
    } catch (error) {
      console.error("Error deleting conversation:", error)
      toast.error("Failed to delete conversation")
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleMessageDeleted = (messageId: string) => {
    setSelectedConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: prev.messages.filter((msg) => msg.id !== messageId),
          }
        : null,
    )
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const isCurrentUser = (senderId: string) => {
    return senderId === session?.user?.id
  }

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find((p) => p.userId !== session?.user?.id)?.user
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderAttachment = (attachment: any) => {
    const isImage = attachment.fileType.startsWith("image/")

    if (isImage) {
      return ( 
        <CldImage
          src={attachment.fileUrl || "/placeholder.svg"}
          alt={attachment.fileName}
          width={100}
          height={100}
          className="max-w-xs max-h-48 rounded-lg cursor-pointer"
          onClick={() => window.open(attachment.fileUrl, "_blank")}
        />
      )
    }

    return (
      <div className="flex items-center space-x-2 max-w-xs">
        <File className="h-4 w-4" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{attachment.fileName}</p>
          <p className="text-xs text-muted-foreground">{(attachment.fileSize / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => window.open(attachment.fileUrl, "_blank")}>
          Download
        </Button>
      </div>
    )
  }

  return (
    <div className={`flex h-[840px] border rounded-lg overflow-hidden ${className}`}>
      
      <div className="w-1/3 border-r bg-muted/30">
        <div className="p-2 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold pl-2">Chats</h3>
            <div className="flex space-x-2">
              
              <Button size="icon" onClick={() => setShowNewChatDialog(!showNewChatDialog)}>
                <Plus/> 
              </Button>
            </div>
          </div>
        </div>

        {showNewChatDialog && (
          <div className="p-2 border-b bg-background"> 
            <ScrollArea className="h-64">
              <div className="space-y-1">
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
                    <div className="flex w-full justify-between gap-2">
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

         

        <ScrollArea className="h-[calc(100%-80px)]">
          <div className="p-2 space-y-1">
            {conversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation)
              const lastMessage = conversation.messages[0]

              return (
                <div
                  key={conversation.id}
                  className={`cursor-pointer rounded-lg transition-colors hover:bg-muted/50 ${
                    selectedConversation?.id === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="p-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 border w-10">
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
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <> 
            <div className="p-2 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="border h-9 w-9">
                    <AvatarImage src={getOtherParticipant(selectedConversation)?.image || undefined} />
                    <AvatarFallback>{getOtherParticipant(selectedConversation)?.name?.charAt(0) || "?"}</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-3 w-full">
                    <h4 className="font-semibold">
                      {getOtherParticipant(selectedConversation)?.name || "Unknown User"}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={getOtherParticipant(selectedConversation)?.role === "ADMIN" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {getOtherParticipant(selectedConversation)?.role}
                      </Badge>
                      <Badge
                        variant={
                          selectedConversation.status === "ACTIVE"
                            ? "default"
                            : selectedConversation.status === "CLOSED"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {selectedConversation.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Conversation Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={statusLoading}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="opacity-50">Chat Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {selectedConversation.status !== "ACTIVE" && (
                      <DropdownMenuItem onClick={() => updateConversationStatus(selectedConversation.id, "ACTIVE")}>
                        <CheckCircle className="h-4 w-4" />
                        Reopen
                      </DropdownMenuItem>
                    )}

                    {selectedConversation.status !== "CLOSED" && (
                      <DropdownMenuItem onClick={() => updateConversationStatus(selectedConversation.id, "CLOSED")}>
                        <X className="h-4 w-4 " />
                        Close
                      </DropdownMenuItem>
                    )}

                    {selectedConversation.status !== "ARCHIVED" && (
                      <DropdownMenuItem onClick={() => updateConversationStatus(selectedConversation.id, "ARCHIVED")}>
                        <Archive className="h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Chat
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            <span>Delete Chat</span>
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this chat? This action cannot be undone. All
                            messages and attachments will be permanently removed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteConversation(selectedConversation!.id)}
                            disabled={deleteLoading}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {deleteLoading ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 h-[400px] p-4">
              <div className="space-y-1">
                {selectedConversation.messages.map((msg, index) => {
                  const showDate =
                    index === 0 ||
                    formatDate(msg.createdAt) !== formatDate(selectedConversation.messages[index - 1].createdAt)

                  return (
                    <div key={msg.id}>
                      {showDate && (
                        <div className="flex justify-center my-2">
                          <Badge variant="outline" className="text-xs">
                            {formatDate(msg.createdAt)}
                          </Badge>
                        </div>
                      )}

                      <div className={`flex ${isCurrentUser(msg.sender.id) ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] rounded-lg p-3 group relative ${
                            isCurrentUser(msg.sender.id) ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {isCurrentUser(msg.sender.id) && (
                            <div className="absolute -top-2 -left-2">
                              <MessageActions
                                message={msg}
                                isCurrentUser={isCurrentUser(msg.sender.id)}
                                onMessageDeleted={handleMessageDeleted}
                              />
                            </div>
                          )}
                          {!isCurrentUser(msg.sender.id) && (
                            <p className="text-xs font-medium mb-1">{msg.sender.name}</p>
                          )}

                          {msg.content && <p className="text-sm whitespace-pre-wrap">{msg.content}</p>}

                          {msg.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {msg.attachments.map((attachment, attachmentIndex) => (
                                <div key={attachmentIndex}>{renderAttachment(attachment)}</div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">{formatTime(msg.createdAt)}</span>
                            {msg.readAt && (
                              <Badge variant="secondary" className="text-xs">
                                Read
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              {attachments.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-muted px-4 p-2 rounded-lg">
                      {file.type.startsWith("image/") ? (
                        <ImageIcon className="h-4 w-4" />
                      ) : (
                        <File className="h-4 w-4" />
                      )}
                      <span className="text-sm truncate max-w-32">{file.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className=""
                  />
                </div>

                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />

                <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="h-4 w-4" />
                </Button>

                <Button size={'icon'} onClick={sendMessage} disabled={loading || (!message.trim() && attachments.length === 0)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Chat Selected</h3>
              <p className="text-muted-foreground">Select a Chat to start messaging or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}