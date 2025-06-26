import { modelID } from '@/src/actions/providers'
import { Textarea as ShadcnTextarea } from '@dalim/core/ui/textarea'
import { ArrowUp } from 'lucide-react'
import { ModelPicker } from './model-picker' 

interface InputProps {
    input: string
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    isLoading: boolean
    status: string
    stop: () => void
    selectedModel: modelID
    setSelectedModel: (model: modelID) => void
}

export const Textarea = ({ input, handleInputChange, isLoading, status, stop, selectedModel, setSelectedModel }: InputProps) => {
    return (
        <div className="relative w-full pt-4">
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
