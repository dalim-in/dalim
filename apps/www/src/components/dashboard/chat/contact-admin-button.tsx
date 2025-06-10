"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@dalim/core/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@dalim/core/ui/avatar"
import { Badge } from "@dalim/core/ui/badge"
import { ScrollArea } from "@dalim/core/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dalim/core/ui/dialog"
import { MessageCircle, Users } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { User } from "@/src/types/chat"
import { DALIM_URL } from "@dalim/auth"

interface ContactAdminButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function ContactAdminButton({ className, variant = "default", size = "default" }: ContactAdminButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [admins, setAdmins] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      fetchAdmins()
    }
  }, [open])

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${DALIM_URL}/api/users?role=ADMIN`)
      if (response.ok) {
        const data = await response.json()
        setAdmins(data)
      }
    } catch (error) {
      console.error("Error fetching admins:", error)
      toast.error("Failed to load admins")
    } finally {
      setLoading(false)
    }
  }

  const startConversationWithAdmin = async (adminId: string, adminName: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${DALIM_URL}/api/chat/conversations/direct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otherUserId: adminId }),
      })

      if (response.ok) {
        const conversation = await response.json()
        setOpen(false)
        router.push(`${DALIM_URL}/dashboard/chat?conversationId=${conversation.id}`)
        toast.success(`Started conversation with ${adminName}`)
      } else {
        toast.error("Failed to start conversation")
      }
    } catch (error) {
      console.error("Error starting conversation:", error)
      toast.error("Failed to start conversation")
    } finally {
      setLoading(false)
    }
  }

  // Don't show for admin users
  if (session?.user?.role === "ADMIN") {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Contact an Admin</span>
          </DialogTitle>
          <DialogDescription>
            Select an admin to start a conversation. They'll be notified of your message.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading admins...</div>
            </div>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {admins.map((admin) => (
                  <div
                    key={admin.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer border transition-colors"
                    onClick={() => startConversationWithAdmin(admin.id, admin.name || "Admin")}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={admin.image || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {admin.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{admin.name || "Admin"}</p>
                      <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
                      <Badge variant="default" className="text-xs mt-1">
                        {admin.role}
                      </Badge>
                    </div>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
                {admins.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">No admins available at the moment</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
