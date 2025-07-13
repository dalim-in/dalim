import { Theme } from "@/registry/default/ui/theme"

export default function Component() {
  return (
    <div className="flex items-center gap-3">
      <Theme variant="switch" size="sm" />
      <Theme variant="switch" size="md" />
      <Theme variant="switch" size="lg" />
    </div>
  )
}
