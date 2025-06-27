/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import { defaultModel, type modelID } from '@/src/actions/providers'
import { useChat } from '@ai-sdk/react'
import { Textarea } from './textarea'
import { Messages } from './messages'
import { ChatHistorySidebar } from './chat-history-sidebar'
import { ChatVoting } from './chat-voting'
import { toast } from 'sonner'
import { Button } from '@dalim/core/ui/button'
import { Switch } from '@dalim/core/ui/switch'
import { Label } from '@dalim/core/ui/label'
import { Input } from '@dalim/core/ui/input'
import { Globe, Lock } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@dalim/core/ui/breadcrumb'
import { Separator } from '@dalim/core/ui/separator'
import { PanelRight } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@dalim/core/ui/sheet'
import { createDesignChat, saveDesignMessage, getDesignChatWithMessages } from '@/src/actions/design-chat'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface ChatProps {
    chatId: string
}

export default function EnhancedChat({ chatId }: ChatProps) {
    const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel)
    const [currentChatId, setCurrentChatId] = useState<string | null>(null)
    const [chatTitle, setChatTitle] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [showSaveDialog, setShowSaveDialog] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chatData, setChatData] = useState<any>(null)
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (chatId) {
            handleSelectChat(chatId)
        }
    }, []) // load once on mount

    const { messages, input, handleInputChange, handleSubmit, append, status, stop, setMessages, setInput } = useChat({
        maxSteps: 5,
        body: {
            selectedModel,
        },
        onError: (error) => {
            toast.error(error.message.length > 0 ? error.message : 'An error occurred, please try again later.', {
                position: 'top-center',
                richColors: true,
            })
        },
        onFinish: async (message) => {
            // Auto-save messages if chat exists
            if (currentChatId) {
                try {
                    await saveDesignMessage(currentChatId, message.content, 'assistant', message.toolInvocations)
                } catch (error) {
                    console.error('Failed to save message:', error)
                }
            }
        },
    })

    const isLoading = status === 'streaming' || status === 'submitted'

    const startNewChat = () => {
        setMessages([])
        setInput('')
    }

    const handleNewChat = () => {
        setCurrentChatId(null)
        setChatData(null)
        setMessages([])
        setInput('')
        setChatTitle('')
        setIsPublic(false)
        setShowSaveDialog(false)
    }

    const handleSelectChat = async (currentChatId: string) => {
        try {
            const chat = await getDesignChatWithMessages(currentChatId)
            if (chat) {
                setCurrentChatId(currentChatId)
                setChatData(chat)
                setChatTitle(chat.title)
                setIsPublic(chat.isPublic)

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const chatMessages = chat.messages.map((msg: any) => ({
                    id: msg.id,
                    role: msg.role,
                    content: msg.content,
                    toolInvocations: msg.toolCalls,
                }))
                setMessages(chatMessages)
                setInput('')

                // ✅ Navigate to /ai/[currentChatId]
                router.push(`/ai/${currentChatId}`)
            }
        } catch (error) {
            toast.error('Failed to load chat')
        }
    }

    const handleSaveChat = async () => {
        if (!chatTitle.trim()) {
            toast.error('Please enter a chat title')
            return
        }

        try {
            const chat = await createDesignChat(chatTitle, isPublic)
            setCurrentChatId(chat.id)

            // Save all existing messages
            for (const message of messages) {
                await saveDesignMessage(chat.id, message.content, message.role as 'user' | 'assistant', message.toolInvocations)
            }

            setShowSaveDialog(false)
            toast.success('Chat saved successfully!')
        } catch (error) {
            toast.error('Failed to save chat')
        }
    }

    const handleSubmitWithSave = async (e: React.FormEvent) => {
        await handleSubmit(e)

        // Save user message if chat exists
        if (currentChatId && input.trim()) {
            try {
                await saveDesignMessage(currentChatId, input, 'user')
            } catch (error) {
                console.error('Failed to save user message:', error)
            }
        }

        // Show save dialog if this is a new chat with messages
        if (!currentChatId && messages.length === 0 && input.trim()) {
            setShowSaveDialog(true)
        }
    }

    return (
        <div className="h-auto">
            <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b px-6">
                <Sheet>
                    <div className="flex items-center gap-6">
                        <SheetTrigger>
                            <PanelRight className="h-4 w-4" />
                        </SheetTrigger>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-8"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/ai">Designs + AI</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage
                                        className="cursor-pointer"
                                        onClick={startNewChat}>
                                        {' '}
                                        New Chat
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <SheetContent
                        className="w-full"
                        side={'left'}>
                        <SheetHeader>
                            <SheetTitle>Chat History</SheetTitle>
                            <ChatHistorySidebar
                                onSelectChat={handleSelectChat}
                                onNewChat={handleNewChat}
                                selectedChatId={currentChatId}
                            />
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                {session && showSaveDialog && (
                    <div className="z-10 hidden md:block">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter chat title..."
                                value={chatTitle}
                                onChange={(e) => setChatTitle(e.target.value)}
                                className="w-60"
                            />
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSaveDialog(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveChat}>Save Chat</Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="public-chat"
                                    checked={isPublic}
                                    onCheckedChange={setIsPublic}
                                />
                                <Label
                                    htmlFor="public-chat"
                                    className="text-sm">
                                    {isPublic ? (
                                        <span className="flex items-center gap-1">
                                            <Globe className="h-3 w-3" />
                                            Public (others can view and vote)
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <Lock className="h-3 w-3" />
                                            Private (only you can view)
                                        </span>
                                    )}
                                </Label>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <div className="flex w-full justify-center gap-2">
                        <Link href={session ? '/dashboard' : '/login'}>
                            <Button variant="outline">{session ? 'Dashboard' : 'Login'}</Button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="flex flex-1 flex-col mx-6">
                {currentChatId && chatData && (
                    <div className="hidden border-b p-2 px-6 md:block">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex w-full items-center justify-between gap-2">
                                <h1 className="text-xl font-semibold">{chatData.title}</h1>
                                <p className="text-sm text-slate-500">
                                    by
                                    <Link
                                        className="text-brand font-semibold"
                                        href={`/${chatData.user.username}`}>
                                        {' '}
                                        {chatData.user.name}
                                    </Link>
                                </p>
                            </div>
                            <ChatVoting
                                chatId={currentChatId}
                                upvotes={chatData.upvotes}
                                downvotes={chatData.downvotes}
                                viewCount={chatData.viewCount}
                                userVote={chatData.votes?.[0]}
                                isPublic={chatData.isPublic}
                                isOwner={chatData.userId === chatData.user.id} // You'll need to pass current user ID
                            />
                        </div>
                    </div>
                )}

                <div className="stretch flex h-[700px] w-full flex-col justify-center md:h-[850px]">
                    {messages.length === 0 ? (
                        <div className="mx-auto w-full max-w-xl">
                            <h1 className="mb-4 text-center text-3xl font-semibold">
                                Designs <span className="text-neutral-500">+</span> AI
                            </h1>
                            <p className="text-primary/80 text-center text-sm">I'm building AI-powered tools for design, branding, icons, colors, UI, graphics, fonts, style guides, and much more - empowering creators with smart, intuitive workflows.</p>
                        </div>
                    ) : (
                        <Messages
                            messages={messages}
                            isLoading={isLoading} 
                        />
                    )}
                    <form
                        onSubmit={handleSubmitWithSave}
                        className="mx-auto w-full max-w-2xl pb-8">
                        <Textarea
                            selectedModel={selectedModel}
                            setSelectedModel={setSelectedModel}
                            handleInputChange={handleInputChange}
                            input={input}
                            isLoading={isLoading}
                            status={status}
                            stop={stop}
                            messages={messages}
                            append={append}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
