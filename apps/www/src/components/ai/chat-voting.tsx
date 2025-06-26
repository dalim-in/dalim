"use client"

import { useState } from "react"
import { Button } from "@dalim/core/ui/button"
import { ThumbsUp, ThumbsDown, Eye, Share2, TrendingUp } from 'lucide-react'
import { voteOnDesignChat } from "@/src/actions/design-chat"
import { toast } from "sonner"
import { cn } from "@dalim/core/lib/utils"

interface ChatVotingProps {
  chatId: string
  upvotes: number
  downvotes: number
  viewCount: number
  userVote?: { isUpvote: boolean } | null
  isPublic: boolean
  isOwner: boolean
}

export function ChatVoting({ 
  chatId, 
  upvotes, 
  downvotes, 
  viewCount, 
  userVote, 
  isPublic, 
  isOwner 
}: ChatVotingProps) {
  const [votes, setVotes] = useState({ upvotes, downvotes })
  const [currentVote, setCurrentVote] = useState(userVote)
  const [loading, setLoading] = useState(false)

  const netVotes = votes.upvotes - votes.downvotes
  const votePercentage = votes.upvotes + votes.downvotes > 0 
    ? Math.round((votes.upvotes / (votes.upvotes + votes.downvotes)) * 100)
    : 0

  const handleVote = async (isUpvote: boolean) => {
    if (isOwner) {
      toast.error("You cannot vote on your own chat")
      return
    }

    setLoading(true)
    
    // Optimistic update
    const previousVotes = { ...votes }
    const previousCurrentVote = currentVote

    try {
      if (currentVote) {
        if (currentVote.isUpvote === isUpvote) {
          // Remove vote
          setVotes((prev) => ({
            ...prev,
            [isUpvote ? "upvotes" : "downvotes"]: prev[isUpvote ? "upvotes" : "downvotes"] - 1,
          }))
          setCurrentVote(null)
        } else {
          // Change vote
          setVotes((prev) => ({
            upvotes: prev.upvotes + (isUpvote ? 1 : -1),
            downvotes: prev.downvotes + (isUpvote ? -1 : 1),
          }))
          setCurrentVote({ isUpvote })
        }
      } else {
        // New vote
        setVotes((prev) => ({
          ...prev,
          [isUpvote ? "upvotes" : "downvotes"]: prev[isUpvote ? "upvotes" : "downvotes"] + 1,
        }))
        setCurrentVote({ isUpvote })
      }

      await voteOnDesignChat(chatId, isUpvote)
      
      toast.success(
        currentVote?.isUpvote === isUpvote 
          ? "Vote removed" 
          : isUpvote 
            ? "Upvoted! 👍" 
            : "Downvoted 👎"
      )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Revert optimistic update
      setVotes(previousVotes)
      setCurrentVote(previousCurrentVote)
      toast.error("Failed to vote. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (!isPublic) {
      toast.error("Only public chats can be shared")
      return
    }

    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard! 📋")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  if (!isPublic && !isOwner) {
    return null
  }

  return (
    <div className="flex w-full justify-end items-center gap-3 pl-3">
      {/* View Count */}
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
        <Eye strokeWidth={1} className="w-4 h-4" />
        <span className="text-sm font-medium">{viewCount.toLocaleString()}</span>
      </div>

      {isPublic && (
        <>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />

          {/* Net Score Display */}
          <div className="flex items-center gap-2">
            <TrendingUp className={cn(
              "w-4 h-4",
              netVotes > 0 ? "text-green-600" : netVotes < 0 ? "text-red-600" : "text-slate-500"
            )} />
            <span className={cn(
              "text-sm font-semibold",
              netVotes > 0 ? "text-green-600" : netVotes < 0 ? "text-red-600" : "text-slate-600"
            )}>
              {netVotes > 0 ? `+${netVotes}` : netVotes}
            </span>
            <span className="text-xs text-slate-500">({votePercentage}% positive)</span>
          </div>

          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />

          {/* Vote Buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 px-3 transition-all duration-200",
                currentVote?.isUpvote
                  ? "text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
                  : "text-slate-600 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
              )}
              onClick={() => handleVote(true)}
              disabled={loading || isOwner}
            >
              <ThumbsUp className={cn(
                "w-4 h-4 mr-1 transition-transform",
                currentVote?.isUpvote && "scale-110"
              )} />
              {votes.upvotes}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 px-3 transition-all duration-200",
                currentVote && !currentVote.isUpvote
                  ? "text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
                  : "text-slate-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              )}
              onClick={() => handleVote(false)}
              disabled={loading || isOwner}
            >
              <ThumbsDown className={cn(
                "w-4 h-4 mr-1 transition-transform",
                currentVote && !currentVote.isUpvote && "scale-110"
              )} />
              {votes.downvotes}
            </Button>
          </div>

          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />

          {/* Share Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" 
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-slate-500">
          <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          <span className="text-xs">Updating...</span>
        </div>
      )}
    </div>
  )
}
