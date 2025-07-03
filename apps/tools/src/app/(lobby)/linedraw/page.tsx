'use client'

import * as React from 'react'   
import { Suspense } from 'react'
import SVGLineDrawGenerator from '@/src/components/tools/svg-line-draw'

export default function Home() {
    return (
        <div>
           
            <Suspense fallback={"Loading..."}>
				<SVGLineDrawGenerator />
			</Suspense>
        </div>
    )
}
