"use client"

import { useColors } from "@/src/hooks/use-colors"
import { useCopyToClipboard } from "@/src/hooks/use-copy"
import { type Color } from "@/src/lib/colors"
import { Check, Clipboard } from "lucide-react"
import { toast } from "sonner"

export function Color({ color }: { color: Color }) {
  const { format } = useColors()
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <button
      key={color.hex}
      className="group relative flex aspect-[3/1] w-full flex-1 flex-col gap-2 text-[--text] sm:aspect-[2/2] sm:h-auto sm:w-auto [&>svg]:absolute [&>svg]:top-4 [&>svg]:right-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-0 [&>svg]:transition-opacity"
      style={{ "--text": color.foreground } as React.CSSProperties}
      onClick={() => {
        copyToClipboard(color[format])
        toast.success(`Copied ${color[format]} to clipboard.`)
      }}
    >
      {isCopied ? (
        <Check className="group-hover:opacity-100" />
      ) : (
        <Clipboard className="group-hover:opacity-100" />
      )}
      <div
        className="w-full flex-1 rounded-md md:rounded-lg"
        style={{ backgroundColor: `hsl(${color.hsl})` }}
      />
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <span className="text-muted-foreground group-hover:text-foreground hidden font-mono text-xs tabular-nums transition-colors lg:flex">
          {color.className}
        </span>
        <span className="text-muted-foreground group-hover:text-foreground font-mono text-xs tabular-nums transition-colors lg:hidden">
          {color.scale}
        </span>
      </div>
    </button>
  )
}
