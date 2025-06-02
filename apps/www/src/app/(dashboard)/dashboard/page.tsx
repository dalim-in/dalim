import { DashboardStats } from "@/src/components/dashboard/dashboard-stats"
import { FontsByCategory } from "@/src/components/dashboard/fonts/fonts-by-category"
import { RecentFonts } from "@/src/components/dashboard/fonts/recent-fonts"
import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { redirect } from "next/navigation" 

async function getDashboardData(userId: string) {
  const [fonts, totalViews, totalDownloads] = await Promise.all([
    prisma.font.findMany({
      where: { userId }, // Filter by current user ID
      orderBy: { createdAt: "desc" },
    }),
    prisma.font.aggregate({
      where: { userId }, // Filter by current user ID
      _sum: { viewCount: true },
    }),
    prisma.font.aggregate({
      where: { userId }, // Filter by current user ID
      _sum: { downloadCount: true },
    }),
  ])

  // Group fonts by category
  const fontsByCategory = fonts.reduce(
  (acc, font) => {
    if (font.category) {
      acc[font.category] = (acc[font.category] || 0) + 1
    }
    return acc
  },
  {} as Record<string, number>,
)


  // Group fonts by type
  const fontsByType = fonts.reduce(
    (acc, font) => {
      acc[font.type] = (acc[font.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    fonts,
    totalFonts: fonts.length,
    totalViews: totalViews._sum.viewCount || 0,
    totalDownloads: totalDownloads._sum.downloadCount || 0,
    fontsByCategory,
    fontsByType,
    recentFonts: fonts.slice(0, 5),
  }
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const dashboardData = await getDashboardData(session.user.id)

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {session.user.name}! Here's an overview of your fonts.
        </p>
      </div>

      <DashboardStats
        totalFonts={dashboardData.totalFonts}
        totalViews={dashboardData.totalViews}
        totalDownloads={dashboardData.totalDownloads} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
        <RecentFonts fonts={dashboardData.recentFonts} />
        <FontsByCategory fontsByCategory={dashboardData.fontsByCategory} />
      </div>
    </div>
  )
}
