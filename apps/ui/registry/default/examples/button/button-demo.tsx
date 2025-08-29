"use client"

import { Button, LiquidButton, MetalButton } from "@/registry/default/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 md:flex-row">
      <Button>Button</Button>
      <LiquidButton>Liquid Button</LiquidButton>
      <MetalButton>Metal Button</MetalButton>
    </div>
  )
}
