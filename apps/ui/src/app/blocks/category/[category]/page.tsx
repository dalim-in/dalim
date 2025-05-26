// app/blocks/category/[category]/page.tsx
import { notFound } from "next/navigation"
import { categorizedBlocks, blockList } from "@/registry/default/blocks"  
import { BlockProvider } from "@/src/components/blocks/block-provider"
import BlockPreview from "@/src/components/blocks/block-preview" 

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params
  const categoryKey = category.toLowerCase()

  const blocksToRender =
    categoryKey === "all"
      ? blockList
      : categorizedBlocks[categoryKey] ?? []

  if (!blocksToRender.length) notFound()

  return (
    <>
      <div className="pt-6"> 
        <div className="grid grid-cols-1 gap-6">
          {blocksToRender.map((block) => (
            <div key={block.name}>
              <BlockProvider block={block.name}>
                <BlockPreview block={block.name} />
              </BlockProvider>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
