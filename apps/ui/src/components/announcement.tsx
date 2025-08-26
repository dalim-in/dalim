import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/registry/default/ui/badge"

export function Announcement() {
  return (
    <Badge asChild variant="secondary" className="rounded-full">
      <Link href="/docs/components/calendar">
        New Calendar Component <ArrowRightIcon />
      </Link>
    </Badge>
  )
}
