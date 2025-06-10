import { CardStack } from '@dalim/core/components/backgrunds/card-stack'
import Image from 'next/image'

export function BlogCard() {
    return (
        <div className="my-6 h-full w-full">
            <CardStack items={CARDS} />
        </div>
    )
}

const CARDS = [
    {
        id: 0,
        content: (
            <div>
                <>
                <Image
                    src="/images/thumbs/button.svg"
                    alt="header"
                    width={800}
                    height={800}
                    className="h-[200px] w-full rounded-xl object-cover dark:hidden"
                />
                <Image
                    src="/images/thumbs/button-dark.svg"
                    alt="header"
                    width={800}
                    height={800}
                    className="hidden h-[200px] w-full rounded-xl object-cover dark:block"
                />
            </>
            </div>
        ),
    },
    {
        id: 1,
        content: (
            <div>
                <>
                <Image
                    src="/images/thumbs/accordion.svg"
                    alt="header"
                    width={800}
                    height={800}
                    className="h-[200px] w-full rounded-xl object-cover dark:hidden"
                />
                <Image
                    src="/images/thumbs/accordion-dark.svg"
                    alt="header"
                    width={800}
                    height={800}
                    className="hidden h-[200px] w-full rounded-xl object-cover dark:block"
                />
            </>
            </div>
        ),
    },
    {
        id: 2,
        content: (
            <div>
                <>
                <Image
                    src="/images/thumbs/pagination.svg"
                    alt="header"
                    width={800}
                    height={800}
                    className="h-[200px] w-full rounded-xl object-cover dark:hidden"
                />
                <Image
                    src="/images/thumbs/pagination-dark.svg"
                    alt="header"
                    width={800}
                    height={800}
                    className="hidden h-[200px] w-full rounded-xl object-cover dark:block"
                />
            </>
            </div>
        ),
    },
]
