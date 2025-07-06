import { Text } from "@/registry/default/ui/text"

export default function Component() {
  return (
    <div>
      <Text variant="scramble" className="text-2xl" speed={0.03}>
        Decrypting...
      </Text>
    </div>
  )
}
