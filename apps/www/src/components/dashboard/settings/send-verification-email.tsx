"use client"

import { useState } from "react"
import { Button } from "@dalim/core/ui/button"
import { toast } from "@dalim/core/hooks/use-toast"
import { Mail } from 'lucide-react'

// Define a minimal user type that matches what we actually need
interface UserForVerification {
  id: string
  email: string | null
  name: string | null
}

interface SendVerificationEmailProps {
  user: UserForVerification
}

export function SendVerificationEmail({ user }: SendVerificationEmailProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSendVerificationEmail = async () => {
    if (!user.email) {
      toast({
        title: "Error",
        description: "No email address found.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Call your API endpoint instead of directly calling server functions
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: "Verification email sent",
          description: "Please check your email for the verification link.",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send verification email.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Verification email error:', error)
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSendVerificationEmail} disabled={isLoading} className="ml-2">
      <Mail className="h-3 w-3 mr-1" />
      {isLoading ? "Sending..." : "Verify Email"}
    </Button>
  )
}
