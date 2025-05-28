"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  const [likeCount, setLikeCount] = useState(42)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
      setLiked(false)
    } else {
      setLikeCount(likeCount + 1)
      setLiked(true)
    }
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className={`flex items-center gap-2 transition-all ${
        liked ? " text-rose-500" : ""
      }`}
      onClick={handleLike}
    >
      <Heart className={`h-5 w-5 ${liked ? "fill-rose-500" : ""}`} />
      <span className="font-medium">{likeCount}</span>
    </Button>
  )
}
