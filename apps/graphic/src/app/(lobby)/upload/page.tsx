import { GraphicUploadForm } from "@/src/components/graphic/graphic-upload-form"
import { auth, DALIM_URL } from "@dalim/auth"
import { redirect } from "next/navigation" 

export default async function GraphicUploadPage() {
  const session = await auth()

  if (!session?.user) {
     redirect(`${DALIM_URL}/login`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Upload Graphics</h1>
          <p className="text-muted-foreground mt-2">Share your graphics with the community</p>
        </div>
        <GraphicUploadForm />
      </div>
    </div>
  )
}
