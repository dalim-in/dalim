'use client'

import { useState } from 'react'
import { Button } from '@dalim/core/ui/button'
import { Textarea as ShadcnTextarea } from '@dalim/core/ui/textarea'
import { ImageUpload } from './image-upload'

interface ImagePromptInputProps {
  onSubmit: (prompt: string) => void
  isEditing: boolean
  isLoading: boolean
  onImageSelect: (imageData: string) => void
  currentImage: string | null
}

const promptSuggestions = [
  // Logo Design
  "Minimalist logo concept for a sustainable clothing brand, flat vector style",
  "Bold tech startup logo with sharp angles and vibrant gradients",
  "Playful logo for a kids’ toy company, rounded shapes, primary colors",

  // Icon Design
  "Set of clean and modern UI icons for a weather app, line style",
  "3D-style app icon for a travel booking app, vibrant and detailed",
  "Flat monochrome icon set for a productivity tool, dark mode friendly",
 
  // Graph / Infographics
  "Stylized infographic showing climate change impact, pastel colors, isometric style",
  "Data visualization of monthly expenses as donut chart and bar graph",
  "Interactive pie chart UI with tooltips and micro-interactions",

  // Architecture / Interior
  "Interior design of a cozy Scandinavian living room with warm lighting",
  "Futuristic glass house architecture in a forest, minimal and natural",
  "3D isometric view of a modern coworking space with ambient lighting",

  // Product / Packaging
  "Creative packaging design for a luxury skincare product, gold accents, matte texture",
  "Eco-friendly product box design for organic tea, hand-drawn style",
  "Sleek bottle design for a tech-driven energy drink brand",

  // Typography / Color / Branding
  "Modern typography poster with bold serif font and muted tones",
  "Color palette exploration for a beach resort brand: sand, aqua, coral",
  "Brand board for a tech education startup: logo, typeface, color, and icons",
]


export function ImagePromptInput({
  onSubmit,
  isEditing,
  isLoading,
  onImageSelect,
  currentImage,
}: ImagePromptInputProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      onSubmit(prompt.trim())
      setPrompt('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-lg">
      <ImageUpload onImageSelect={onImageSelect} currentImage={currentImage} />

      <div className="flex w-full overflow-x-auto gap-2">
        {promptSuggestions.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            className="rounded-full w-full mb-3 whitespace-nowrap px-3 py-1 text-sm text-muted-foreground transition hover:bg-muted/80"
            onClick={() => setPrompt(suggestion)}
          >
            {suggestion.length > 60 ? suggestion.slice(0, 60) + '…' : suggestion}
          </button>
        ))}
      </div>

      <Button
        className="absolute bottom-2 right-2 flex gap-2"
        type="submit"
        disabled={!prompt.trim() || isLoading}
      >
        {isEditing ? 'Edit Image' : 'Generate Image'}
      </Button>

      <ShadcnTextarea
        id="prompt"
        className="bg-secondary max-h-80 w-full resize-none overflow-y-auto rounded-2xl pb-16 pr-12 pt-4"
        value={prompt}
        autoFocus
        placeholder="Generate any image about designs..."
        onChange={(e) => setPrompt(e.target.value)}
      />
    </form>
  )
}
