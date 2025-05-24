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
    <div className=" grid gap-3">
      {colors.map((colorPalette) => (
        <ColorPalette key={colorPalette.name} colorPalette={colorPalette} />
      ))}
    </div>
  )
}
