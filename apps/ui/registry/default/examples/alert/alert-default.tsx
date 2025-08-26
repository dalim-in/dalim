import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert"

export default function Component() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <AlertCircle />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert for general information.
        </AlertDescription>
      </Alert>
    </div>
  )
}
