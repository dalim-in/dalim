"use client"

import * as React from "react"

import { useState } from "react"

export function useCopy(duration = 1500) {
  const [copied, setCopied] = useState<boolean>(false)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), duration)
      return true
    } catch (err) {
      console.error("Failed to copy text: ", err)
      return false
    }
  }

  return {
    copied,
    copy,
  }
}

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return
    }

    if (!value) return

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      if (onCopy) {
        onCopy()
      }

      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    }, console.error)
  }

  return { isCopied, copyToClipboard }
}
