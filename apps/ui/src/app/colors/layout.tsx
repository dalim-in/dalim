import { PageHeader } from "@dalim/core/components/common/page-header"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <PageHeader
        badge="Colors"
        className="-mx-6 -mt-14"
        title={"Find a color for your Designs."}
        subheading="Tailwind CSS colors in HSL, RGB, HEX and OKLCH formats."
      />
      <div className="mx-auto max-w-6xl border-x px-6 py-6">{children}</div>
    </div>
  )
}
