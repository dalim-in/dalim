import { auth, DALIM_URL } from "@dalim/auth"
import { getGraphicById } from "@/src/actions/graphic"
import { redirect, notFound } from "next/navigation" 
import { GraphicEditForm } from "@/src/components/graphic/graphic-edit-form"

interface EditGraphicPageProps {
  params: {
    id: string
  }
}

export default async function EditGraphicPage({ params }: EditGraphicPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect(`${DALIM_URL}/login`)
  }

  const graphic = await getGraphicById(params.id)

  if (!graphic) {
    notFound()
  }

  // Check if user owns the graphic
  if (graphic.user.id !== session.user.id) {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Graphic</h1>
          <p className="text-muted-foreground mt-2">Update your graphic information</p>
        </div>
        <GraphicEditForm graphic={graphic} />
      </div>
    </div>
  )
}
