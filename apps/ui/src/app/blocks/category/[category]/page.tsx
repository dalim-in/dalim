// app/blocks/category/[category]/page.tsx
import { notFound } from "next/navigation"
import { BlockPreview } from "@/src/components/blocks/block-preview"
import { BlockProvider } from "@/src/components/blocks/block-provider"
import BlockToolbar from "@/src/components/blocks/block-toolbar" 
import FileExplorer from "@/src/components/blocks/file-explorer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dalim/core/ui/tabs"

import { blockList, categorizedBlocks } from "@/registry/default/blocks"

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = params
  const categoryKey = category.toLowerCase()

  const blocksToRender =
    categoryKey === "all" ? blockList : (categorizedBlocks[categoryKey] ?? [])

  if (!blocksToRender.length) notFound()

  return (
    <>
      <div> 
        <div className="grid grid-cols-1 pb-6 gap-6">
          {blocksToRender.map((block) => {
            const files =
              block.files?.map((file) => ({
                ...file,
                path: file.path.replace(
                  `registry/default/blocks/${block.name}/`,
                  ""
                ),
              })) ?? []

            return (
              <div key={block.name}>
                <BlockProvider block={block.name}>
                  <Tabs defaultValue="preview" className="mt-6">
                    <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-2">
                      <TabsList>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="code">Code</TabsTrigger>
                      </TabsList>
                      <BlockToolbar block={block.name} />
                    </div>

                    <TabsContent value="preview">
                      <BlockPreview block={block.name} />
                    </TabsContent>
                    <TabsContent value="code">
                      <FileExplorer files={files} />
                    </TabsContent>
                  </Tabs>
                </BlockProvider>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
