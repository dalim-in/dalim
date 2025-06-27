'use client'

import type { Message as TMessage } from 'ai'
import { AnimatePresence, motion } from 'motion/react'
import { memo, useCallback, useEffect, useState } from 'react'
import equal from 'fast-deep-equal'

import { Markdown } from './markdown'
import { cn } from '@dalim/core/lib/utils'
import { ChevronDownIcon, ChevronUpIcon, Copy, ThumbsDown, ThumbsUp, Download } from 'lucide-react'
import { SpinnerIcon } from '@dalim/core/components/logos'
import { DalimLogoIcon } from '@dalim/core/components/logo'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@dalim/core/ui/tooltip'
import { Button } from '@dalim/core/ui/button'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'
import { IconPreview } from './tools/icon-preview'
import { ColorPalettePreview } from './tools/color-gen'
import { TypographyPreview } from './tools/typography-preview'
import { useScrollToBottom } from '@dalim/core/hooks/use-scroll-to-bottom'

interface ReasoningPart {
    type: 'reasoning'
    reasoning: string
    details: Array<{ type: 'text'; text: string }>
}

interface ReasoningMessagePartProps {
    part: ReasoningPart
    isReasoning: boolean
}

export function ReasoningMessagePart({ part, isReasoning }: ReasoningMessagePartProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const variants = {
        collapsed: {
            height: 0,
            opacity: 0,
            marginTop: 0,
            marginBottom: 0,
        },
        expanded: {
            height: 'auto',
            opacity: 1,
            marginTop: '1rem',
            marginBottom: 0,
        },
    }

    const memoizedSetIsExpanded = useCallback((value: boolean) => {
        setIsExpanded(value)
    }, [])

    useEffect(() => {
        memoizedSetIsExpanded(isReasoning)
    }, [isReasoning, memoizedSetIsExpanded])

    return (
        <div className="flex flex-col">
            {isReasoning ? (
                <div className="flex flex-row items-center gap-2">
                    <div className="text-sm font-medium">Reasoning</div>
                    <div className="animate-spin">
                        <SpinnerIcon />
                    </div>
                </div>
            ) : (
                <div className="flex flex-row items-center gap-2">
                    <div className="text-sm font-medium">Reasoned for a few seconds</div>
                    <button
                        className={cn('cursor-pointer rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800', {
                            'bg-zinc-200 dark:bg-zinc-800': isExpanded,
                        })}
                        onClick={() => {
                            setIsExpanded(!isExpanded)
                        }}>
                        {isExpanded ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
                    </button>
                </div>
            )}

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        key="reasoning"
                        className="flex flex-col gap-4 border-l pl-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={variants}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}>
                        {part.details.map((detail, detailIndex) => (detail.type === 'text' ? <Markdown key={detailIndex}>{detail.text}</Markdown> : '<redacted>'))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const PurePreviewMessage = ({ message, messages, onVote }: { message: TMessage; messages: TMessage[]; isLoading: boolean; onVote?: (messageId: string, isUpvote: boolean) => void }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, copyToClipboard] = useCopyToClipboard()
    const [userVote, setUserVote] = useState<boolean | null>(null)

    const handleVote = (isUpvote: boolean) => {
        if (userVote === isUpvote) {
            setUserVote(null) // Remove vote if clicking same button
        } else {
            setUserVote(isUpvote)
        }
        onVote?.(message.id, isUpvote)
        toast.success(isUpvote ? 'Message upvoted! 👍' : 'Message downvoted 👎')
    }

    const downloadContent = () => {
        const textFromParts = message.parts
            ?.filter((part) => part.type === 'text')
            .map((part) => part.text)
            .join('\n')
            .trim()

        if (!textFromParts) {
            toast.error('No content to download!')
            return
        }

        const blob = new Blob([textFromParts], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `ai-response-${Date.now()}.md`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('Content downloaded!')
    }

    const [containerRef, endRef] = useScrollToBottom()
 
    return (
        <AnimatePresence key={message.id}>
            <motion.div
                ref={containerRef}
                className="group/message mx-auto max-w-2xl px-4"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                key={`message-${message.id}`}
                data-role={message.role}>
                <div className={cn('grid w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl', 'group-data-[role=user]/message:w-fit')}>
                    {message.role === 'assistant' && (
                        <div className="flex items-center gap-2">
                            <div className="ring-border bg-background flex size-8 shrink-0 items-center justify-center rounded-full p-2 ring-1">
                                <div className="">
                                    <DalimLogoIcon />
                                </div>
                            </div>
                            <h1 className="font-semibold">AI</h1>
                        </div>
                    )}

                    <div className="flex w-full flex-col space-y-4">
                        {message.parts?.map((part, i) => {
                            switch (part.type) {
                                case 'text':
                                    return (
                                        <motion.div
                                            initial={{ y: 5, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            key={`message-${message.id}-part-${i}`}
                                            className="flex w-full flex-row items-start gap-2 pb-4">
                                            <div
                                                className={cn('flex flex-col gap-4', {
                                                    'bg-secondary text-secondary-foreground rounded-bl-xl rounded-tl-xl rounded-tr-xl px-4 py-2': message.role === 'user',
                                                })}>
                                                <Markdown>{part.text}</Markdown>
                                            </div>
                                        </motion.div>
                                    )
                                case 'tool-invocation':
                                    return (
                                        <motion.div
                                            initial={{ y: 5, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="space-y-2"
                                            key={`message-${message.id}-part-${i}`}>
                                            {messages.map((m, i) => (
                                                <div key={i}>
                                                    {m.toolInvocations?.map(
                                                        (toolInvocation: {
                                                            toolName: string
                                                            toolCallId: string
                                                            state: string
                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                            result?: any
                                                        }) => {
                                                            const { toolName, toolCallId, state, result } = toolInvocation

                                                            if (state === 'result') {
                                                                return (
                                                                    <div key={toolCallId}>
                                                                        {toolName === 'generateIcon' && <IconPreview {...(result || {})} />}
                                                                        {toolName === 'generateColorPalette' && <ColorPalettePreview {...(result || {})} />}
                                                                        {toolName === 'suggestTypography' && <TypographyPreview {...(result || {})} />}
                                                                        {!['generateIcon', 'generateColorPalette', 'suggestTypography'].includes(toolName) && (
                                                                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                                                                                <pre className="text-sm">{JSON.stringify(result || {}, null, 2)}</pre>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div
                                                                        key={toolCallId}
                                                                        className="animate-pulse rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                                                                        {toolName === 'generateIcon' && <div>Generating icon...</div>}
                                                                        {toolName === 'generateColorPalette' && <div>Creating color palette...</div>}
                                                                        {toolName === 'suggestTypography' && <div>Suggesting typography...</div>}
                                                                        {!['displayWeather', 'generateIcon', 'generateColorPalette', 'suggestTypography'].includes(toolName) && <div>Processing...</div>}
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                    )}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )
                                default:
                                    return null
                            }
                        })}
                    </div>

                    {message.role === 'assistant' && (
                        <TooltipProvider>
                            <div className="flex items-center gap-1">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size={'icon'}
                                            variant="ghost"
                                            onClick={async () => {
                                                const textFromParts = message.parts
                                                    ?.filter((part) => part.type === 'text')
                                                    .map((part) => part.text)
                                                    .join('\n')
                                                    .trim()

                                                if (!textFromParts) {
                                                    toast.error("There's no text to copy!")
                                                    return
                                                }

                                                await copyToClipboard(textFromParts)
                                                toast.success('Copied to clipboard!')
                                            }}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Copy response</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size={'icon'}
                                            variant="ghost"
                                            onClick={downloadContent}>
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Download as file</TooltipContent>
                                </Tooltip>

                                <div className="mx-1 h-4 w-px bg-slate-300 dark:bg-slate-600" />

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size={'icon'}
                                            variant="ghost"
                                            className={cn('transition-colors', userVote === true && 'bg-green-50 text-green-600 dark:bg-green-900/20')}
                                            onClick={() => handleVote(true)}>
                                            <ThumbsUp className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Upvote response</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size={'icon'}
                                            variant="ghost"
                                            className={cn('transition-colors', userVote === false && 'bg-red-50 text-red-600 dark:bg-red-900/20')}
                                            onClick={() => handleVote(false)}>
                                            <ThumbsDown className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Downvote helpful</TooltipContent>
                                </Tooltip>
                            </div>
                        </TooltipProvider>
                    )}
                </div>
            </motion.div>

            <div
                className="h-1"
                ref={endRef}
            />
        </AnimatePresence>
    )
}

export const Message = memo(PurePreviewMessage, (prevProps, nextProps) => {
    if (prevProps.message.annotations !== nextProps.message.annotations) return false
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false

    return true
})
