"use client"

import { ChevronDown } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function SplitButton() {
  return (
    <div className="relative inline-flex rounded-md shadow-sm">
      {/* Main action button */}
      <Button className="rounded-r-none px-6 py-2">Action</Button>
      <div className="border-x"></div>
      <Button
        className="flex items-center justify-center rounded-l-none px-3 py-2"
       
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
