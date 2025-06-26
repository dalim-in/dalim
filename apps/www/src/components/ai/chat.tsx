'use client'

import { defaultModel, type modelID } from '@/src/actions/providers'
import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import { Textarea } from './textarea'
import { Messages } from './messages'
import { toast } from 'sonner' 

export default function Chat() {
    const startNewChat = () => {
        setMessages([])
        setInput('')
    }
    const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel)
    const { messages, input, handleInputChange, handleSubmit, status, stop, setMessages, setInput } = useChat({
        maxSteps: 5,
        body: {
            selectedModel,
        },
        onError: (error) => {
            toast.error(error.message.length > 0 ? error.message : 'An error occured, please try again later.', { position: 'top-center', richColors: true })
        },
    })

    const isLoading = status === 'streaming' || status === 'submitted'

    return (
        <div className="stretch flex h-[900px] w-full flex-col justify-center">
            {messages.length === 0 ? (
                <div className="mx-auto w-full max-w-xl">
                    <h1 className="mb-4 text-center text-3xl font-semibold">
                        Designs <span className="text-neutral-500">+</span> AI
                    </h1>
                    <p className="text-center text-sm">I'm building AI-powered tools for design, branding, icons, colors, UI, graphics, fonts, style guides, and much more - empowering creators with smart, intuitive workflows.</p>
                </div>
            ) : (
                <Messages
                    messages={messages}
                    isLoading={isLoading}
                    status={status}
                    startNewChat={startNewChat}      
                />
            )}
            <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-2xl bg-white px-4 pb-8 sm:px-0 dark:bg-black">
                <Textarea
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                    handleInputChange={handleInputChange}
                    input={input}
                    isLoading={isLoading}
                    status={status}
                    stop={stop}
                /> 
            </form>
        </div>
    )
}
