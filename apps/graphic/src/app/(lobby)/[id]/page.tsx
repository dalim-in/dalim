 
import { getGraphicById, getRelatedGraphics } from "@/src/actions/graphic"
import { GraphicDetail } from "@/src/components/graphic/graphic-detail"
import { RelatedGraphics } from "@/src/components/graphic/related-graphics"
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

   const relatedGraphics = await getRelatedGraphics(graphic.id, graphic.category, graphic.tags, 6)

  return (
    <div className="-mt-14">
      <GraphicDetail graphic={graphic} />
      {relatedGraphics.length > 0 && (
        <div className="mt-12">
          <RelatedGraphics graphics={relatedGraphics} />
        </div>
      )}
    </div>
  )
}
