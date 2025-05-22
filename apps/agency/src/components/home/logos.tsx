'use client'

import Image from 'next/image'

export const BrandLogos = () => {
    return (
        <>
            <div
                className="animate-marquee-container group flex max-w-full flex-row overflow-hidden py-2 pb-6 [--duration:40s] [--gap:2rem]"
                style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                    maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                }}>
                {' '}
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            className="animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)]"
                            key={i}>
                            <div className="flex w-28 items-center gap-2">
                                <Image
                                    alt="Ali Imam"
                                    className="block dark:hidden"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c1-2.png"
                                />
                                <Image
                                    alt="Ali Imam"
                                    className="hidden dark:block"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c1-1.png"
                                />
                            </div>
                            <div className="flex w-28 items-center gap-2">
                                <Image
                                    alt="Ali Imam"
                                    className="block dark:hidden"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c2-2.png"
                                />
                                <Image
                                    alt="Ali Imam"
                                    className="hidden dark:block"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c2-1.png"
                                />
                            </div>
                            <div className="flex w-28 items-center gap-2">
                                <Image
                                    alt="Ali Imam"
                                    className="block dark:hidden"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c3-2.png"
                                />
                                <Image
                                    alt="Ali Imam"
                                    className="hidden dark:block"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c3-1.png"
                                />
                            </div>

                            <div className="flex w-28 items-center gap-2">
                                <Image
                                    alt="Ali Imam"
                                    className="block dark:hidden"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c7-2.png"
                                />

                                <Image
                                    alt="Ali Imam"
                                    className="hidden dark:block"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c7-1.png"
                                />
                            </div>

                            <div className="flex w-28 items-center gap-2">
                                <Image
                                    alt="Ali Imam"
                                    className="block dark:hidden"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c8-2.png"
                                />
                                <Image
                                    alt="Ali Imam"
                                    className="hidden dark:block"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c8-1.png"
                                />
                            </div>

                            <div className="flex w-28 items-center gap-2">
                                <Image
                                    alt="Ali Imam"
                                    className="block dark:hidden"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c10-2.png"
                                />
                                <Image
                                    alt="Ali Imam"
                                    className="hidden dark:block"
                                    height={100}
                                    width={100}
                                    src="/images/logos/c10-1.png"
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}
