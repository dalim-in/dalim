import { PageHeader } from "@dalim/core/components/common/page-header"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <PageHeader
        badge="Easings"
        className="-mx-6 -mt-14"
        title={"Find a animation for your Designs."}
        subheading=" A set of easing functions ready to copy and paste into your Tailwind CSS project."
      />
      <div className="mx-auto max-w-6xl border-x px-6 py-6">{children}</div>
    </div>
  )
}
