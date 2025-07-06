'use client'

import * as React from 'react'
import { Suspense } from 'react'
import SVGLineDrawGenerator from '@/src/components/tools/svg-line-draw'
import { TabNavigation } from '@/src/components/home/tabs-page'

export default function Home() {
    return (
        <div>
            <TabNavigation />
            <Suspense fallback={'Loading...'}>
                <SVGLineDrawGenerator />
            </Suspense>
        </div>
    )
}
