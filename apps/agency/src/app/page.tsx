'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { DesignCards } from '../components/home/design-cards'
import { FUIDashboardSells } from '../components/home/features'
import { Hero } from '../components/home/hero'
import { Pricing } from '../components/home/pricing'
import { FAQs } from '../components/home/faq'
import { BrandLogos } from '../components/home/logos' 

export default function Home() {
    const { data: session } = useSession()
    return (
        <div>
            {session?.user?.email ?? 'Login'}
            <Hero />
            <FUIDashboardSells />
            <DesignCards />
            <BrandLogos/> 
            <Pricing/> 
            <FAQs/>
        </div>
    )
}
