import { GraphicUploadForm } from "@/src/components/graphic/graphic-upload-form"
import { auth, DALIM_URL } from "@dalim/auth"
import { redirect } from "next/navigation" 

export default async function GraphicUploadPage() {
  const session = await auth()

  if (!session?.user) {
     redirect(`${DALIM_URL}/login`)
  }

  return (
    <div className="-mt-14">
      <GraphicUploadForm />
    </div>
  )
}
