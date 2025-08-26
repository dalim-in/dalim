import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

import { buttonVariants } from "@/registry/default/ui/button"
import { Separator } from "@/registry/default/ui/separator"

export function Hero() {
  return (
    <div className="mb-10 flex flex-col items-center">
      <main className="text-center">
        <div className="text-center">
          <Link
            href={"/docs/backgrounds/shader-ripple"}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "rounded-full mt-10"
            )}
          >
            🎉 <Separator className="mx-2 h-4" orientation="vertical" />
            Introducing {"Shader Ripple"}
            <ChevronRight className="text-muted-foreground ml-1 size-4" />
          </Link>
          <h1 className="text-7xl mt-10 md:leading-24 font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">
            <span className="font-thin italic">Beautiful</span>
            <br />
            <span className="text-brand font-black tracking-tight">
              UI Design
            </span>
          </h1>

          {/* Description */}
          <p className="text-primary/60 mx-auto my-4 max-w-sm md:max-w-xl text-xs leading-relaxed font-light">
            Discover the essence of creativity in our exquisite collection of
            top-tier abstract design assets. Each piece is a blend of beauty and
            utility, perfect for elevating any project.
          </p>

          {/* Buttons */}
        </div>
      </main>
      {/* <SearchButton /> */}
      
    </div>
  )
}
