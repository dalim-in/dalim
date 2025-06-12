import { Card, CardContent, CardHeader } from '@dalim/core/ui/card'
import { SlidersHorizontal, Cog, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export function Features() {
    return (
        <section className="px-3 py-10">
            <div className="grid">
                <div className="text-center">
                    <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">Clean, Consistent, and Beautiful</h2>
                    <p className="text-primary/60 mt-3">Made for Creators.</p>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3 pt-6">
                    <Card className="bg-white dark:bg-black">
                        <CardHeader className="">
                            <CardDecorator>
                                <Zap
                                    className="w-10 text-brand h-10"
                                    strokeWidth={1}
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Lightweight & Scalable</h3>
                        </CardHeader>

                        <CardContent className="-mt-4">
                            <p className="text-sm text-primary/60">Icons are lightweight, highly optimized scalable vector graphics (SVG).</p>
                        </CardContent>
                    </Card>
                   <Card className="bg-white dark:bg-black">
                        <CardHeader className="">
                            <CardDecorator>
                                <Sparkles
                                     className="w-10 text-brand h-10"
                                    strokeWidth={1}
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Clean & consistent</h3>
                        </CardHeader>

                        <CardContent className="-mt-4">
                            <p className="text-sm text-primary/60">Designed with a strict set of design rules for consistency in style and readability.</p>
                        </CardContent>
                    </Card>
                   <Card className="bg-white dark:bg-black">
                        <CardHeader className="">
                            <CardDecorator>
                                <SlidersHorizontal
                                     className="w-10 text-brand h-10"
                                    strokeWidth={1}
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Customizable</h3>
                        </CardHeader>

                        <CardContent className="-mt-4">
                            <p className="text-sm text-primary/60">Customize the color, size, stroke width, and more.</p>
                        </CardContent>
                    </Card>
                   <Card className="bg-white dark:bg-black">
                        <CardHeader className="">
                            <CardDecorator>
                                <Cog
                                     className="w-10 text-brand h-10"
                                    strokeWidth={1}
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Packages support</h3>
                        </CardHeader>

                        <CardContent className="-mt-4">
                            <p className="text-sm text-primary/60">Icons is available as a package for all major package managers.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-42 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="bg-background absolute rounded-xl inset-0 m-auto flex size-18 items-center justify-center border-l border-t">{children}</div>
    </div>
)
