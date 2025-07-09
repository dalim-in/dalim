import type { Metadata } from "next"

import { PageHeader } from "@dalim/core/components/common/page-header"

import Card from "@/src/components/templates/card"

export const metadata: Metadata = {
  title: "UI Templates built with Tailwind CSS and React - Dalim UI",
  description:
    "Beautiful UI layouts built with Tailwind CSS and React to help you get started with your next project.",
}

const cards = [
    
  {
    id: 1,
    title: "Portfolio",
    demoUrl: "https://template-01-ui.dalim.in",
    repoUrl:
      "https://github.com/dalim-in/dalim/tree/main/templates/template-01",
    imgHeight: 900,
  },
]

export default function Page() {
  return (
    <>
       <PageHeader
        badge="Templates"
        className="-mx-6 -mt-14"
        title={"Find a template for your Project."}
        subheading="Beautifully designed open-source templates and UI components built with Dalim UI and shadcn/ui."
      />
      {/* Cards */}
      <div className="space-y-16">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </>
  )
}