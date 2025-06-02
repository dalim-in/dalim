import { Card, CardContent, CardHeader, CardTitle } from "@dalim/core/ui/card"
import { Progress } from "@dalim/core/ui/progress"
import { Palette } from "lucide-react"

interface FontsByCategoryProps {
  fontsByCategory: Record<string, number>
}

export function FontsByCategory({ fontsByCategory }: FontsByCategoryProps) {
  const categories = Object.entries(fontsByCategory)
  const totalFonts = categories.reduce((sum, [, count]) => sum + count, 0)

  if (categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Fonts by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No fonts to categorize yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Fonts by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => {
              const percentage = (count / totalFonts) * 100
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium capitalize">{category.toLowerCase()}</span>
                    <span className="text-muted-foreground">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
