"use client"

import { useState } from "react"
import { Button } from "@dalim/core/ui/button"
import { MoreHorizontal, Trash2, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@dalim/core/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@dalim/core/ui/alert-dialog"
import { toast } from "sonner"
import type { Message } from "@/src/types/chat"
import { DALIM_URL } from "@dalim/auth"

interface MessageActionsProps {
  message: Message
  isCurrentUser: boolean
  onMessageDeleted: (messageId: string) => void
}

export function MessageActions({ message, isCurrentUser, onMessageDeleted }: MessageActionsProps) {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const deleteMessage = async () => {
    try {
      setDeleteLoading(true)
      const response = await fetch(`${DALIM_URL}/api/chat/messages/${message.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onMessageDeleted(message.id)
        setShowDeleteDialog(false)
        toast.success("Message deleted")
      } else {
        toast.error("Failed to delete message")
      }
    } catch (error) {
      console.error("Error deleting message:", error)
      toast.error("Failed to delete message")
    } finally {
      setDeleteLoading(false)
    }
  }

  // Only show actions for current user's messages
  if (!isCurrentUser) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={(e) => e.preventDefault()}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Message
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span>Delete Message</span>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this message? This action cannot be undone.
                {message.attachments.length > 0 && " All attachments will also be deleted."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteMessage}
                disabled={deleteLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
