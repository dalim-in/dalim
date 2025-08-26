import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <section className="space-y-4">
        <Alert size="sm">
          <AlertCircle />
          <AlertTitle>Small Alert</AlertTitle>
          <AlertDescription>
            This is a small alert with compact spacing.
          </AlertDescription>
        </Alert>

        <Alert size="md">
          <AlertCircle />
          <AlertTitle>Medium Alert (Default)</AlertTitle>
          <AlertDescription>
            This is a medium-sized alert with standard spacing.
          </AlertDescription>
        </Alert>

        <Alert size="lg">
          <AlertCircle />
          <AlertTitle>Large Alert</AlertTitle>
          <AlertDescription>
            This is a large alert with generous spacing for important messages.
          </AlertDescription>
        </Alert>
      </section>
    </div>
  )
}
