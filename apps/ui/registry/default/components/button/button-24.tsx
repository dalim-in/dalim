"use client"

import { useState } from "react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group"

export default function Component() {
  const [value, setValue] = useState<string>("left")

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={value}
      onValueChange={(value) => {
        if (value) setValue(value)
      }}
    >
      <ToggleGroupItem className="flex-1" value="left">
        Butt
      </ToggleGroupItem>
      <ToggleGroupItem className="flex-1" value="center">
        Round
      </ToggleGroupItem>
      <ToggleGroupItem className="flex-1" value="right">
        Square
      </ToggleGroupItem>
    </ToggleGroup>
  )
}