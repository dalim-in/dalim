'use client'  
import { TabNavigation } from '@/src/components/home/tabs-page'
import { ShaderGradientGenerator } from '@/src/components/tools/gradient'

export default function Home() {
    return (
        <div>
            <TabNavigation />
            <ShaderGradientGenerator />
        </div>
    )
}
