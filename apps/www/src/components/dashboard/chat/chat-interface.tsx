'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Badge } from '@dalim/core/ui/badge'
import { ScrollArea } from '@dalim/core/ui/scroll-area'
import { Send, Paperclip, ImageIcon, File, X, MessageCircle, MoreHorizontal, CheckCircle, Archive, Trash2, AlertTriangle, Plus, Download, UserCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { Conversation, User } from '@/src/types/chat'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@dalim/core/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@dalim/core/ui/alert-dialog'
import { MessageActions } from './message-actions'
import { CldImage } from '@dalim/core/components/common/gallery'
import Link from 'next/link'

interface ChatInterfaceProps {
    conversationId?: string
    className?: string
}

export function ChatInterface({ conversationId, className }: ChatInterfaceProps) {
    const { data: session } = useSession() ?? {}

    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
    const [message, setMessage] = useState('')
    const [attachments, setAttachments] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [showNewChatDialog, setShowNewChatDialog] = useState(false)
    const [, setAdmins] = useState<User[]>([])
    const [statusLoading, setStatusLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        scrollToBottom()
    }, [selectedConversation?.messages])

    const fetchConversations = async () => {
        try {
            const response = await fetch('/api/chat/conversations')
            if (response.ok) {
                const data = await response.json()
                setConversations(data)
                if (data.length > 0 && !selectedConversation && !conversationId) {
                    setSelectedConversation(data[0])
                }
            }
        } catch (error) {
            console.error('Error fetching conversations:', error)
            toast.error('Failed to load conversations')
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
            console.error('Error fetching conversation:', error)
            toast.error('Failed to load conversation')
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users')
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            }
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const fetchAdmins = async () => {
        try {
            const response = await fetch('/api/users?role=admin')
            if (response.ok) {
                const data = await response.json()
                setAdmins(data)
            }
        } catch (error) {
            console.error('Error fetching admins:', error)
        }
    }

    const startDirectConversation = async (otherUserId: string) => {
        try {
            const response = await fetch('/api/chat/conversations/direct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otherUserId }),
            })

            if (response.ok) {
                const conversation = await response.json()
                setSelectedConversation(conversation)
                setShowNewChatDialog(false)
                await fetchConversations()
                toast.success('Conversation started')
            }
        } catch (error) {
            console.error('Error starting conversation:', error)
            toast.error('Failed to start conversation')
        }
    }

    const sendMessage = async () => {
        if (!selectedConversation || (!message.trim() && attachments.length === 0)) return

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('conversationId', selectedConversation.id)
            formData.append('content', message)

            attachments.forEach((file) => {
                formData.append('attachments', file)
            })

            const response = await fetch('/api/chat/messages', {
                method: 'POST',
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
                        : null
                )
                setMessage('')
                setAttachments([])
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }
                await fetchConversations()
                toast.success('Message sent')
                setTimeout(scrollToBottom, 100)
            }
        } catch (error) {
            console.error('Error sending message:', error)
            toast.error('Failed to send message')
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
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

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight
            }
        }
    }

    const updateConversationStatus = async (conversationId: string, status: 'ACTIVE' | 'CLOSED' | 'ARCHIVED') => {
        try {
            setStatusLoading(true)
            const response = await fetch(`/api/chat/conversations/${conversationId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            })

            if (response.ok) {
                setSelectedConversation((prev) => (prev ? { ...prev, status } : null))
                await fetchConversations()
                toast.success(`Conversation ${status.toLowerCase()}`)
            } else {
                toast.error('Failed to update conversation status')
            }
        } catch (error) {
            console.error('Error updating conversation status:', error)
            toast.error('Failed to update conversation status')
        } finally {
            setStatusLoading(false)
        }
    }

    const deleteConversation = async (conversationId: string) => {
        try {
            setDeleteLoading(true)
            const response = await fetch(`/api/chat/conversations/${conversationId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                // Remove from conversations list
                setConversations((prev) => prev.filter((c) => c.id !== conversationId))

                // Clear selected conversation if it was deleted
                if (selectedConversation?.id === conversationId) {
                    setSelectedConversation(null)
                }

                setShowDeleteDialog(false)
                toast.success('Conversation deleted successfully')
            } else {
                toast.error('Failed to delete conversation')
            }
        } catch (error) {
            console.error('Error deleting conversation:', error)
            toast.error('Failed to delete conversation')
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
                : null
        )
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (date.toDateString() === today.toDateString()) {
            return 'Today'
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday'
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

    const downloadFile = async (fileUrl: string, fileName: string) => {
        try {
            const response = await fetch(fileUrl)
            const blob = await response.blob()

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob)

            // Create a temporary anchor element and trigger download
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()

            // Clean up
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            toast.success('File downloaded successfully')
        } catch (error) {
            console.error('Download failed:', error)
            toast.error('Failed to download file')
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderAttachment = (attachment: any) => {
        const isImage = attachment.fileType.startsWith('image/')

        if (isImage) {
            return (
                <CldImage
                    src={attachment.fileUrl || '/placeholder.svg'}
                    alt={attachment.fileName}
                    width={100}
                    height={100}
                    className="max-h-48 max-w-xs cursor-pointer rounded-lg"
                    onClick={() => window.open(attachment.fileUrl, '_blank')}
                />
            )
        }

        return (
            <div className="flex max-w-xs items-center space-x-2 rounded-lg p-2">
                <File className="h-4 w-4" />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{attachment.fileName}</p>
                    <p className="text-muted-foreground text-xs">{(attachment.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button
                    variant={'outline'}
                    size="icon"
                    onClick={() => downloadFile(attachment.fileUrl, attachment.fileName)}>
                    <Download className="text-black dark:text-white" />
                </Button>
            </div>
        )
    }

    return (
        <div className={`flex h-[840px] overflow-hidden rounded-lg border ${className}`}>
            <div className="bg-muted/30 w-1/3 border-r">
                <div className="border-b p-2">
                    <div className="flex items-center justify-between">
                        <h3 className="pl-2 font-semibold">Chats</h3>
                        <div className="flex space-x-2">
                            <Button
                                size="icon"
                                onClick={() => setShowNewChatDialog(!showNewChatDialog)}>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                </div>

                {showNewChatDialog && (
                    <div className="bg-background border-b p-2">
                        <ScrollArea className="h-64">
                            <div className="space-y-1">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="hover:bg-muted flex cursor-pointer items-center space-x-2 rounded-lg p-2"
                                        onClick={() => startDirectConversation(user.id)}>
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={user.image || undefined} />
                                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex w-full justify-between gap-2">
                                            <p className="truncate text-sm font-medium">{user.name}</p>
                                            <Badge
                                                variant={user.role === 'ADMIN' ? 'default' : 'secondary'}
                                                className="text-xs">
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
                    <div className="space-y-1 p-2">
                        {conversations.map((conversation) => {
                            const otherParticipant = getOtherParticipant(conversation)
                            const lastMessage = conversation.messages[0]

                            return (
                                <div
                                    key={conversation.id}
                                    className={`hover:bg-muted/50 cursor-pointer rounded-lg transition-colors ${selectedConversation?.id === conversation.id ? 'bg-muted' : ''}`}
                                    onClick={() => setSelectedConversation(conversation)}>
                                    <div className="p-3">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-10 w-10 border">
                                                <AvatarImage src={otherParticipant?.image || undefined} />
                                                <AvatarFallback>{otherParticipant?.name?.charAt(0) || '?'}</AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="truncate text-sm font-medium">{otherParticipant?.name || 'Unknown User'}</p>
                                                    <Badge
                                                        variant={otherParticipant?.role === 'ADMIN' ? 'default' : 'secondary'}
                                                        className="text-xs">
                                                        {otherParticipant?.role}
                                                    </Badge>
                                                </div>
                                                <p className="text-muted-foreground truncate text-xs">{lastMessage?.content || 'No messages yet'}</p>
                                                {lastMessage && <p className="text-muted-foreground text-xs">{formatTime(lastMessage.createdAt)}</p>}
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
            <div className="flex flex-1 flex-col">
                {selectedConversation ? (
                    <>
                        <div className="bg-muted/30 border-b p-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-9 w-9 border">
                                        <AvatarImage src={getOtherParticipant(selectedConversation)?.image || undefined} />
                                        <AvatarFallback>{getOtherParticipant(selectedConversation)?.name?.charAt(0) || '?'}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex w-full gap-3">
                                        <h4 className="font-semibold">{getOtherParticipant(selectedConversation)?.name || 'Unknown User'}</h4>
                                        <div className="flex items-center space-x-2">
                                            <Badge
                                                variant={getOtherParticipant(selectedConversation)?.role === 'ADMIN' ? 'default' : 'secondary'}
                                                className="text-xs">
                                                {getOtherParticipant(selectedConversation)?.role}
                                            </Badge>
                                            <Badge
                                                variant={selectedConversation.status === 'ACTIVE' ? 'default' : selectedConversation.status === 'CLOSED' ? 'destructive' : 'secondary'}
                                                className="text-xs">
                                                {selectedConversation.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            disabled={statusLoading}>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Link
                                                className="flex items-center gap-2"
                                                href={`/${getOtherParticipant(selectedConversation)?.username}`}>
                                                <UserCircle className="h-4 w-4" />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />

                                        {selectedConversation.status !== 'ACTIVE' && (
                                            <DropdownMenuItem onClick={() => updateConversationStatus(selectedConversation.id, 'ACTIVE')}>
                                                <CheckCircle className="h-4 w-4" />
                                                Reopen
                                            </DropdownMenuItem>
                                        )}

                                        {selectedConversation.status !== 'CLOSED' && (
                                            <DropdownMenuItem onClick={() => updateConversationStatus(selectedConversation.id, 'CLOSED')}>
                                                <X className="h-4 w-4" />
                                                Close
                                            </DropdownMenuItem>
                                        )}

                                        {selectedConversation.status !== 'ARCHIVED' && (
                                            <DropdownMenuItem onClick={() => updateConversationStatus(selectedConversation.id, 'ARCHIVED')}>
                                                <Archive className="h-4 w-4" />
                                                Archive
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <AlertDialog
                                            open={showDeleteDialog}
                                            onOpenChange={setShowDeleteDialog}>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onSelect={(e) => e.preventDefault()}>
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete Chat
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="flex items-center space-x-2">
                                                        <AlertTriangle className="text-destructive h-5 w-5" />
                                                        <span>Delete Chat</span>
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>Are you sure you want to delete this chat? This action cannot be undone. All messages and attachments will be permanently removed.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => deleteConversation(selectedConversation!.id)}
                                                        disabled={deleteLoading}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                        {deleteLoading ? 'Deleting...' : 'Delete'}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Messages */}
                        <ScrollArea
                            className="flex-1 overflow-y-auto p-4"
                            ref={scrollAreaRef}>
                            <div className="space-y-1">
                                {selectedConversation.messages.map((msg, index) => {
                                    const showDate = index === 0 || formatDate(msg.createdAt) !== formatDate(selectedConversation.messages[index - 1].createdAt)

                                    return (
                                        <div key={msg.id}>
                                            {showDate && (
                                                <div className="my-2 flex justify-center">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs">
                                                        {formatDate(msg.createdAt)}
                                                    </Badge>
                                                </div>
                                            )}

                                            <div className={`flex ${isCurrentUser(msg.sender.id) ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`group relative max-w-[70%] rounded-lg p-3 ${isCurrentUser(msg.sender.id) ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                    {isCurrentUser(msg.sender.id) && (
                                                        <div className="absolute -left-2 -top-2">
                                                            <MessageActions
                                                                message={msg}
                                                                isCurrentUser={isCurrentUser(msg.sender.id)}
                                                                onMessageDeleted={handleMessageDeleted}
                                                            />
                                                        </div>
                                                    )}
                                                    {!isCurrentUser(msg.sender.id) && <p className="mb-1 text-xs font-medium">{msg.sender.name}</p>}

                                                    {msg.content && <p className="whitespace-pre-wrap text-sm">{msg.content}</p>}

                                                    {msg.attachments.length > 0 && (
                                                        <div className="mt-2 space-y-2">
                                                            {msg.attachments.map((attachment, attachmentIndex) => (
                                                                <div key={attachmentIndex}>{renderAttachment(attachment)}</div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-xs opacity-70">{formatTime(msg.createdAt)}</span>
                                                        {msg.readAt && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-xs">
                                                                Read
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>

                        <div className="border-t p-4">
                            {attachments.length > 0 && (
                                <div className="mb-2 flex flex-wrap gap-2">
                                    {attachments.map((file, index) => (
                                        <div
                                            key={index}
                                            className="bg-muted flex items-center space-x-2 rounded-lg p-2 px-4">
                                            {file.type.startsWith('image/') ? <ImageIcon className="h-4 w-4" /> : <File className="h-4 w-4" />}
                                            <span className="max-w-32 truncate text-sm">{file.name}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeAttachment(index)}>
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

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => fileInputRef.current?.click()}>
                                    <Paperclip className="h-4 w-4" />
                                </Button>

                                <Button
                                    size={'icon'}
                                    onClick={sendMessage}
                                    disabled={loading || (!message.trim() && attachments.length === 0)}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center">
                        <div className="text-center">
                            <MessageCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                            <h3 className="mb-2 text-lg font-semibold">No Chat Selected</h3>
                            <p className="text-muted-foreground">Select a Chat to start messaging or create a new one</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
