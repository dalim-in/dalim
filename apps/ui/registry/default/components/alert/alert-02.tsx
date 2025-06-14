import {  PopcornIcon } from "lucide-react"

import {
  Alert, 
  AlertTitle,
} from "@/registry/default/ui/alert"

export default function Component() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
       
      <Alert>
        <PopcornIcon />
        <AlertTitle>
          This Alert has a title and an icon. No description.
        </AlertTitle>
      </Alert>
       
    </div>
  )
}
