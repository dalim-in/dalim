export type BlogCategorySlug = "news" | "education"

export const BLOG_CATEGORIES: {
  title: string;
  slug: BlogCategorySlug;
  description: string;
}[] = [
  {
    title: "Open Source",
    slug: "news",
    description: "Updates and announcements from Next SaaS Starter.",
  },
  {
    title: "UI",
    slug: "education",
    description: "Educational content about SaaS management.",
  },
];
