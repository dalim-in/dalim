"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"

// Map of select values to their respective URLs
const LINK_MAP: Record<string, string> = {
  dalim: "https://dalim.in",
  ui: "https://ui.dalim.in",
  ali: "https://ali.dalim.in",
  agency: "https://agency.dalim.in",
  works: "https://works.dalim.in",
  fonts: "https://fonts.dalim.in",
}

export default function LinkSelect() {
  const router = useRouter()
  const [value, setValue] = useState("")

  const handleValueChange = (newValue: string) => {
    setValue(newValue)

    // Get the URL from the map
    const url = LINK_MAP[newValue]

    if (url) {
      if (url.startsWith("http")) {
        // For external links — same tab
        window.location.href = url
      } else {
        // For internal links — use router
        router.push(url)
      }
    }
  }

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Dalim" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dalim">Dalim</SelectItem>
        <SelectItem value="ui">UI</SelectItem>
        <SelectItem value="agency">Agency</SelectItem>
        <SelectItem disabled value="ali">Ali</SelectItem>
        <SelectItem disabled value="works">Works</SelectItem>
        <SelectItem disabled value="fonts">Fonts</SelectItem>
      </SelectContent>
    </Select>
  )
}
