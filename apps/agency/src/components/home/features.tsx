'use client'

import { GridPattern } from '@dalim/core/components/backgrunds/grid'

export function FUIDashboardSells() {
    return (
        <>
            <main>
                <div className="pt-8">
                    <div className="relative mt-10 before:absolute before:-inset-x-12 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]">
                        <div className="relative mt-10 before:absolute before:-inset-x-12 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]">
                            <GridPattern
                                width={5}
                                height={5}
                                className="border opacity-20"
                            />
                            <div className="grid grid-cols-1 border-x md:grid-cols-2 lg:grid-cols-4">
                                <div className="border-b py-10 md:border-r lg:border-b-0 lg:border-r">
                                    <p className=" text-center text-xl tracking-tight">48 Hours Delivery</p>
                                </div>
                                <div className="border-b py-10 lg:border-b-0 lg:border-r">
                                    <p className=" text-center text-xl tracking-tight">Access to Design Portal</p>
                                </div>
                                <div className="border-b py-10 md:border-r lg:border-b-0 lg:border-r">
                                    <p className=" text-center text-xl tracking-tight">Top-notch quality</p>
                                </div>
                                <div className="py-10">
                                    <p className=" text-center text-xl tracking-tight">Unlimited Design Requests</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
