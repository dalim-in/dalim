'use client'
import { NumberCounter } from '@dalim/core/components/backgrunds/number-counter'

const NumbersCount = () => {
    return (
        <section>
            <div className="mt-10">
                <div className="mx-auto max-w-7xl">
                    <dl className="mb-10 grid grid-cols-1 gap-y-10 text-center lg:grid-cols-3">
                        <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                            <dt className="ml-6 text-sm font-semibold uppercase tracking-[.3em] text-neutral-400">
                                <p className="">Projects</p>
                            </dt>
                            <dd className="text-brand order-first flex text-6xl font-extrabold tracking-tight">
                                <p className="">+</p>
                                <NumberCounter value={1000} />
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                            <dt className="ml-6 text-sm font-semibold uppercase tracking-[.3em] text-neutral-400">
                                <p className="">Design Creatives</p>
                            </dt>
                            <dd className="text-brand order-first flex text-6xl font-extrabold tracking-tight">
                                <p className="">+</p>
                                <NumberCounter value={10000} />
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                            <dt className="ml-6 text-sm font-semibold uppercase tracking-[.3em] text-neutral-400">
                                <p className="">Brands</p>
                            </dt>
                            <dd className="text-brand order-first flex text-6xl font-extrabold tracking-tight">
                                <p className="">+</p>
                                <NumberCounter value={100} />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    )
}

export { NumbersCount }
