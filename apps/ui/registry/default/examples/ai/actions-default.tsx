"use client"

import { useState } from "react"
import {
  BookmarkIcon,
  CopyIcon,
  RefreshCcwIcon,
  Share2Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Action, Actions } from "@/registry/default/ui/ai/actions"

export default function ActionsDemo() {
  const [liked, setLiked] = useState<null | "up" | "down">(null)
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto max-w-md">
        <Actions className="flex flex-wrap gap-2">
          {/* Like / Dislike Toggle */}
          <Action
            label={liked === "up" ? "Unlike" : "Like"}
            onClick={() => setLiked(liked === "up" ? null : "up")}
            className={liked === "up" ? "bg-green-100 text-green-600" : ""}
          >
            <ThumbsUpIcon className="size-4" />
          </Action>

          <Action
            label={liked === "down" ? "Undo dislike" : "Dislike"}
            onClick={() => setLiked(liked === "down" ? null : "down")}
            className={liked === "down" ? "bg-red-100 text-red-600" : ""}
          >
            <ThumbsDownIcon className="size-4" />
          </Action>

          {/* Retry */}
          <Action label="Retry" onClick={() => alert("Retrying...")}>
            <RefreshCcwIcon className="size-4" />
          </Action>

          {/* Copy */}
          <Action
            label="Copy"
            onClick={() => navigator.clipboard.writeText("Copied content")}
          >
            <CopyIcon className="size-4" />
          </Action>

          {/* Share */}
          <Action
            label="Share"
            onClick={() =>
              navigator.share
                ? navigator.share({ text: "Shared content" })
                : alert("Sharing not supported")
            }
          >
            <Share2Icon className="size-4" />
          </Action>

          {/* Save Toggle */}
          <Action
            label={saved ? "Unsave" : "Save"}
            onClick={() => setSaved((prev) => !prev)}
            className={saved ? "bg-blue-100 text-blue-600" : ""}
          >
            <BookmarkIcon className="size-4" />
          </Action>
        </Actions>
      </div>
    </div>
  )
}
