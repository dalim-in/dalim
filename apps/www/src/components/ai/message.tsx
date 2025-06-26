'use client'

import type { Message as TMessage } from 'ai'
import { AnimatePresence, motion } from 'motion/react'
import { memo, useCallback, useEffect, useState } from 'react'
import equal from 'fast-deep-equal'

import { Markdown } from './markdown'
import { cn } from '@dalim/core/lib/utils'
import { Check, CheckCircle, ChevronDownIcon, ChevronUpIcon, Copy, Loader2,   StopCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import { SpinnerIcon } from './icons'
import { DalimLogoIcon } from '@dalim/core/components/logo'
import { Tooltip, TooltipContent, TooltipTrigger } from '@dalim/core/ui/tooltip'
import { Button } from '@dalim/core/ui/button'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, copyToClipboard] = useCopyToClipboard()

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

const PurePreviewMessage = ({ message, isLatestMessage, status }: { message: TMessage; isLoading: boolean; status: 'error' | 'submitted' | 'streaming' | 'ready'; isLatestMessage: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, copyToClipboard] = useCopyToClipboard()
    return (
        <AnimatePresence key={message.id}>
            <motion.div
                className="group/message mx-auto w-full px-4"
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
                                                    'bg-secondary text-secondary-foreground rounded-bl-xl rounded-tl-xl rounded-tr-xl px-3 py-2': message.role === 'user',
                                                })}>
                                                <Markdown>{part.text}</Markdown>
                                            </div>
                                        </motion.div>
                                    )
                                case 'tool-invocation':
                                    const { toolName, state } = part.toolInvocation

                                    return (
                                        <motion.div
                                            initial={{ y: 5, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            key={`message-${message.id}-part-${i}`}
                                            className="mb-3 flex flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-2 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                                            <div className="flex flex-1 items-center justify-center">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-baseline ml-2 gap-2 font-medium">
                                                        {state === 'call' ? 'Calling' : 'Called'} <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono dark:bg-zinc-800">{toolName}</span>
                                                    </div>
                                                </div>
                                                <div className="flex h-5 w-5 items-center justify-center">
                                                    {state === 'call' ? (
                                                        isLatestMessage && status !== 'ready' ? (
                                                            <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                                                        ) : (
                                                            <StopCircle className="h-4 w-4 text-red-500" />
                                                        )
                                                    ) : state === 'result' ? (
                                                        <CheckCircle
                                                            size={14}
                                                            className="text-green-600"
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                case 'reasoning':
                                    return (
                                        <ReasoningMessagePart
                                            key={`message-${message.id}-${i}`}
                                            // @ts-expect-error part
                                            part={part}
                                            isReasoning={(message.parts && status === 'streaming' && i === message.parts.length - 1) ?? false}
                                        />
                                    )
                                default:
                                    return null
                            }
                        })}
                    </div>
                    {message.role === 'assistant' && (
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
                                        <Copy />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Copy</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size={'icon'}
                                        variant="ghost"
                                        onClick={async () => { 
                                            toast.success('Upvote Responce')
                                        }}>
                                        <ThumbsUp />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Upvote</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size={'icon'}
                                        variant="ghost"
                                        onClick={async () => { 
                                            toast.success('Upvote Responce')
                                        }}>
                                        <ThumbsDown />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Upvote</TooltipContent>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export const Message = memo(PurePreviewMessage, (prevProps, nextProps) => {
    if (prevProps.status !== nextProps.status) return false
    if (prevProps.message.annotations !== nextProps.message.annotations) return false
    // if (prevProps.message.content !== nextProps.message.content) return false;
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false

    return true
})
