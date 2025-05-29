import { Metadata } from 'next/types'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'

import { BLOG_CATEGORIES } from '@/src/config/blog'
import { constructMetadata, getBlurDataURL } from '@/src/lib/utils'
import { BlogCard } from '@/src/components/mdx/blogs/blog-card'
import { BlogHeader } from '@/src/components/mdx/blogs/blog-header'
import { PageHeader } from '@dalim/core/components/common/page-header'

export async function generateStaticParams() {
    return BLOG_CATEGORIES.map((category) => ({
        slug: category.slug,
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | undefined> {
    const category = BLOG_CATEGORIES.find((category) => category.slug === params.slug)
    if (!category) {
        return
    }

    const { title, description } = category

    return constructMetadata({
        title: `${title} Posts – Designali`,
        description,
    })
}

export default async function BlogCategory({
    params,
}: {
    params: {
        slug: string
    }
}) {
    const category = BLOG_CATEGORIES.find((ctg) => ctg.slug === params.slug)

    if (!category) {
        notFound()
    }

    const articles = await Promise.all(
        allPosts
            .filter((post) => post.categories.includes(category.slug))
            .sort((a, b) => b.date.localeCompare(a.date))
            .map(async (post) => ({
                ...post,
                blurDataURL: await getBlurDataURL(post.image),
            }))
    )

    return (
        <div>
            <PageHeader
                badge="Blogs"
                className="-mx-6 -mt-14"
                title={'Find a story about Designs.'}
                subheading="Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate."
            />
            <div className="mx-auto max-w-6xl border-x px-6 py-6">
                <BlogHeader />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article, idx) => (
                        <BlogCard
                            key={article._id}
                            data={article}
                            priority={idx <= 2}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
