import { Theme } from "@/registry/default/ui/theme"

export default function Component() {
  return (
    <div className="flex gap-3 items-center">
      <Theme variant="button" size="sm" />
      <Theme variant="button" size="md" />
      <Theme variant="button" size="lg" />
    </div>
  )
}
