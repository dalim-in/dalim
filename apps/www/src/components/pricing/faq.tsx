import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@dalim/core/ui/accordion'
 

export function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Can I switch plans later?',
            answer: 'Absolutely. You can upgrade or downgrade your plan at any time from your dashboard.',
        },
        {
            id: 'item-2',
            question: 'Do I need a credit card to start?',
            answer: 'No credit card is required for the Free plan. Youll only need one when upgrading to Startup or Pro.',
        },
        {
            id: 'item-3',
            question: 'Does the Pro plan support teams?',
            answer: 'Yes! The Pro plan is built for teams and agencies with collaboration features, access control, and shared asset libraries.',
        },
        {
            id: 'item-4',
            question: 'What does “Unlimited Design Requests” mean?',
            answer: "You can queue as many design tasks as you want. In the Startup plan, one task is handled at a time. In Pro, multiple requests can run simultaneously.",
        },
        {
            id: 'item-5',
            question: 'Can I upload my own assets?',
            answer: 'Yes! Font and graphic uploads are available on all tiers, but Free has limited capacity (5 each), while Startup and Pro are unlimited.',
        },
        {
            id: 'item-6',
            question: 'Do I get a license for everything?',
            answer: 'Yes. All assets you download or create are licensed for personal and commercial use with no attribution required on paid plans.',
        },
        {
            id: 'item-7',
            question: 'What’s the difference between Startup and Pro?',
            answer: 'Startup is built for solo users who want design help but don’t need team collaboration or insights. Pro is for teams with more advanced needs like analytics, roles, and faster delivery.',
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
