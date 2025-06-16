"use client"

import { useState } from "react"
import { VisualCard } from "./visual-card"
import { Button } from "@dalim/core/ui/button"
import { Grid, List } from "lucide-react"

interface Visual {
  id: string
  title: string
  description: string | null
  category: string
  image: string
  link: string
  tags: string[]
  viewCount: number
  visitCount: number
  featured: boolean
  createdAt: Date
  user: {
    name: string | null
    image: string | null
  }
}

interface VisualsGridProps {
  visuals: Visual[]
  currentUserId?: string
}

export function VisualsGrid({ visuals, currentUserId }: VisualsGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (visuals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No visuals found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-3">
      <div className=" hidden justify-end">
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3" : "space-y-3"
        }
      >
        {visuals.map((visual) => (
          <VisualCard key={visual.id} visual={visual} currentUserId={currentUserId} viewMode={viewMode} />
        ))}
      </div>
    </div>
  )
}
