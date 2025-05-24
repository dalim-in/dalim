import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Check } from 'lucide-react'  

export function Pricing() {
    return (
        <section className="mx-auto max-w-6xl border-x">
            <div className="py-10">
                
                <div className="mt-8 grid md:mt-20 md:grid-cols-3">
                    <Card className="flex flex-col rounded-none border-x-0 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">Free</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                            <CardDescription className="text-sm">Per editor</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Basic Analytics Dashboard', '5GB Cloud Storage', 'Email and Chat Support'].map((item, index) => (
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
                            <Button
                                asChild
                                size={"lg"}
                                variant="outline"
                                className="w-full">
                                <Link href="">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="relative rounded-none border-0 shadow-none md:border">
                        <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">Popular</span>

                        <div className="flex flex-col">
                            <CardHeader>
                              <CardTitle className="text-3xl font-bold">Pro</CardTitle>
                                <span className="my-3 block text-2xl font-semibold">$9 / mo</span>
                                <CardDescription className="text-sm pb-6">Per editor</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <hr className="border-dashed" />
                                <ul className="list-outside space-y-3 text-sm">
                                    {['Everything in Free Plan', '5GB Cloud Storage', 'Email and Chat Support', 'Access to Community Forum', 'Single User Access', 'Access to Basic Templates', 'Mobile App Access', '1 Custom Report Per Month', 'Monthly Product Updates', 'Standard Security Features'].map((item, index) => (
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
                                <Button
                                    asChild
                                     size={"lg"}
                                    className="mt-6 w-full">
                                    <Link href="">Get Started</Link>
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>

                    <Card className="flex flex-col rounded-none border-x-0 shadow-none">
                        <CardHeader>
                          <CardTitle className="text-3xl font-bold">Startup</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$999 / mo</span>
                            <CardDescription className="text-sm">Per editor</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Everything in Pro Plan', '5GB Cloud Storage', 'Email and Chat Support'].map((item, index) => (
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
                            <Button
                                asChild
                                 size={"lg"}
                                variant="outline"
                                className="w-full">
                                <Link href="">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}
