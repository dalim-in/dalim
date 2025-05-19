import { allPosts } from "contentlayer/generated";
 
import { BlogPosts } from "@/src/components/mdx/blogs/blog-posts";
import { getBlurDataURL } from "@/src/lib/utils";
 

export default async function BlogPage() {
  const posts = await Promise.all(
    allPosts
      .filter((post) => post.published)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(async (post) => ({
        ...post,
        blurDataURL: await getBlurDataURL(post.image),
      })),
  );

  return <BlogPosts posts={posts} />;
}