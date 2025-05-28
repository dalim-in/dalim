 
import { Button } from "@/registry/default/ui/button"
import { cn } from "@/registry/default/lib/utils"

export default function Component() {
  return (
    <div className="relative inline-flex overflow-hidden rounded-full p-px">
      {/* Spinning border layer */}
      <span
        className={cn(
          "absolute inset-[-1000%] animate-[spin_2s_linear_infinite]",
          "bg-[conic-gradient(from_90deg_at_50%_50%,#4e4e4e_0%,#d4d4d4_50%,#414141_100%)]",
          "dark:bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]"
        )}
      />
      {/* Inner button using shadcn Button */}
      <Button
        variant="ghost"
        className="relative z-10 rounded-full bg-neutral-100 px-6 py-2 text-sm font-medium text-neutral-600 backdrop-blur-xl dark:bg-neutral-950 dark:text-neutral-100"
      >
        Spin Action
      </Button>
    </div>
  )
}