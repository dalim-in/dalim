"use client"

import { Input } from "@dalim/core/ui/input"
import { ArrowUpRight, SearchIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function DemoBlock() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between p-6 py-20">
      <h2 className="mb-10 w-full text-center text-5xl tracking-tighter">
        Choose your superpower
      </h2>
      <div className="grid h-full w-full gap-6 md:grid-cols-[6fr_4fr]">
        <div className="bg-secondary p-10">
          <div className="space-y-6">
            <h2 className="w-full text-5xl tracking-tighter">
              Windsurf Editor
            </h2>
            <p className="text-primary/60">
              IDE built to keep you in flow state. Instant, invaluable AI
              developer assistance where you want it, when you want it.
            </p>
            <div className="flex flex-wrap gap-2 space-y-2">
              <Button className="h-14 w-60">Download for Apple Silicon</Button>
              <Button variant={"outline"} className="h-14 w-60">
                Download for Intel
              </Button>
            </div>
            <p className="text-primary/60 -mt-4 underline">
              More download options
            </p>

            <div className="space-y-4 border-t border-dashed pt-6">
              <p className="text-sm tracking-wider uppercase">
                Feature overview
              </p>
              <div className="grid grid-cols-[3fr_7fr]">
                <div className="flex items-center gap-2">
                  <p className="text-sm hover:underline">Cascade</p>
                  <ArrowUpRight className="w-5" />
                </div>
                <p className="pl-10 text-sm">
                  AI agent that can build entire applications end to end
                </p>
              </div>
              <div className="grid grid-cols-[3fr_7fr]">
                <div className="flex items-center gap-2">
                  <p className="text-sm hover:underline">Tab</p>
                  <ArrowUpRight className="w-5" />
                </div>
                <p className="pl-10 text-sm">
                  Autocomplete code suggestions powered by context
                </p>
              </div>
              <div className="grid grid-cols-[3fr_7fr]">
                <div className="flex items-center gap-2">
                  <p className="text-sm hover:underline">Browser</p>
                </div>
                <p className="pl-10 text-sm">
                  Get real-time context from your browser
                </p>
              </div>
              <div className="grid grid-cols-[3fr_7fr]">
                <div className="flex items-center gap-2">
                  <p className="text-sm hover:underline">Terminal Command</p>
                </div>
                <p className="pl-10 text-sm">
                  Natural language instructions in terminal
                </p>
              </div>
            </div>
            <div className="flex w-fit items-center gap-2 border-b pb-2">
              <p className="text-md">Learn more about Windsurf</p>
              <ArrowUpRight className="w-5" />
            </div>
          </div>
        </div>
        <div className="w-full border p-10">
          <div className="space-y-6">
            <h2 className="w-full text-5xl tracking-tighter">
              Windsurf Plugins
            </h2>
            <p className="text-primary/60">
              Install the Windsurf Plugin in your favorite code editor.
            </p>
            <div className="*:not-first:mt-2">
              <div className="relative">
                <Input
                  className="peer ps-9 pe-3"
                  placeholder="Search plugins..."
                  type="search"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <SearchIcon size={16} />
                </div>
                <button
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Submit search"
                  type="submit"
                ></button>
              </div>
            </div>
            <div className="space-y-2 h-[320px] overflow-auto">
              <div className="hover:bg-secondary flex gap-3 items-center cursor-pointer rounded-xl p-3">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-8 items-center justify-center object-contain"
                />
                <h2 className="w-full text-md tracking-tighter">
                  Visual Studio Code
                </h2>
                 <ArrowUpRight className="w-7 mr-4" />
              </div>
              <div className="hover:bg-secondary flex gap-3 items-center cursor-pointer rounded-xl p-3">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-8 items-center justify-center object-contain"
                />
                <h2 className="w-full text-md tracking-tighter">
                  Visual Studio Code
                </h2>
                 <ArrowUpRight className="w-7 mr-4" />
              </div>
              <div className="hover:bg-secondary flex gap-3 items-center cursor-pointer rounded-xl p-3">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-8 items-center justify-center object-contain"
                />
                <h2 className="w-full text-md tracking-tighter">
                  Visual Studio Code
                </h2>
                 <ArrowUpRight className="w-7 mr-4" />
              </div>
              <div className="hover:bg-secondary flex gap-3 items-center cursor-pointer rounded-xl p-3">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-8 items-center justify-center object-contain"
                />
                <h2 className="w-full text-md tracking-tighter">
                  Visual Studio Code
                </h2>
                 <ArrowUpRight className="w-7 mr-4" />
              </div>
              <div className="hover:bg-secondary flex gap-3 items-center cursor-pointer rounded-xl p-3">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-8 items-center justify-center object-contain"
                />
                <h2 className="w-full text-md tracking-tighter">
                  Visual Studio Code
                </h2>
                 <ArrowUpRight className="w-7 mr-4" />
              </div>
              <div className="hover:bg-secondary flex gap-3 items-center cursor-pointer rounded-xl p-3">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-8 items-center justify-center object-contain"
                />
                <h2 className="w-full text-md tracking-tighter">
                  Visual Studio Code
                </h2>
                 <ArrowUpRight className="w-7 mr-4" />
              </div>
              <div className="hover:bg-secondary flex gap-3 items-center cursor-pointer rounded-xl p-3">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-8 items-center justify-center object-contain"
                />
                <h2 className="w-full text-md tracking-tighter">
                  Visual Studio Code
                </h2>
                 <ArrowUpRight className="w-7 mr-4" />
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
