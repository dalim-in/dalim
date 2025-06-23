"use client"
 
import { VisualCard } from "./visual-card" 

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
   

  if (visuals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No visuals found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-3">
       
      <div
        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3"} >
        {visuals.map((visual) => (
          <VisualCard key={visual.id} visual={visual} currentUserId={currentUserId} />
        ))}
      </div>
    </div>
  )
}
