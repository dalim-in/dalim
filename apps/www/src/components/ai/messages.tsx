import type { Message as TMessage } from 'ai'
import { Message } from './message'
import { useScrollToBottom } from '@dalim/core/hooks/use-scroll-to-bottom'
import { Weather } from './tools/weather'
import { IconPreview } from './tools/icon-preview'

export const Messages = ({ messages, isLoading, status }: { messages: TMessage[]; isLoading: boolean; status: 'error' | 'submitted' | 'streaming' | 'ready' }) => {
    const [containerRef, endRef] = useScrollToBottom()
    return (
        <div
            className="h-full flex-1 space-y-4 overflow-y-auto py-8"
            ref={containerRef}>
            <div className="mx-auto max-w-2xl pt-8">
                {messages.map((m, i) => (
                    // eslint-disable-next-line react/jsx-key
                    <div>
                        <Message
                            key={i}
                            isLatestMessage={i === messages.length - 1}
                            isLoading={isLoading}
                            message={m}
                            status={status}
                        />
                        <div>
                            <div className="flex flex-col gap-4">
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
                                            return <div key={toolCallId}>{toolName === 'displayWeather' ? <Weather {...result} /> : toolName === 'generateIcon' ? <IconPreview {...result} /> : <div>{JSON.stringify(result, null, 2)}</div>}</div>
                                        } else {
                                            return (
                                                <div
                                                    key={toolCallId}
                                                    className="skeleton">
                                                    {toolName === 'displayWeather' ? <div>Loading weather...</div> : toolName === 'generateIcon' ? <div>Loading icon...</div> : null}
                                                </div>
                                            )
                                        }
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && <div className="animate-pulse rounded-lg p-3">Thinking...</div>}
                <div
                    className="h-1"
                    ref={endRef}
                />
            </div>
        </div>
    )
}
