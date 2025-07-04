import { 
  RiGithubFill,
  RiGoogleFill, 
} from "@remixicon/react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline">
        <RiGoogleFill
          className="me-1 text-[#DB4437] dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
        Login with Google
      </Button> 
      <Button variant="outline">
        <RiGithubFill
          className="me-1 text-[#333333] dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
        Login with GitHub
      </Button>
    </div>
  )
}