import { Text } from "@/registry/default/ui/text"

export default function Component() {
  return (
    <div>
      <Text variant="typewriter" className="text-2xl" speed={0.08}>
        Hello, I'm typing...
      </Text>
    </div>
  )
}
