import type { MetadataRoute } from "next" 

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: "https://agency.dalim.in",
  } 

  return [home]
}
