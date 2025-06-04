import { auth } from "@dalim/auth"
import { redirect } from "next/navigation"
import { getAllGraphicsForAdmin } from '../../../../../graphic/src/actions/graphic'
import { AdminGraphicsTable } from "@/src/components/admin/graphic/admin-graphics-table"

interface AdminGraphicsPageProps {
  searchParams: {
    page?: string
    search?: string
    category?: string
    user?: string
  }
}

export default async function AdminGraphicsPage({ searchParams }: AdminGraphicsPageProps) {
  const session = await auth()

  // Check if user is admin
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/")
  }

  const page = Number.parseInt(searchParams.page || "1")
  const search = searchParams.search || ""
  const category = searchParams.category || ""
  const user = searchParams.user || ""

  const { graphics, total, pages, currentPage } = await getAllGraphicsForAdmin({
    page,
    search,
    category,
    user,
    limit: 15,
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin - Graphics Management</h1>
        <p className="text-muted-foreground">Manage all graphics in the system</p>
      </div>

      <AdminGraphicsTable graphics={graphics} total={total} pages={pages} currentPage={currentPage} />
    </div>
  )
}
