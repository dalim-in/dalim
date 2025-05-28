import { Metadata } from "next"
import { notFound } from "next/navigation"
import {BlockPreview} from "@/src/components/blocks/block-preview"
import { BlockProvider } from "@/src/components/blocks/block-provider"
import BlockToolbar from "@/src/components/blocks/block-toolbar"
import { PreviewListFilter } from "@/src/components/blocks/category-filter"
import FileExplorer from "@/src/components/blocks/file-explorer"
import { UI_URL } from "@dalim/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dalim/core/ui/tabs"

import registry from "../../../registry.json"

export const metadata: Metadata = {
  title: "Dalim UI Blocks",
  description:
    "Dalim UI Blocks is a collection of ready-to-use code snippets for web developers to preview, customize, and copy.",
  alternates: {
    canonical: `${UI_URL}/blocks`,
  },
}

const BlocksPage = ({ searchParams }: { searchParams: { q?: string } }) => {
  const query = searchParams.q?.toLowerCase() || ""
  const featuredBlocks = ["dashboard-03", "login-01", "navbar-01"]

  const filteredBlocks = registry.items.filter(
    (item) =>
      item.type === "registry:block" &&
      featuredBlocks.includes(item.name) &&
      item.name.toLowerCase().includes(query)
  )

  if (filteredBlocks.length === 0) notFound()

  return (
    <>
      <div>
        <PreviewListFilter />
        <div className="before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))] relative before:absolute before:-inset-x-6 before:top-0 before:h-px"></div>
        <div className="grid pb-6 md:pb-9 md:pl-3">
          {filteredBlocks.map((block) => {
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
                    <div className="mb-4 flex flex-col md:flex-row  items-center justify-between gap-2">
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

export default BlocksPage
