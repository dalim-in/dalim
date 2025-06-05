'use client'

import * as React from 'react'
import { Hero } from '../components/home/hero'
import { Access01 } from 'dalim-icons'

export default function Home() {
    return (
        <div>
            <Hero />
            <Access01 className="h-4 w-4" />
        </div>
    )
}
