import { CardStack } from '@dalim/core/components/backgrunds/card-stack'
import Image from 'next/image'

export function BlogCard() {
    return (
        <div className="h-60 w-full mt-6">
            <CardStack items={CARDS} />
        </div>
    )
}

const CARDS = [
    {
        id: 0,
        content: (
            <Image
                src="/images/blogs/gradient/cover.jpg"
                alt="header"
                width={800}
                height={800}
                className="h-[200px] w-full rounded-xl object-cover"
            />
        ),
    },
    {
        id: 1,
        content: (
            <Image
                src="/images/blogs/portfolio/cover.jpg"
                alt="header"
                width={800}
                height={800}
                className="h-[200px] w-full rounded-xl object-cover"
            />
        ),
    },
    {
        id: 2,
        content: (
            <div>
                <Image
                    src="/images/blogs/gradient/cover.jpg"
                    alt="header"
                    width={800}
                    height={800}
                    className="h-[200px] w-full rounded-xl object-cover"
                />
            </div>
        ),
    },
]
