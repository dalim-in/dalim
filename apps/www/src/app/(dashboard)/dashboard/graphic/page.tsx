import { auth } from "@dalim/auth"
import { redirect } from "next/navigation"
import { getUserGraphics } from "../../../../../../graphic/src/actions/graphic"
import { GraphicsDashboard } from "@/src/components/dashboard/graphic/graphics-dashboard"

interface DashboardGraphicsPageProps {
  searchParams: {
    page?: string
    search?: string
    category?: string
  }
}

export default async function DashboardGraphicsPage({ searchParams }: DashboardGraphicsPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const page = Number.parseInt(searchParams.page || "1")
  const search = searchParams.search || ""
  const category = searchParams.category || ""

  const { graphics, total, pages, currentpage } = await getUserGraphics(session.user.id!, {
    page,
    search,
    category,
    limit: 10,
  })

  return (
    <div className="mt-3">
      
      <GraphicsDashboard graphics={graphics} total={total} pages={pages} currentpage={currentpage} />
    </div>
  )
}
