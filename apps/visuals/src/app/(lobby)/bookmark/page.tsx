import { auth } from "@dalim/auth"
import { getUserBookmarks } from "@/src/actions/bookmark-actions"
import { prisma } from "@dalim/db"
import { VisualsGrid } from "@/src/components/visuals/visuals-grid"
import { redirect } from "next/navigation"

export default async function BookmarksPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const bookmarks = await getUserBookmarks(session.user.id)
  const visualIds = bookmarks.map((b) => b.itemId)

  const visuals = await prisma.visuals.findMany({
    where: {
      id: {
        in: visualIds,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookmarks</h1>
        <p className="text-muted-foreground mt-2">Your saved visual inspirations</p>
      </div>

      {visuals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bookmarks yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Start bookmarking visuals you love!</p>
        </div>
      ) : (
        <VisualsGrid visuals={visuals} currentUserId={session.user.id} />
      )}
    </div>
  )
}
