import { Info } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="info">
        <Info />
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>
          Here&apos;s some helpful information you should know.
        </AlertDescription>
      </Alert>
    </div>
  )
}
