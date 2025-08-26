import { Metadata } from "next"
import Link from "next/link"
import { BlocksNav } from "@/src/components/blocks/blocks-nav" 
import { PageHeader } from "@dalim/core/components/common/page-header"

import { Button } from "@/registry/default/ui/button"

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
      <div className="flex items-center border-b justify-between py-3" id="blocks">
        <BlocksNav />
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="hidden shadow-none lg:flex"
        >
          <Link href="/blocks/sidebar">Browse all blocks</Link>
        </Button>
      </div>
      <div className="flex-1 md:py-12">
        <div className="">{children}</div>
      </div>
    </>
  )
}
