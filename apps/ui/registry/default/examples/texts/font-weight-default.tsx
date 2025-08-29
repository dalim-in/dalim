import { FontWeight } from "@/registry/default/ui/texts/font-weight"

export default function Component() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <FontWeight
        text="Let's Go"
        fontSize={60}
        className="dark:text-[#fff200]"
      />
    </div>
  )
}
