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
        title={"Search UI"}
        subheading=" Use this page to quickly find a component (e.g., multiselect, vertical, slider, etc.)"
       />
      <div className="mx-auto max-w-6xl border-x px-6 py-6">{children}</div>
    </div>
  )
}
