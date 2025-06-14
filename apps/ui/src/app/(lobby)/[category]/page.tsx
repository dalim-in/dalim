import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ComponentCard from "@/src/components/component-card"
import ComponentDetails from "@/src/components/component-details"
import ComponentLoader from "@/src/components/component-loader-server"
import { PageGrid } from "@/src/components/page-grid"
import { ThemeCustomizer } from "@/src/components/theme/theme-customizer"
import { ThemeWrapper } from "@/src/components/theme/theme-wrapper"
import { categories, getCategory } from "@/src/config/components"
import { getComponentsByNames } from "@/src/lib/utils"
import { Connect } from "@dalim/core/components/common/connect"
import { PageHeader } from "@dalim/core/components/common/page-header"

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category)

  if (!category) {
    return {} 
  }

  // Get components to check count
  const components = getComponentsByNames(
    category.components.map((item) => item.name)
  )

  const isSingleComponent = components.length === 1

  // Custom title and description for event-calendar
  if (category.slug === "event-calendar") {
    return {
      title:
        "Event calendar component built with React and Tailwind CSS - Dalim UI",
      description:
        "An event calendar component built with React and Tailwind CSS. Originally built in v0 and currently in early alpha stage.",
    }
  }

  return {
    title: isSingleComponent
      ? `${category.name} - UI - Dalim`
      : `${category.name} - UI - Dalim `,
    description: isSingleComponent
      ? `A beautiful and accessible ${category.name.toLowerCase()} component built with React and Tailwind CSS.`
      : `A collection of beautiful and accessible ${category.name.toLowerCase()} components built with React and Tailwind CSS.`,
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default async function Page({ params }: Props) {
  const category = getCategory((await params).category)

  if (!category) {
    notFound()
  }

  const components = getComponentsByNames(
    category.components.map((item) => item.name)
  )

  const getDescriptionText = () => {
    if (category.slug === "event-calendar") {
      return (
        <span className="block text-balance">
          An event calendar component built with React and Tailwind CSS.
          Originally built in{" "}
          <a
            href="https://v0.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            v0
          </a>{" "}
          and currently in early alpha stage.{" "}
          <a
            href="https://github.com/origin-space/event-calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-1 hover:underline"
          >
            Docs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="9"
              className="-mt-1 fill-current"
            >
              <path d="m1.55 8.445-.776-.776 5.767-5.777H2.087l.01-1.074H8.39v6.304H7.307l.01-4.454L1.55 8.445Z" />
            </svg>
          </a>
        </span>
      )
    }

    // Default case based on component count
    return components.length === 1
      ? `A ${category.name.toLowerCase()} component built with React and Tailwind CSS.`
      : `A growing collection of ${components.length} ${category.name.toLowerCase()} components built with React and Tailwind CSS.`
  }

  return (
    <div>
      <PageHeader
        badge="UI"
        className="-mx-6 -mt-14"
        title={category.name}
        subheading={`${getDescriptionText()}`}
      />
      <div className="flex mt-3 mx-auto px-3 max-w-max border rounded-xl bg-background z-10 sticky top-20 justify-center border-b">
        <ThemeCustomizer />
      </div> 
      <ThemeWrapper>
        <PageGrid>
          {components.map((component) => (
            <ComponentCard
              key={component.name}
              component={component}
              className=""
            >
              <ComponentLoader component={component} />
              <ComponentDetails component={component} />
            </ComponentCard>
          ))}
        </PageGrid>
      </ThemeWrapper>
      <div className="before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))] relative before:absolute before:-inset-x-6 before:top-0 before:h-px"></div>
      <div className="py-6">
        <Connect />
      </div>
    </div>
  )
}
