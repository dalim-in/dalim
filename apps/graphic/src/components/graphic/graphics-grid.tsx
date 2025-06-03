"use client"

import Image from "next/image"
import Link from "next/link" 
import { Badge } from "@dalim/core/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@dalim/core/ui/avatar"
import { Button } from "@dalim/core/ui/button"
import { Eye, Download } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface GraphicsGridProps {
  graphics: Array<{
    id: string
    title: string
    description: string | null
    category: string
    images: string[]
    tags: string[]
    viewCount: number
    downloadCount: number
    createdAt: Date
    user: {
      id: string
      name: string | null
      username: string | null
      image: string | null
    }
  }> 
  pages: number
  currentPage: number
}

export function GraphicsGrid({ graphics, pages, currentPage }: GraphicsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/graphics?${params.toString()}`)
  }

  if (graphics.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No graphics found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria or browse all graphics.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 mt-6">
        
      <div className="grid grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {graphics.map((graphic) => (
          <div key={graphic.id} className="group border rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-0">
              <Link href={`/${graphic.id}`}>
                <div className="relative aspect-video overflow-hidden -mt-6 rounded-t-lg">
                  <Image
                    src={graphic.images[0] || "/placeholder.svg"}
                    alt={graphic.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {graphic.images.length > 1 && (
                    <Badge className="absolute top-2 right-2 bg-background/80 text-foreground">
                      +{graphic.images.length - 1}
                    </Badge>
                  )}
                </div>
              </Link>

              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                   <h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">{graphic.title}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {graphic.category.replace("_", " ")}
                  </Badge>
                </div>
 
                 
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border">
                      <AvatarImage src={graphic.user.image || ""} />
                      <AvatarFallback className="text-xs">
                        {graphic.user.name?.[0] || graphic.user.username?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{graphic.user.name || graphic.user.username}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {graphic.viewCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {graphic.downloadCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>

          {Array.from({ length: Math.min(5, pages) }, (_, i) => {
            const page = i + 1
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            )
          })}

          <Button variant="outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pages}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
