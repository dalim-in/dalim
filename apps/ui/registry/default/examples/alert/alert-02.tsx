"use client"

import { useState } from "react"
import { CircleAlertIcon, XIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert"

export default function Component() {
  const [isActive, setIsActive] = useState(true)
  if (!isActive) return null
  return (
    <div className="flex w-full justify-center p-6">
      <div className="w-full max-w-lg">
        <Alert className="flex justify-between">
          <CircleAlertIcon />
          <div className="flex flex-1 flex-col gap-1">
            <AlertTitle>Verify your email to activate your account</AlertTitle>
            <AlertDescription>
              We&apos;ve sent a confirmation link to your inbox. Check your
              email to complete the sign-up.
            </AlertDescription>
          </div>
          <button className="cursor-pointer" onClick={() => setIsActive(false)}>
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </button>
        </Alert>
      </div>
    </div>
  )
}
