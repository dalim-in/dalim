import { Zap, Globe, Smartphone, Code } from 'lucide-react'
import { ReactNode } from 'react'

export function Services() {
    return (
        <section className="pb-3 dark:bg-transparent">
            <div className="@container">
                <div className="grid rounded-3xl border md:grid-cols-2 lg:grid-cols-4">
                    <div className="p-6 border-b lg:border-b-0 md:border-r">
                        <div className="">
                            <CardDecorator>
                                <Globe
                                    className="text-brand size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mb-6 text-center text-2xl font-medium">Website Design</h3>
                        </div>
                    </div>
                    <div className="p-6 border-b lg:border-b-0 lg:border-r">
                        <div className="">
                            <CardDecorator>
                                <Smartphone
                                    className="text-brand size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mb-6 text-center text-2xl font-medium">Social Media Graphics</h3>
                        </div>
                    </div>
                    <div className="p-6 border-b md:border-b-0 md:border-r">
                        <div className="">
                            <CardDecorator>
                                <Zap
                                    className="text-brand size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mb-6 text-center text-2xl font-medium">Branding</h3>
                        </div>
                    </div>
                    <div className="p-6 ">
                        <div className="">
                            <CardDecorator>
                                <Code
                                    className="text-brand size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mb-6 text-center text-2xl font-medium">Web Application</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-neutral-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-neutral-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
