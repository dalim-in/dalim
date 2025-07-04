import {
  RiInstagramLine,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  return (
    <div className="inline-flex flex-wrap gap-2">
      <Button variant="outline" aria-label="Login with Google" size="icon">
        <RiGoogleFill size={16} aria-hidden="true" />
      </Button>
      <Button variant="outline" aria-label="Login with Facebook" size="icon">
        <RiInstagramLine size={16} aria-hidden="true" />
      </Button>
      <Button variant="outline" aria-label="Login with X" size="icon">
        <RiTwitterXFill size={16} aria-hidden="true" />
      </Button>
      <Button variant="outline" aria-label="Login with GitHub" size="icon">
        <RiGithubFill size={16} aria-hidden="true" />
      </Button>
    </div>
  )
}