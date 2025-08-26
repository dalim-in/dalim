import { AlertTriangle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="warning">
        <AlertTriangle />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          Please review this information carefully before proceeding.
        </AlertDescription>
      </Alert>
    </div>
  )
}
