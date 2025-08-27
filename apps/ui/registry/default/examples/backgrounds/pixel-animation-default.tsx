import { PixelAnimation } from "@/registry/default/ui/backgrounds/pixel-animation"

export default function Component() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <PixelAnimation pixelGap={10} />
    </div>
  )
}
