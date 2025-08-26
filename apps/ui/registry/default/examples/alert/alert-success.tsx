import { CheckCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="success">
        <CheckCircle />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          Your action was completed successfully!
        </AlertDescription>
      </Alert>
    </div>
  )
}
