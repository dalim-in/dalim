'use client' 
import  BackgroundSnippetsGenerator  from '@/src/components/tools/background'  
import { TabNavigation } from '@/src/components/home/tabs-page'

export default function Home() {
    return (
        <div>
            <TabNavigation />
           <BackgroundSnippetsGenerator />
        </div>
    )
}
