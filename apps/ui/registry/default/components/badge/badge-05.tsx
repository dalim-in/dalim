import { Badge } from "@/registry/default/ui/badge"
import { BadgeCheck } from "lucide-react"

export default function Component() {
  return (
    <div className="space-y-4">
      <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <BadgeCheck className="h-3 w-3" />
          Verified
        </Badge>
    </div>
  )
}
