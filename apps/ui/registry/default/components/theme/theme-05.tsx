import { Theme } from "@/registry/default/ui/theme"

export default function Component() {
  return (
    <div className="flex items-center gap-3">
      <Theme
        variant="tabs"
        size="sm"
        themes={["light", "dark", "system"]}
      />
      <Theme
        variant="tabs"
        size="md"
        showLabel
        themes={["light", "dark", "system"]}
      />
    </div>
  )
}
