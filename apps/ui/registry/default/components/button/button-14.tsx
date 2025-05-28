"use client"

import { useState } from "react"
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isShuffled ? "default" : "outline"}
        size="icon"
        onClick={() => setIsShuffled(!isShuffled)}
        className="h-10 w-10"
      >
        <Shuffle className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" className="h-12 w-12">
        <SkipBack className="h-5 w-5" />
      </Button>

      <Button
        onClick={() => setIsPlaying(!isPlaying)}
        size="icon"
        className="h-16 w-16"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="ml-1 h-6 w-6" />
        )}
      </Button>

      <Button variant="outline" size="icon" className="h-12 w-12">
        <SkipForward className="h-5 w-5" />
      </Button>

      <Button
        variant={isRepeating ? "default" : "outline"}
        size="icon"
        onClick={() => setIsRepeating(!isRepeating)}
        className="h-10 w-10"
      >
        <Repeat className="h-4 w-4" />
      </Button>
    </div>
  )
}
