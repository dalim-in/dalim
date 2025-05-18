import type { MetadataRoute } from "next"
import { categories } from "@/src/config/components"

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: "https://ui.dalim.in",
  }
  const search = {
    url: "https://ui.dalim.in/search",
  } 
  const categoryPages = categories.map((category) => ({
    url: `https://ui.dalim.in/${category.slug}`,
  }))

  return [home, ...categoryPages, search]
}
