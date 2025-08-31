import { ShaderRGB } from "@/registry/default/ui/backgrounds/shader-rgb" 
import { Hero } from "@/registry/default/blocks/hero/hero-04/components/hero"

export default function DemoOne() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-y-auto">
      <ShaderRGB />
      <Hero/>
    </div>
  )
}
