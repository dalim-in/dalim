import { Button } from '@dalim/core/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@dalim/core/ui/accordion'
import { MoonStar } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className='px-10'>
            <section>
                <div className="mx-4 max-w-7xl px-4 py-12 [--color-border:color-mix(in_oklab,var(--color-zinc-200)_75%,transparent)] md:mx-auto dark:[--color-border:color-mix(in_oklab,var(--color-zinc-800)_60%,transparent)]">
                    <div className="mx-auto max-w-sm text-center">
                        <h1 className="inline-flex flex-wrap justify-center gap-2 text-balance text-3xl font-semibold sm:text-4xl">
                            Shadcn Blocks <span className="text-muted-foreground">for</span> Mordern <DuskKitLogo /> Websites
                        </h1>
                        <p className="text-forground/60 mx-auto mb-6 mt-4 max-w-md text-balance text-lg">Modern, Responsive, pre-built UI blocks designed for marketing websites.</p>

                        <Button asChild>
                            <Link href="/hero-section">Explore blocks</Link>
                        </Button>
                    </div>
                </div>
            </section>
            <Accordion
                type="single"
                collapsible
                className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>Yes. It's animated by default, but you can disable it if you prefer.</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

const DuskKitLogo = () => (
    <div
        aria-hidden
        className="border-background dark:inset-ring dark:inset-ring-white/25 bg-linear-to-b dark:inset-shadow-2xs dark:inset-shadow-white/25 rounded-(--radius) relative flex size-9 translate-y-0.5 items-center justify-center border from-purple-300 to-blue-600 shadow-lg shadow-black/20 ring-1 ring-black/10 dark:border-0 dark:shadow-white/10 dark:ring-black/50">
        <div className="absolute inset-x-0 inset-y-2.5 border-y border-dotted border-white/25"></div>
        <div className="absolute inset-x-2.5 inset-y-0 border-x border-dotted border-white/25"></div>
        <MoonStar className="mask-b-from-25% size-6 fill-white stroke-white drop-shadow-sm" />
        <MoonStar className="absolute inset-0 m-auto size-6 fill-white stroke-white opacity-65 drop-shadow-sm" />
    </div>
)
