export interface ComponentCategory {
  slug: string
  name: string
  components: { name: string }[]
  isNew?: boolean
}

export const categories: ComponentCategory[] = [
  {
    slug: "button",
    name: "Button",
    components: [{ name: "button-01" }],
  },
  {
    slug: "ai",
    name: "AI",
    components: [{ name: "ai-input-01" }],
  },
  {
    slug: "pagination",
    name: "Pagination",
    components: [{ name: "pagination-01" }],
  },
]

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug)
}
