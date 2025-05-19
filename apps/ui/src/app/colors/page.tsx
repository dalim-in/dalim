import type { Metadata } from "next"
import { ColorPalette } from "@/src/components/colors"
import { getColors } from "@/src/lib/colors"

export const metadata: Metadata = {
  title: "Colors - Dalim UI",
  description:
    "A collection of easing utility classes to enhance your Tailwind CSS animations and transitions.",
}

export default function ColorsPage() {
  const colors = getColors()

  return (
    <div className="mb-20 grid gap-3">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-center text-[clamp(2rem,8vw,7rem)] font-extrabold tracking-tighter">
          Colors
        </h1>
        <div className="mb-10 flex items-center justify-center">
          <p className="text-primary/60">
            Tailwind CSS colors in HSL, RGB, HEX and OKLCH formats.
          </p>
        </div>
      </div>
      {colors.map((colorPalette) => (
        <ColorPalette key={colorPalette.name} colorPalette={colorPalette} />
      ))}
    </div>
  )
}
