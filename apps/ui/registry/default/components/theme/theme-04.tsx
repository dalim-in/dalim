import { Theme } from "@/registry/default/ui/theme"

export default function Component() {
  return (
    <div className="flex items-center gap-3">
      <Theme
        size="sm"
        variant="dropdown"
        themes={["light", "dark", "system"]}
      />
      <Theme
        size="md"
        variant="dropdown"
        themes={["light", "dark", "system"]}
      /> 
      <Theme
        size="sm"
        variant="dropdown"
        showLabel
        themes={["light", "dark", "system"]}
      /> 
      <Theme
        size="lg"
        variant="dropdown"
        showLabel
        themes={["light", "dark", "system"]}
      />
    </div>
  )
}
