import { Metadata } from "next" 

import { PageHeader } from "@dalim/core/components/common/page-header"  

const title = "Tailwind Colors in Every Format"
const description =
  "The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project."

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

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
       <PageHeader
        badge="Colors"
        className="-mx-6 -mt-14"
        title={"Find a color for your Designs."}
        subheading="Tailwind CSS colors in HSL, RGB, HEX and OKLCH formats."
      /> 
      <div className="">
        <div className="">
          <section id="colors" className="scroll-mt-20 mx-auto max-w-6xl border-x px-6 py-6">
            {children}
          </section>
        </div>
      </div> 
    </div>
  )
}
