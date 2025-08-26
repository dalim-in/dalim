import type { MetadataRoute } from "next" 

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: "https://ui.dalim.in",
  } 

  return [home]
}