'use client'
import { useState } from 'react' 
import { ImagePromptInput } from './image-prompt'
import { ImageResultDisplay } from './image-result' 
import { HistoryItem } from '@/src/types/ai'

export function ImageAI() {
    const [image, setImage] = useState<string | null>(null)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [history, setHistory] = useState<HistoryItem[]>([])

    const handleImageSelect = (imageData: string) => {
        setImage(imageData || null)
    }

    const handlePromptSubmit = async (prompt: string) => {
        try {
            setLoading(true)
            setError(null)

            // If we have a generated image, use that for editing, otherwise use the uploaded image
            const imageToEdit = generatedImage || image

            // Prepare the request data as JSON
            const requestData = {
                prompt,
                image: imageToEdit,
                history: history.length > 0 ? history : undefined,
            }

            const response = await fetch('/api/chat/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to generate image')
            }

            const data = await response.json()

            if (data.image) {
                // Update the generated image and description
                setGeneratedImage(data.image)
                setDescription(data.description || null)

                // Update history locally - add user message
                const userMessage: HistoryItem = {
                    role: 'user',
                    parts: [{ text: prompt }, ...(imageToEdit ? [{ image: imageToEdit }] : [])],
                }

                // Add AI response
                const aiResponse: HistoryItem = {
                    role: 'model',
                    parts: [...(data.description ? [{ text: data.description }] : []), ...(data.image ? [{ image: data.image }] : [])],
                }

                // Update history with both messages
                setHistory((prevHistory) => [...prevHistory, userMessage, aiResponse])
            } else {
                setError('No image returned from API')
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred')
            console.error('Error processing request:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setImage(null)
        setGeneratedImage(null)
        setDescription(null)
        setLoading(false)
        setError(null)
        setHistory([])
    }

    // If we have a generated image, we want to edit it next time
    const currentImage = generatedImage || image
    const isEditing = !!currentImage

    // Get the latest image to display (always the generated image)
    const displayImage = generatedImage

    return (
        <main className="flex items-center justify-center ">
            <div className="mx-auto w-full max-w-2xl stretch justify-center flex h-[600px] flex-col md:h-[800px]">
                {error && <div className="mb-4 text-center rounded-lg p-2 text-sm">{error}</div>}

                {!displayImage && !loading ? (
                    <> 
                        <ImagePromptInput
                            onSubmit={handlePromptSubmit}
                            isEditing={isEditing}
                            isLoading={loading}
                            onImageSelect={handleImageSelect}
                            currentImage={currentImage}
                        />
                    </>
                ) : loading ? (
                    <div
                        role="status"
                        className="dark:bg-secondary mx-auto flex w-60 h-56 max-w-sm animate-pulse items-center justify-center rounded-lg bg-gray-300">
                        <span className="font-xs text-muted-foreground pl-4 font-mono">Processing...</span>
                    </div>
                ) : (
                    <>
                        <ImageResultDisplay
                            imageUrl={displayImage || ''}
                            description={description}
                            onReset={handleReset}
                            conversationHistory={history}
                        />
                        <ImagePromptInput
                            onSubmit={handlePromptSubmit}
                            isEditing={true}
                            isLoading={loading}
                            onImageSelect={handleImageSelect}
                            currentImage={currentImage}
                        />
                    </>
                )}
            </div>
        </main>
    )
}
