import { Suspense } from 'react'
import { PageHeader } from '@dalim/core/components/common/page-header'

import { FontsList } from '@/src/components/fonts/font-list'
import { MainFontPreviewControls } from '@/src/components/fonts/font-preview-controls'
 
export default function FontsPage() {
    return (
        <main className="">
            <PageHeader
                badge="Fonts"
                className="-mx-6 -mt-14"
                title={'Find a font for your Designs.'}
                subheading="Discover beautifully crafted typefaces for every creative project — from modern displays to vintage-inspired lettering."
            />
            <div className="mx-auto max-w-6xl border-x px-6 py-6">
                <MainFontPreviewControls />
                <Suspense fallback={'Loading...'}>
                    <FontsList />
                </Suspense>
            </div>
        </main>
    )
}
