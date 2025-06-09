"use client"

import { useState, useEffect, useCallback } from "react"
import type { Conversation } from "@/src/types/chat"

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/chat/conversations")
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
      } else {
        setError("Failed to fetch conversations")
      }
    } catch (err) {
      setError("Error fetching conversations")
      console.error("Error fetching conversations:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchConversation = useCallback(async (conversationId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/chat/conversations/${conversationId}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedConversation(data)
      } else {
        setError("Failed to fetch conversation")
      }
    } catch (err) {
      setError("Error fetching conversation")
      console.error("Error fetching conversation:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const sendMessage = useCallback(
    async (conversationId: string, content: string, attachments: File[] = []) => {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append("conversationId", conversationId)
        formData.append("content", content)

        attachments.forEach((file) => {
          formData.append("attachments", file)
        })

        const response = await fetch("/api/chat/messages", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const newMessage = await response.json()

          // Update selected conversation with new message
          setSelectedConversation((prev) =>
            prev
              ? {
                  ...prev,
                  messages: [...prev.messages, newMessage],
                }
              : null,
          )

          // Refresh conversations list
          await fetchConversations()

          return newMessage
        } else {
          setError("Failed to send message")
        }
      } catch (err) {
        setError("Error sending message")
        console.error("Error sending message:", err)
      } finally {
        setLoading(false)
      }
    },
    [fetchConversations],
  )

  const createDirectConversation = useCallback(
    async (otherUserId: string) => {
      try {
        setLoading(true)
        const response = await fetch("/api/chat/conversations/direct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otherUserId }),
        })

        if (response.ok) {
          const conversation = await response.json()
          setSelectedConversation(conversation)
          await fetchConversations()
          return conversation
        } else {
          setError("Failed to create conversation")
        }
      } catch (err) {
        setError("Error creating conversation")
        console.error("Error creating conversation:", err)
      } finally {
        setLoading(false)
      }
    },
    [fetchConversations],
  )

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  return {
    conversations,
    selectedConversation,
    loading,
    error,
    setSelectedConversation,
    fetchConversations,
    fetchConversation,
    sendMessage,
    createDirectConversation,
  }
}
