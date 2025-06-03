 
import { getGraphicById } from "@/src/actions/graphic"
import { GraphicDetail } from "@/src/components/graphic/graphic-detail"
import { notFound } from "next/navigation" 

interface GraphicPageProps {
  params: {
    id: string
  }
}

export default async function GraphicPage({ params }: GraphicPageProps) {
  const graphic = await getGraphicById(params.id)

  if (!graphic) {
    notFound()
  }

  return (
    <div className="-mt-14">
      <GraphicDetail graphic={graphic} />
    </div>
  )
}
