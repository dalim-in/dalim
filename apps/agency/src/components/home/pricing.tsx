import { Button } from '@dalim/core/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Services } from './services'

export function Pricing() {
    return (
        <div
            id="pricing"
            className="relative pt-4">
            <div className="px-3">
                <Services />
                <div className="">
                    <div className="bg-card relative rounded-3xl border shadow-2xl shadow-zinc-950/5">
                        <div className="grid items-center gap-12 divide-y p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
                            <div className="pb-12 text-center md:pb-0 md:pr-12">
                                <h3 className="text-2xl font-semibold">Monthly Club</h3>
                                <p className="text-primary/60 mt-2 text-lg">Pause or cancel anytime.</p>
                                <span className="text-brand mb-6 mt-12 inline-block text-6xl font-bold">$999</span>

                                <div className="flex justify-center">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link href="#">Join Today</Link>
                                    </Button>
                                </div>

                                <p className="text-muted-foreground mt-12 text-sm">Consistent Pricing and Value Each Month, with the Flexibility to Cancel Anytime</p>
                            </div>
                            <div className="relative">
                                <div className="grid gap-4 lg:grid-cols-2">
                                    <ul
                                        role="list"
                                        className="space-y-4">
                                        {['One request at a time', 'Avg. 48 hour delivery', 'Unlimited stock photos', 'Pause or cancel anytime'].map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2">
                                                <Check className="size-3" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul
                                        role="list"
                                        className="space-y-4">
                                        {['Unlimited design requests', 'Connect anytime', 'Web development'].map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2">
                                                <Check className="size-3" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-muted-foreground mt-6 text-sm">Consistent Pricing and Value Each Month, with the Flexibility to Cancel Anytime</p>
                                <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
                                    <img
                                        className="h-5 w-fit dark:invert"
                                        src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                        alt="Nvidia Logo"
                                        height="20"
                                        width="auto"
                                    />
                                    <img
                                        className="h-4 w-fit dark:invert"
                                        src="https://html.tailus.io/blocks/customers/column.svg"
                                        alt="Column Logo"
                                        height="16"
                                        width="auto"
                                    />
                                    <img
                                        className="h-4 w-fit dark:invert"
                                        src="https://html.tailus.io/blocks/customers/github.svg"
                                        alt="GitHub Logo"
                                        height="16"
                                        width="auto"
                                    />
                                    <img
                                        className="h-5 w-fit dark:invert"
                                        src="https://html.tailus.io/blocks/customers/nike.svg"
                                        alt="Nike Logo"
                                        height="20"
                                        width="auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
