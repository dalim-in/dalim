import { Card, CardContent, CardHeader, CardTitle } from "@dalim/core/ui/card" 
import { FileText, Eye, Download } from "lucide-react"

interface DashboardStatsProps {
  totalFonts: number
  totalFontViews: number
  totalFontDownloads: number 
  totalGraphics: number
  totalGraphicViews: number
  totalGraphicDownloads: number 
}

export function DashboardStats({ totalFonts, totalFontViews, totalFontDownloads, totalGraphics, totalGraphicViews, totalGraphicDownloads }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Fonts",
      value: totalFonts,
      icon: FileText,
      description: "Fonts in your collection",
    },
    {
      title: "Total Font Views",
      value: totalFontViews,
      icon: Eye,
      description: "Times your fonts were viewed",
    },
    {
      title: "Total Font Downloads",
      value: totalFontDownloads,
      icon: Download,
      description: "Times your fonts were downloaded",
    },
    {
      title: "Total Graphics",
      value: totalGraphics,
      icon: FileText,
      description: "Fonts in your collection",
    },
    {
      title: "Total Graphic Views",
      value: totalGraphicViews,
      icon: Eye,
      description: "Times your fonts were viewed",
    },
    {
      title: "Total Graphic Downloads",
      value: totalGraphicDownloads,
      icon: Download,
      description: "Times your fonts were downloaded",
    },
  ]

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

       
    </div>
  )
}
