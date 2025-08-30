import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@dalim/core/ui/accordion'

export function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How fast will I receive my designs?',
            answer: 'On average, most requests are completed in just two days or less. However, more complex requests can take longer.',
        },
        {
            id: 'item-2',
            question: 'Do I need a credit card to start?',
            answer: 'No credit card is required for the Free plan.',
        },
        {
            id: 'item-3',
            question: 'How does onboarding work?',
            answer: 'Book a meeting and we will discuss the project. I will share you the proposal that what I deliver and plans. After some advanced payment the project will started.',
        },
        {
            id: 'item-4',
            question: 'What if I don’t like the design?',
            answer: 'No worries! We will ll continue to revise the design until youre 100% satisfied.',
        },
        {
            id: 'item-5',
            question: 'Are there any refunds?',
            answer: 'Due to the high quality nature of the work, there will be no refunds issued past the first week of service. However, no refunds will be issued for completed work.',
        },
        {
            id: 'item-6',
            question: 'Who are the designers?',
            answer: 'Dalim is a one-man agency, ran by Ali, the founder. Dalim does not employ other designers, or outsource work to any other entity. You will work directly with me through the entirety of your experience.',
        },
    ]
    return (
        <div className="mx-auto max-w-6xl border-x px-6 pb-10">
            <div className="relative pt-10 before:absolute before:-inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <div>
                <h1 className="mx-auto mb-10 max-w-xs px-6 text-center text-xl font-thin md:max-w-full md:text-3xl">Frequently asked questions?</h1>
            </div>
            <div className="grid items-stretch">
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
            </div>
        </div>
    )
}
