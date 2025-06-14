import { CheckCircle2Icon } from "lucide-react"

import {
  LiquidAlert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert"

export default function Component() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <LiquidAlert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>
          This is an alert with icon, title and description.
        </AlertDescription>
      </LiquidAlert> 
    </div>
  )
}
