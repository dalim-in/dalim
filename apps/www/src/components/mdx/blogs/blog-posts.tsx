import { Post } from "@/.contentlayer/generated";

import { BlogCard, BlogCardHome } from "./blog-card";

export function BlogPosts({
  posts,
}: {
  posts: (Post & {
    blurDataURL: string; 
  })[];
}) {
  return (
    <main className="space-y-6"> 
      <div className="grid gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-10 xl:grid-cols-3">
        {posts.map((post, idx) => (
          <BlogCard data={post} key={post._id} priority={idx <= 2} />
        ))}
      </div>
    </main>
  );
}

export function BlogPostsHome({
  posts,
}: {
  posts: (Post & {
    blurDataURL: string; 
  })[];
}) {
  return (
    <main className="space-y-6"> 
      <div className="grid gap-6 md:grid-cols-1 md:gap-x-6 md:gap-y-10 xl:grid-cols-2">
        {posts.map((post, idx) => (
          <BlogCardHome data={post} key={post._id} priority={idx <= 2} />
        ))}
      </div>
    </main>
  );
}