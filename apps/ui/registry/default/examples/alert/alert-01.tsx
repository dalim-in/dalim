"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert"
import { Button } from "@/registry/default/ui/button"

export default function Component() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) {
    return (
      <div className="flex w-full justify-center p-6">
        <div className="w-full max-w-lg text-center">
          <p className="text-muted-foreground mb-4">Alert dismissed</p>
          <Button variant="outline" onClick={() => setDismissed(false)}>
            Show Alert
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex w-full justify-center p-6">
      <div className="w-full max-w-lg">
        <Alert>
          <Download />
          <AlertTitle>New version available</AlertTitle>
          <AlertDescription>
            <p className="mb-3">
              Version 2.1.0 is now available with security improvements.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Download Now</Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDismissed(true)}
              >
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
