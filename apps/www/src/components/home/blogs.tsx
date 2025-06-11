import { allPosts } from 'contentlayer/generated'

import { BlogPostsHome } from '@/src/components/mdx/blogs/blog-posts'
import { getBlurDataURL } from '@/src/lib/utils'
import { Badge } from '@dalim/core/ui/badge'
import { Button } from '@dalim/core/ui/button'
import Link from 'next/link'

export async function BlogHome() {
    const posts = await Promise.all(
        allPosts
            .filter((post) => post.published)
            .sort((a, b) => b.date.localeCompare(a.date))
            .map(async (post) => ({
                ...post,
                blurDataURL: await getBlurDataURL(post.image),
            }))
    )

    return (
        <div className="">
            <div className="mx-auto max-w-4xl">
                <div className="flex flex-col items-center justify-center pb-10">
                    <div className="flex justify-center">
                        <Badge
                            variant={'outline'}
                            className="rounded-full px-4 py-2">
                            Blogs
                        </Badge>
                    </div>

                    <h2 className="mt-5 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Designs That Learn</h2>
                    <p className="mt-2 pb-10 text-center opacity-60">Exploring ideas that connect, communicate, and inspire.</p>
                    <div className="">
                        <BlogPostsHome posts={posts} />
                    </div>
                    <Link
                        className="mt-10"
                        href={'/blogs'}>
                        <Button>See More</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
