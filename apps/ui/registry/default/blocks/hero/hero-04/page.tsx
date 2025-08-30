import { ShaderRGB } from "@/registry/default/ui/backgrounds/shader-rgb"
import { Button } from "@/registry/default/ui/button"

export default function DemoOne() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-y-auto">
      <ShaderRGB />
      <div className="mx-auto w-full max-w-3xl rounded-xl border border-white/20 p-2">
        <main className="relative overflow-hidden rounded-md border border-white/20 bg-black/20 py-10 shadow-2xl backdrop-blur-md">
          <h1 className="mb-3 text-center text-5xl font-extrabold tracking-tighter text-white md:text-[clamp(2rem,8vw,7rem)]">
            Design is <span className="text-[#fff200]">Everything</span>
          </h1>
          <p className="lg:text-md px-6 text-center text-xs text-white/60 md:text-sm">
            Unleashing creativity through bold visuals and limitless
            possibilities.
          </p>
          <div className="my-8 flex items-center justify-center gap-1">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-xs text-green-500">Available for New Projects</p>
          </div>

          <div className="flex justify-center">
            <Button
              variant={"outline"}
              className="cursor-pointer border border-white/20 bg-white/10 text-white hover:bg-white/10 hover:text-white"
              size={"lg"}
            >
              Let&apos;s Go
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
