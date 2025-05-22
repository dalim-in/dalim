'use client'

import * as React from 'react' 
import { DesignCards } from '../components/home/design-cards'
import { FUIDashboardSells } from '../components/home/features'
import { Hero } from '../components/home/hero'
import { Pricing } from '../components/home/pricing'
import { FAQs } from '../components/home/faq'
import { BrandLogos } from '../components/home/logos'

export default function Home() {
    return (
        <div>
            <Hero />
            <FUIDashboardSells />
            <DesignCards />
            <BrandLogos />
            <Pricing /> 
            <FAQs />
        </div>
    )
}
