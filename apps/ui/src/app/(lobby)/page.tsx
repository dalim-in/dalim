import Link from "next/link"
import { BlockPreviewHome } from "@/src/components/blocks/block-preview"
import { BlockProvider } from "@/src/components/blocks/block-provider"
import BlockToolbar from "@/src/components/blocks/block-toolbar"

import KeyboardButton from "@/registry/default/components/button/button-43"
import { Button } from "@/registry/default/ui/button"

import { CategoryHomeUI } from "../../components/home/category"
import { Hero } from "../../components/home/hero"

export default function Page() {
  return (
    <div data-home>
      <div className="flex flex-col items-center text-center">
        <Hero />
      </div>
      <div className="before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))] relative before:absolute before:-inset-x-6 before:top-0 before:h-px"></div>
      <CategoryHomeUI />
      <div className="border p-6 pt-6">
        <KeyboardButton />
      </div>
      <div className="border-x mx-auto max-w-6xl p-6">
        <BlockProvider block={"dashboard-03"}>
          <div className="mb-4 -mt-2 flex flex-col items-center justify-between gap-2 md:flex-row">
            <Link href={"/blocks"}>
              <Button>View All Blocks</Button>
            </Link>
            <BlockToolbar block={"dashboard-03"} />
          </div>
          <BlockPreviewHome block={"dashboard-03"} />
        </BlockProvider>
      </div>
    </div>
  )
}
