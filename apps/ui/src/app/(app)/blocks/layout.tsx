import { Metadata } from "next" 
import { BlocksNav } from "@/src/components/blocks/blocks-nav"
import { BlockThemeSelector } from "@/src/components/ui/theme-selector"
import { PageHeader } from "@dalim/core/components/common/page-header"
 

const title = "Building Blocks for the Web"
const description =
  "Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageHeader
        badge="Category"
        title={`Blocks`}
        className="-mx-6 -mt-14"
        subheading="Explore categorized UI blocks for faster development."
      />
 
      <div
        className="flex items-center justify-between border-b py-3"
        id="blocks"
      >
        <BlocksNav />
      <BlockThemeSelector className="hidden py-3 md:flex" />
         
      </div>
      <div className="flex-1 md:py-12">
        <div className="">{children}</div>
      </div>
    </>
  )
}
