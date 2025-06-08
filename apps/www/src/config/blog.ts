export type BlogCategorySlug = "ui" | "open-source" 

export const BLOG_CATEGORIES: {
  title: string;
  slug: BlogCategorySlug;
  description: string;
}[] = [ 
  {
    title: "Open Source",
    slug: "ui",
    description: "Updates and announcements from Next SaaS Starter.",
  },
  {
    title: "UI",
    slug: "open-source",
    description: "Educational content about SaaS management.",
  },
];
