import { RenderCanvas } from "@/registry/default/ui/backgrounds/render-canvas"

export default function Component() {
  return (
    <main className="flex h-full w-full items-center justify-center overflow-hidden rounded-md border">
      <RenderCanvas />
    </main>
  )
}
