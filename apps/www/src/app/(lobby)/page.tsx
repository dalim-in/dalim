'use client'

import * as React from 'react'
import { Preview } from '../../components/home/all-pages'
import { Hero } from '../../components/home/hero'
import { ProductBento } from '@/src/components/home/bento'

export default function Home() {
    return (
        <div>
            <Hero />
            <Preview />
            <ProductBento /> 
        </div>
    )
}
