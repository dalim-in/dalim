import { Metadata } from "next"
import BlockPreviewList from "@/src/components/category/block-preview-list"
import { UI_URL } from "@dalim/auth"
import { PageHeader } from "@dalim/core/components/common/page-header"
import BlockPreview from "@/src/components/blocks/block-preview" 

export const metadata: Metadata = {
  title: "Dalim UI Blocks",
  description:
    "Dalim UI Blocks is a collection of ready-to-use code snippets for web developers to preview, customize, and copy.",
  alternates: {
    canonical: `${UI_URL}/blocks`,
  },
}

const BlocksPage = async (props: {
  searchParams: Promise<{ columns: string; q: string }>
}) => {
  const searchParams = await props.searchParams 
  return (
    <>
      <PageHeader
        badge="Blocks"
        className="-mx-6 -mt-14"
        title={"Find a block component."}
        subheading="Tailwind CSS colors in HSL, RGB, HEX and OKLCH formats."
      /> 
      <BlockPreview block={"navbar-01"} />
      <div className="my-6">
        <BlockPreviewList {...searchParams} />
      </div>
    </>
  )
}

export default BlocksPage
