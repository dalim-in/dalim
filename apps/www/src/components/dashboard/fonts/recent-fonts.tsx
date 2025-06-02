import { Card, CardContent, CardHeader, CardTitle } from "@dalim/core/ui/card"
import { Badge } from "@dalim/core/ui/badge"
import { Button } from "@dalim/core/ui/button"
import { Eye, Download, Calendar } from "lucide-react"
import Link from "next/link"

interface Font {
  id: string
  name: string
  description: string | null
  type: string
  category: string | null;
  viewCount: number
  downloadCount: number
  createdAt: Date
  featured: boolean
}

interface RecentFontsProps {
  fonts: Font[]
}

export function RecentFonts({ fonts }: RecentFontsProps) {
  if (fonts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Fonts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No fonts uploaded yet</p>
            <Button asChild>
              <Link href="/upload">Upload Your First Font</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Fonts</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/fonts">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {fonts.slice(0, 3).map((font) => (
            <div key={font.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{font.name}</h3>
                  {font.featured && (
                    <Badge variant="default" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                 <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(font.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {font.viewCount}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {font.downloadCount}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="outline" className="text-xs">
                  {font.type}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {font.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
