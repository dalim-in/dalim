import { GridPattern } from "@/registry/default/ui/backgrounds/grid-pattern"

export default function Component() {
  return (
    <div className="flex w-full justify-center p-6">
      <GridPattern width={100} height={10} />
    </div>
  )
}
