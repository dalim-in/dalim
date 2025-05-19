import * as React from 'react'

import Image from 'next/image'

export function DesignCards() {
    return (
        <div className="">
            <div className="flex flex-col items-center justify-center py-10">
                <div>
                    <h1 className="mb-10 text-xl mx-auto max-w-xs md:max-w-full px-6 text-center font-thin md:text-3xl">Design, the way it was always meant to be.</h1>
                </div>
                <div className="grid grid-cols-1 gap-3 px-3 md:grid-cols-3">
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
                                <p className="text-white/80">Subscribe to a plan & request as many designs as you'd like.</p>
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
                            <h1 className="text-2xl text-white">Request</h1>
                            <p className="text-white/80">Request whatever you'd like, from mobile apps to logos.</p>
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
                            <h1 className="text-2xl text-white">Receive</h1>
                            <p className="text-white/80">Receive your design within two business days on average.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
