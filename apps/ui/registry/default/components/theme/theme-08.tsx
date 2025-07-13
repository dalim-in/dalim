import { Theme } from "@/registry/default/ui/theme"

export default function Component() {
  return (
    <div>
      <Theme
         
        size="md"
        themes={["light", "dark", "system"]}
      />
    </div>
  )
}
