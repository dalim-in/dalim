import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  return (
    <div className="flex gap-2">
      <Button variant={"outline"} size={"icon"}>
        <ChevronLeft />
      </Button>
      <Button variant={"outline"} size={"icon"}>
        <ChevronRight />
      </Button>
    </div>
  )
}
