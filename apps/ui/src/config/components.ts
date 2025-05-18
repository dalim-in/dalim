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
    components: [{ name: "comp-02" }],
  },
]

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug)
}
