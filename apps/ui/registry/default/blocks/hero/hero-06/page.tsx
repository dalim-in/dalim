import { HeroSection } from "@/registry/default/blocks/hero/hero-06/components/hero"
import { VoidAnimation } from "@/registry/default/ui/backgrounds/void-animation"

export default function DemoOne() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden">
      <VoidAnimation
        voidBallsAmount={3}
        width={1300}
        height={1100}
        voidBallsColor="#fff200"
        plasmaBallsColor="#fff200"
        plasmaBallsStroke="#fff200"
        gooeyCircleSize={30}
        blendMode="overlay"
        className="absolute inset-0 mx-auto h-full w-full"
      />
      <HeroSection />
    </div>
  )
}
