import { FAQs } from '@/src/components/pricing/faq'
import { Pricing } from '@/src/components/pricing/price-home' 
import { PageHeader } from '@dalim/core/components/common/page-header'
import React from 'react'

export default function AboutPage() {
    return (
        <div className="relative">
            <PageHeader
                badge="Pricing"
                className="-mx-6 -mt-14"
                title={'Find a plan to power your Designs.'}
                subheading="Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate."
            />
            <Pricing />
             
            <FAQs/>
        </div>
    )
}
