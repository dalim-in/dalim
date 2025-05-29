import Link from 'next/link'
import { Post } from 'contentlayer/generated'

import { cn, formatDate, placeholderBlurhash } from '@/src/lib/utils'
import BlurImage from '@/src/components/ui/blur-image'

export function BlogCard({
    data,
    priority,
    horizontale = false,
}: {
    data: Post & {
        blurDataURL: string
    }
    priority?: boolean
    horizontale?: boolean
}) {
    return (
        <article className={cn('group relative', horizontale ? 'grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6' : 'flex flex-col space-y-2')}>
            {data.image && (
                <div className="w-full overflow-hidden rounded-sm md:rounded-xl border">
                    <BlurImage
                        alt={data.title}
                        blurDataURL={data.blurDataURL ?? placeholderBlurhash}
                        className={cn('size-full object-cover object-center', horizontale ? 'lg:h-96' : null)}
                        width={600}
                        height={400}
                        priority={priority}
                        placeholder="blur"
                        src={data.image}
                        sizes="(max-width: 768px) 750px, 600px"
                    />
                </div>
            )}

            <div className={cn('flex flex-1 flex-col', horizontale ? 'justify-center' : 'justify-between')}>
                <div className="w-full">
                    <h2 className="font-heading my-1.5 line-clamp-2 text-md md:text-xl">{data.title}</h2>
                    {data.description && <p className="text-muted-foreground text-sm line-clamp-2">{data.description}</p>}
                </div>
                <div className="mt-4 flex items-center space-x-3">{data.date && <p className="text-muted-foreground text-xs">{formatDate(data.date)}</p>}</div>
            </div>
            <Link
                href={data.slug}
                className="absolute inset-0">
                <span className="sr-only">View Article</span>
            </Link>
        </article>
    )
}

export function BlogCardHome({
    data,
    priority,
    horizontale = false,
}: {
    data: Post & {
        blurDataURL: string
    }
    priority?: boolean
    horizontale?: boolean
}) {
    return (
        <article className={cn('group relative', horizontale ? 'grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6' : 'flex flex-col space-y-2 rounded-xl md:rounded-3xl border p-2')}>
            {data.image && (
                <div className="w-full overflow-hidden rounded-sm md:rounded-xl border">
                    <BlurImage
                        alt={data.title}
                        blurDataURL={data.blurDataURL ?? placeholderBlurhash}
                        className={cn('size-full object-cover object-center', horizontale ? 'lg:h-96' : null)}
                        width={600}
                        height={400}
                        priority={priority}
                        placeholder="blur"
                        src={data.image}
                        sizes="(max-width: 768px) 750px, 600px"
                    />
                </div>
            )}

            <div className={cn('flex flex-1 flex-col px-3', horizontale ? 'justify-center' : 'justify-between')}>
                <div className="flex w-full mt-1 -mb-1 items-center justify-between">
                    <h2 className="text-sm md:text-lg">{data.title}</h2>
                    {data.date && <p className="text-muted-foreground text-xs">{formatDate(data.date)}</p>}
                </div>
            </div>
            <Link
                href={data.slug}
                className="absolute inset-0">
                <span className="sr-only">View Article</span>
            </Link>
        </article>
    )
}
