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
    components: [
      { name: "button-01" }, 
      { name: "button-02" },
      { name: "button-03" },
      { name: "button-04" },
      { name: "button-05" },
      { name: "button-06" },
      { name: "button-07" },
      { name: "button-08" },
      { name: "button-09" },
      { name: "button-10" },
      { name: "button-11" },
      { name: "button-12" },
      { name: "button-13" },
      { name: "button-14" },
      { name: "button-15" },
      { name: "button-16" },
      { name: "button-17" },
      { name: "button-18" },
      { name: "button-43" },
      { name: "button-19" },
      { name: "button-20" },
      { name: "button-21" },
      { name: "button-22" },
      { name: "button-23" },
      { name: "button-24" },
      { name: "button-25" },
      { name: "button-26" },
      { name: "button-27" },
      { name: "button-28" },
      { name: "button-29" },
      { name: "button-30" },
      { name: "button-31" },
      { name: "button-32" },
      { name: "button-33" }, 
      { name: "button-46" },
      { name: "button-34" },
      { name: "button-35" },
      { name: "button-36" },
      { name: "button-37" },
      { name: "button-38" },
      { name: "button-39" },
      { name: "button-40" },
      { name: "button-41" },
      { name: "button-42" },
      { name: "button-44" },
      { name: "button-47" },
      { name: "button-45" },
    ],
  },

  {
    slug: "ai",
    name: "AI",
    components: [{ name: "ai-input-01" }, { name: "ai-input-02" }],
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
