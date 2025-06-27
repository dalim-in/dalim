import type { Message as TMessage } from 'ai'
import { Message } from './message' 

export const Messages = ({ messages, isLoading  }: { messages: TMessage[]; isLoading: boolean;  }) => {
    

    return (
        <div 
            className="h-full flex-1 space-y-4 overflow-y-auto py-8">
            <div className="mx-auto max-w-2xl pt-8">
                {messages.map((m, i) => (
                    <Message 
                         key={i}
                            isLoading={isLoading}
                            message={m} 
                            messages={messages} 
                        />
                ))}
                {isLoading && <div className="animate-pulse rounded-lg p-3">Thinking...</div>}
                
            </div>
        </div>
    )
}
