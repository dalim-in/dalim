import { DotPattern } from "@/registry/default/ui/backgrounds/dot-pattern"

export default function Component() {
  return (
    <div>
      <DotPattern
        dotSize={0.5}
        width={5}
        height={5}
        className="text-red-500 dark:text-lime-500"
      />
    </div>
  )
}
