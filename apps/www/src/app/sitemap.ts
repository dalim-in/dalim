import type { MetadataRoute } from "next" 

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: "https://dalim.in",
  } 

  return [home]
}
