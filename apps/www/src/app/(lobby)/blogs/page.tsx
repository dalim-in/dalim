import { allPosts } from 'contentlayer/generated'

import { BlogPosts } from '@/src/components/mdx/blogs/blog-posts'
import { getBlurDataURL } from '@/src/lib/utils'
import { BlogHeader } from '@/src/components/mdx/blogs/blog-header'
import { PageHeader } from '@dalim/core/components/common/page-header'

export default async function BlogPage() {
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
            <PageHeader
                badge="Blogs"
                className="-mx-6 -mt-14"
                title={'Find a story about Designs.'}
                subheading="Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate."
            />
            <div className="mx-auto max-w-6xl border-x px-6 py-6">
                <BlogHeader />
                <BlogPosts posts={posts} />
            </div>
        </div>
    )
}
