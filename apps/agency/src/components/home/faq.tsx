import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@dalim/core/ui/accordion'
import Image from 'next/image'

export function FAQs() {
    return (
        <div className="px-3 py-10">
            <div className="relative pt-10 before:absolute before:-inset-x-12 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <div>
                <h1 className="mx-auto mb-10 max-w-xs px-6 text-center text-xl font-thin md:max-w-full md:text-3xl">Frequently asked questions?</h1>
            </div>
            <div className="grid items-stretch gap-3 md:grid-cols-2">
                <div className="h-full w-full">
                    <Accordion
                        type="single"
                        collapsible
                        className="flex h-full w-full flex-col justify-start rounded-3xl border p-6">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                            <AccordionContent>Yes. It comes with default styles that match the other components' aesthetic.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is it animated?</AccordionTrigger>
                            <AccordionContent>Yes. It's animated by default, but you can disable it if you prefer.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                            <AccordionContent>Yes. It comes with default styles that match the other components' aesthetic.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is it animated?</AccordionTrigger>
                            <AccordionContent>Yes. It's animated by default, but you can disable it if you prefer.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="relative h-full w-full">
                    <Image
                        src="/images/1.jpeg"
                        alt="Your Image"
                        fill
                        className="rounded-xl object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-black/90 to-transparent p-8 pt-16">
                        <h1 className="text-2xl text-white">Subscribe</h1>
                        <p className="text-white/80">Subscribe to a plan & request as many designs as you'd like.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
