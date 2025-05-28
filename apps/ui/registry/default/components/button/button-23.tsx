import { PlusIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  return (
    <Button  className="inline-flex has-[>svg]:px-3 items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:text-[#808080] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus:outline-dashed focus:outline-1 focus:outline-offset-[-4px] focus:outline-black shadow-[inset_-1px_-1px_0px_0px_#0A0A0A,inset_1px_1px_0px_0px_#FFF,inset_-2px_-2px_0px_0px_#808080,inset_2px_2px_0px_0px_#DFDFDF] active:shadow-[-1px_-1px_0px_0px_#FFF_inset,_1px_1px_0px_0px_#0A0A0A_inset,_-2px_-2px_0px_0px_#DFDFDF_inset,_2px_2px_0px_0px_#808080_inset]">
      <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
      <span className="max-sm:sr-only">Add new</span>
    </Button>
  )
}