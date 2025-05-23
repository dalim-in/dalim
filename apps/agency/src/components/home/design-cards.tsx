import * as React from 'react'

import Image from 'next/image'

export function DesignCards() {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center justify-center py-10">
                <div>
                    <h1 className="mb-10 text-xl mx-auto max-w-xs md:max-w-full px-6 text-center font-thin md:text-3xl">Design, the way it was always meant to be.</h1>
                </div>
                <div className="grid grid-cols-1 gap-3 w-full lg:px-0 lg:grid-cols-3">
                    <div className="relative">
                        <Image
                            src="/images/1.jpeg"
                            alt="Your Image"
                            height={700}
                            width={700}
                            className="h-[400px] w-full rounded-xl object-cover"
                        />

                        <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-black/90 to-transparent p-4 pt-16">
                            <div>
                                <h1 className="text-2xl text-white">Subscribe</h1>
                                <p className="text-white/80">Subscribe to a plan, get access to Dashboard, and start listing your requests.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src="/images/3.jpeg"
                            alt="Your Image"
                            height={700}
                            width={700}
                            className="h-[400px] w-full rounded-xl object-cover"
                        />

                        <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-black/90 to-transparent p-4 pt-16">
                            <h1 className="text-2xl text-white">Receive</h1>
                            <p className="text-white/80">Start receiving your designs within 2-3 business days, or even sooner for smaller tasks. Yes, it can be that fast.</p>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src="/images/2.jpeg"
                            alt="Your Image"
                            height={700}
                            width={700}
                            className="h-[400px] w-full rounded-xl object-cover"
                        />

                        <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-black/90 to-transparent p-4 pt-16">
                            <h1 className="text-2xl text-white">Continue</h1>
                            <p className="text-white/80">Approve designs or request revisions; we're not done until you're thrilled. Your satisfaction is our commitment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
