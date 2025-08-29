import { VoidAnimation } from "@/registry/default/ui/backgrounds/void-animation"

export default function DemoOne() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <VoidAnimation
        voidBallsAmount={0}
        voidBallsColor="#fff200"
        plasmaBallsColor="#fff200"
        plasmaBallsStroke="#fff200"
        gooeyCircleSize={30}
        blendMode="overlay"
        className="mx-auto"
      />
    </div>
  )
}
