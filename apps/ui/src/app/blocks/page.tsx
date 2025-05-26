import { Metadata } from "next"
import { notFound } from "next/navigation"
import BlockPreview from "@/src/components/blocks/block-preview"
import { BlockProvider } from "@/src/components/blocks/block-provider"
import BlockToolbar from "@/src/components/blocks/block-toolbar"
import FileExplorer from "@/src/components/blocks/file-explorer"
import PreviewListFilter from "@/src/components/category/preview-list-filter"
import { UI_URL } from "@dalim/auth"
import { PageHeader } from "@dalim/core/components/common/page-header"
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

const BlocksPage = ({
  searchParams,
}: {
  searchParams: { q?: string }
}) => {
  const query = searchParams.q?.toLowerCase() || ""

  const filteredBlocks = registry.items.filter(
    (item) =>
      item.type === "registry:block" && item.name.toLowerCase().includes(query)
  )

  if (filteredBlocks.length === 0) notFound()

  return (
    <>
      <PageHeader
        badge="Blocks"
        className="-mx-6 -mt-14"
        title="Find a block component."
        subheading="Tailwind CSS colors in HSL, RGB, HEX and OKLCH formats."
      />

      <div className="py-10">
        <PreviewListFilter />
        <div className="grid">
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
                    <div className="mb-4 flex items-center justify-between gap-2">
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
