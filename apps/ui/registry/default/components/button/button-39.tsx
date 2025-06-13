import {
  RiFacebookFill, 
  RiTwitterXFill,
} from "@remixicon/react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col gap-2"> 
      <Button className="bg-[#14171a] text-white after:flex-1 hover:bg-[#14171a]/90">
        <span className="pointer-events-none me-2 flex-1">
          <RiTwitterXFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        Login with X
      </Button>
      <Button className="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90">
        <span className="pointer-events-none me-2 flex-1">
          <RiFacebookFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        Login with Facebook
      </Button> 
    </div>
  )
}