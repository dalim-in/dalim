import { Hero } from "@/registry/default/blocks/hero/hero-04/components/hero"
import { ShaderRGB } from "@/registry/default/ui/backgrounds/shader-rgb"

export default function DemoOne() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-y-auto">
      <ShaderRGB />
      <Hero />
    </div>
  )
}
