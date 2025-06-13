"use client"

import { useEffect, useState } from "react"
import { Check, Download, X } from "lucide-react"

import { cn } from "@/registry/default/lib/utils"
import { Button } from "@/registry/default/ui/button"

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onProcess?: () => Promise<boolean>
  processDuration?: number
}

export default function Components({
  className,
  onProcess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return Math.random() > 0.5
  },
  processDuration = 2000,
}: BtnProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [isScaling, setIsScaling] = useState(false)
  const [, setProgress] = useState(0)

  useEffect(() => {
    if (isProcessing) {
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const newProgress = (elapsed / processDuration) * 100

        if (newProgress >= 100) {
          clearInterval(interval)
          setProgress(100)
        } else {
          setProgress(newProgress)
        }
      }, 10)

      return () => clearInterval(interval)
    }
  }, [isProcessing, processDuration])

  async function handleClick() {
    if (isProcessing) return

    setIsProcessing(true)
    setIsSuccess(null)
    setProgress(0)

    await new Promise((resolve) => setTimeout(resolve, processDuration))
    const success = onProcess ? await onProcess() : true

    setIsSuccess(success)
    setIsProcessing(false)
    setIsScaling(true)

    setTimeout(() => {
      setIsSuccess(null)
      setProgress(0)
      setIsScaling(false)
    }, 2000)
  }

  return (
    <Button
      variant={"outline"}
      className={cn("", isProcessing && "cursor-wait", className)}
      onClick={handleClick}
      disabled={isProcessing}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center gap-2",
          isScaling && "animate-[scale_300ms_ease-in-out]"
        )}
      >
        {isSuccess === null ? (
          <>
            <Download
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                "group-hover:scale-110",
                isProcessing && "animate-bounce"
              )}
            />
            <span>{isProcessing ? "Processing..." : "Download"}</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-green-500">Complete!</span>
          </>
        ) : (
          <>
            <X className="h-4 w-4 text-red-500" />
            <span className="text-red-500">Failed</span>
          </>
        )}
      </div>
    </Button>
  )
}
