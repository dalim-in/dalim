import { Theme } from "@/registry/default/ui/theme"

export default function Component() {
  return (
    <div>
      <Theme
        variant="grid"
        size="md"
        showLabel
        themes={["light", "dark"]}
      />
    </div>
  )
}
