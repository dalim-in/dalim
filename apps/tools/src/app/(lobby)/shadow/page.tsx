'use client' 
import { Hero } from '@/src/components/home/hero'  
import { TabNavigation } from '@/src/components/home/tabs-page'

export default function Home() {
    return (
        <div>
            <TabNavigation />
            <Hero />  
        </div>
    )
}
