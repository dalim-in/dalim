import { PageHeader } from "@dalim/core/components/common/page-header"

import { CategoryUI } from "../../../components/home/category"

export default function UIPage() {
  return (
    <div data-home>
      <PageHeader
        badge="UI"
        title={`User Interface`}
        className="-mx-6 -mt-14"
        subheading="Explore categorized UI for faster development."
      />
      <div className="before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))] relative before:absolute before:-inset-x-6 before:top-0 before:h-px"></div>
      <CategoryUI />
    </div>
  )
}
