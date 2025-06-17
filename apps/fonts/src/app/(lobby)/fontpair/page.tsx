import { Suspense } from 'react'
import { FontPairGenerator } from '@/src/components/fontpair/font-pair-generator'
import { getFonts } from '@/src/actions/font-action'
import { PageHeader } from '@dalim/core/components/common/page-header'

export default async function FontPairPage() {
    return (
        <div className="">
            <PageHeader
                badge="Font Generator"
                className="-mx-6 -mt-14"
                title={'Find a fontpair for your Designs.'}
                subheading="Discover beautifully crafted typefaces for every creative project — from modern displays to vintage-inspired lettering."
            />
            <div className="">
                <Suspense fallback={<FontPairGeneratorSkeleton />}>
                    <FontPairGeneratorWrapper />
                </Suspense>
            </div>
        </div>
    )
}

async function FontPairGeneratorWrapper() {
  
    const fonts = await getFonts()
    return (
        <FontPairGenerator
            fonts={fonts} 
        />
    )
}

function FontPairGeneratorSkeleton() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-lg p-6 shadow-sm">
                    <div className="mb-4 h-6 animate-pulse rounded"></div>
                    <div className="h-32 animate-pulse rounded"></div>
                </div>
                <div className="rounded-lg p-6 shadow-sm">
                    <div className="mb-4 h-6 animate-pulse rounded"></div>
                    <div className="h-32 animate-pulse rounded"></div>
                </div>
            </div>
            <div className="rounded-lg p-8 shadow-sm">
                <div className="h-64 animate-pulse rounded"></div>
            </div>
        </div>
    )
}
