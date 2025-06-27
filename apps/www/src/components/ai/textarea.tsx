import { modelID } from '@/src/actions/providers'
import { Textarea as ShadcnTextarea } from '@dalim/core/ui/textarea'
import { Message, ChatRequestOptions, CreateMessage } from 'ai'
import { ArrowUp } from 'lucide-react'
import { ModelPicker } from './model-picker'
import { motion } from 'framer-motion' 

interface InputProps {
    input: string
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    isLoading: boolean
    status: string
    stop: () => void
    selectedModel: modelID
    setSelectedModel: (model: modelID) => void
    messages: Array<Message>
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
}

const suggestedActions = [
  {
    title: 'Create a Color Palette',
    label: 'Generate harmonious colors for a brand or UI',
    action: 'Generate a modern color palette for a tech brand',
  },
  {
    title: 'Explore Typography Options',
    label: 'Find font pairings and type scales',
    action: 'Suggest typography for a clean, modern UI',
  },
  {
    title: 'Generate an Icon',
    label: 'Convert SVG to downloadable PNG',
    action: 'Generate a heart outline icon',
  },
  {
    title: 'Understand the Design Process',
    label: 'Learn about design systems and workflows',
    action: 'What is a design system?',
  },
]


export const Textarea = ({ input, handleInputChange, isLoading, status, stop, selectedModel, setSelectedModel, messages, append }: InputProps) => {
    return (
        <div className="relative w-full pt-4">
            {messages.length === 0 && (
                <div className="mx-auto mb-2 grid w-full grid-cols-2 gap-2">
                    {suggestedActions.map((suggestedAction, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.05 * index }}
                            key={index}
                            className={index > 1 ? 'hidden sm:block' : 'block'}>
                            <button
                                onClick={async () => {
                                    append({
                                        role: 'user',
                                        content: suggestedAction.action,
                                    })
                                }}
                                className="bg-muted/50 flex w-full cursor-pointer flex-col rounded-lg border p-3 text-left text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                <span className="font-medium">{suggestedAction.title}</span>
                                <span className="text-zinc-500 dark:text-zinc-400">{suggestedAction.label}</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            <ShadcnTextarea
                className="bg-secondary max-h-80 w-full resize-none overflow-y-auto rounded-2xl pb-16 pr-12 pt-4"
                value={input}
                autoFocus
                placeholder={'Ask anything about designs...'}
                // @ts-expect-error err
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        if (input.trim() && !isLoading) {
                            // @ts-expect-error err
                            const form = e.target.closest('form')
                            if (form) form.requestSubmit()
                        }
                    }
                }}
            />
            <ModelPicker
                setSelectedModel={setSelectedModel}
                selectedModel={selectedModel}
            />
            {status === 'streaming' || status === 'submitted' ? (
                <button
                    type="button"
                    onClick={stop}
                    className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-black p-2 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300">
                    <div className="h-4 w-4 animate-spin">
                        <svg
                            className="h-4 w-4 text-white"
                            viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </div>
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute bottom-2 right-2 rounded-full bg-black p-2 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:dark:bg-neutral-700 dark:disabled:opacity-80">
                    <ArrowUp className="h-4 w-4 text-white" />
                </button>
            )}
        </div>
    )
}
