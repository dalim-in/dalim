import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@dalim/core/ui/accordion'
import Image from 'next/image'

export function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 3-5 business days, depending on your location. Express shipping options are available at checkout for 1-2 business day delivery.',
        },
        {
            id: 'item-2',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoicing options.',
        },
        {
            id: 'item-3',
            question: 'Can I change or cancel my order?',
            answer: 'You can modify or cancel your order within 1 hour of placing it. After this window, please contact our customer support team who will assist you with any changes.',
        },
        {
            id: 'item-4',
            question: 'Do you ship internationally?',
            answer: "Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Additional customs fees may apply depending on your country's import regulations.",
        },
        {
            id: 'item-5',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some specialty items may have different return terms, which will be noted on the product page.',
        },
    ]
    return (
        <div className="py-10">
            <div className="relative pt-10 before:absolute before:-inset-x-12 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <div>
                <h1 className="mx-auto mb-10 max-w-xs px-6 text-center text-xl font-thin md:max-w-full md:text-3xl">Frequently asked questions?</h1>
            </div>
            <div className="grid items-stretch gap-3 px-3 md:grid-cols-2">
                <div className="h-full w-full">
                    <Accordion
                    defaultValue="item-1"
                        type="single"
                        collapsible
                        className="bg-muted dark:bg-muted/50 w-full rounded-3xl p-1">
                        {faqItems.map((item) => (
                            <div
                                className="group"
                                key={item.id}>
                                <AccordionItem
                                    value={item.id}
                                    className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm">
                                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-base">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <hr className="mx-7 group-last:hidden peer-data-[state=open]:opacity-0" />
                            </div>
                        ))}
                    </Accordion>
                </div>

                <div className="relative h-[350px] md:h-full w-full">
                    {/* Floating Image (centered) */}
                    <Image
                        src="/brand/logo-icon.svg"
                        alt="Your Image"
                        width={150}
                        height={150}
                        className="animate-float absolute left-1/2 top-1/3 z-10  -translate-x-1/2 -translate-y-1/2 "
                    />

                    {/* Background Image */}
                    <Image
                        src="/images/1.jpeg"
                        alt="Your Image"
                        fill
                        className="rounded-xl object-cover"
                    />

                    {/* Gradient Overlay + Text */}
                    <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-black/90 to-transparent p-8 pt-16">
                        <h1 className="text-2xl text-white">Subscribe</h1>
                        <p className="text-white/80">Subscribe to a plan & request as many designs as you'd like.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
