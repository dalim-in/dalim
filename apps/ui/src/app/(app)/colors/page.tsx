import { getColors } from "@/src/lib/colors"
import { ColorPalette } from "@/src/components/colors/color-palette"
import { ColorPicker } from "@/src/components/colors/color-picker"

export const revalidate = false

export default function ColorsPage() {
  const colors = getColors()

  return (
    <div className="grid gap-3">
      <ColorPicker/>
      {colors.map((colorPalette) => (
        <ColorPalette key={colorPalette.name} colorPalette={colorPalette} />
      ))}
    </div>
  )
}
