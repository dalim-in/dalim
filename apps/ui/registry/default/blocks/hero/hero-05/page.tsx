import { HeroSection } from "@/registry/default/blocks/hero/hero-05/components/hero"
import { PixelAnimation } from "@/registry/default/ui/backgrounds/pixel-animation"

export default function DemoOne() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-y-auto">
      <PixelAnimation
        className="absolute inset-0 z-0 h-full opacity-30"
        pixelGap={12}
      />
      <HeroSection />
    </div>
  )
}
