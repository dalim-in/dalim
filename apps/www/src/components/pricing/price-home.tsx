'use client'

import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Check } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function Pricing() {
    const session = useSession()
    return (
        <section className="mx-auto max-w-6xl border-x">
            <div className="py-10">
                <div className="grid md:grid-cols-3">
                    <Card className="flex flex-col rounded-none border-x-0 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">Free</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                            <CardDescription className="text-sm">Individual</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Access to free UI components', 'Free graphics (unlimited collection)', 'Free fonts (unlimited selection)', 'Use of dashboard', 'Unlimited uploads', 'Use free icons'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Link
                                className="w-full"
                                href={session ? '/dashboard' : `/login`}>
                                <Button
                                    size={'lg'}
                                    variant="outline"
                                    className="w-full">
                                    {session ? 'Dashboard' : 'Login'}
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    <Card className="relative rounded-none border-0 shadow-none md:border">
                        <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">Popular</span>

                        <div className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Pro</CardTitle>
                                <span className="my-3 block text-2xl font-semibold">$9 / mo</span>
                                <CardDescription className="pb-6 text-sm">Team</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <hr className="border-dashed" />
                                <ul className="list-outside space-y-3 text-sm">
                                    {['Everything in Free Plan', 'Unlimited downloads', 'Premium assets & templates', 'Lifetime commercial license', 'Advanced dashboard with analytics', 'Unlimited uploads', 'Team support', 'Monthly Product Updates', 'Cancel any time'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Link
                                    className="w-full mt-6"
                                    href={'https://cal.com/dalim/15min'}
                                    target="_blank">
                                    <Button
                                        size={'lg'} 
                                        className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </CardFooter>
                        </div>
                    </Card>

                    <Card className="flex flex-col rounded-none border-x-0 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">Startup</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$999 / mo</span>
                            <CardDescription className="text-sm">Retainer</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Everything in Pro Plan', 'Any custom design', '1 Active request at a time', 'Unlimited brands', 'Updates every 48 hours', 'Unlimited design requests', 'Dedicated support', 'Cancel any time'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Link
                                className="w-full"
                                href={'https://cal.com/dalim/15min'}
                                target="_blank">
                                <Button
                                    size={'lg'}
                                    variant="outline"
                                    className="w-full">
                                    Book a call
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}
