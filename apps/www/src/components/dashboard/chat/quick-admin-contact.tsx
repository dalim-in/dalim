"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@dalim/core/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@dalim/core/ui/card"
import { Textarea } from "@dalim/core/ui/textarea"
import { MessageCircle, Send } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { DALIM_URL } from "@dalim/auth"

export function QuickAdminContact() {
  const { data: session } = useSession()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const sendQuickMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message")
      return
    }

    try {
      setLoading(true)

      // First, get the first available admin
      const usersResponse = await fetch(`${DALIM_URL}/api/users?role=ADMIN`)
      if (!usersResponse.ok) {
        throw new Error("Failed to fetch admins")
      }

      const admins = await usersResponse.json()
      if (admins.length === 0) {
        toast.error("No admins available")
        return
      }

      // Create or get conversation with first admin
      const conversationResponse = await fetch(`${DALIM_URL}/api/chat/conversations/direct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otherUserId: admins[0].id }),
      })

      if (!conversationResponse.ok) {
        throw new Error("Failed to create conversation")
      }

      const conversation = await conversationResponse.json()

      // Send the message
      const formData = new FormData()
      formData.append("conversationId", conversation.id)
      formData.append("content", message)

      const messageResponse = await fetch(`${DALIM_URL}/api/chat/messages`, {
        method: "POST",
        body: formData,
      })

      if (!messageResponse.ok) {
        throw new Error("Failed to send message")
      }

      toast.success("Message sent to admin!")
      setMessage("")
      router.push(`${DALIM_URL}/dashboard/chat?conversationId=${conversation.id}`)
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  // Don't show for admin users
  if (session?.user?.role === "ADMIN") {
    return null
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span>Quick Admin Contact</span>
        </CardTitle>
        <CardDescription>Send a quick message to get help from our support team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe your issue or question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <Button onClick={sendQuickMessage} disabled={loading || !message.trim()} className="w-full">
          <Send className="h-4 w-4 mr-2" />
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </CardContent>
    </Card>
  )
}
