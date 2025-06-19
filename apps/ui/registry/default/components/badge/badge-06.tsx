import { Badge } from "@/registry/default/ui/badge"

export default function Component() {
  return (
    <div className="space-y-4">
      <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="outline"
        >
          20+
        </Badge>
    </div>
  )
}
