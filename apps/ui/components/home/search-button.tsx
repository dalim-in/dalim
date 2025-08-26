"use client"

import { getColors } from "@/lib/colors"
import { source } from "@/lib/source"

import { CommandMenu } from "../command-menu"
import { siteConfig } from "@/lib/config"

export function SearchButton() {
  const colors = getColors()
  const pageTree = source.pageTree

  return (
    <div className="bg-background text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:ring-ring/50 mt-6 inline-flex h-10 w-fit min-w-72 cursor-text rounded-full border px-4 py-2 text-sm outline-none focus:ring-[3px]">
      <CommandMenu
        tree={pageTree}
        colors={colors}
        navItems={siteConfig.navItems}
      />
    </div>
  )
}
