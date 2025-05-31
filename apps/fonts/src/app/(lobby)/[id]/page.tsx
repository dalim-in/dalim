import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getFontById, incrementFontViewCount } from '@/src/lib/fonts'
import { FontDetailView } from '@/src/components/fonts/font-detailed-view'

interface FontDetailPageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: FontDetailPageProps) {
    const font = await getFontById(params.id)

    if (!font) {
        return {
            title: 'Font Not Found',
            description: 'The requested font could not be found',
        }
    }

    return {
        title: `${font.name} | Font Library`,
        description: font.description || `Download ${font.name} font`,
    }
}

export default async function FontDetailPage({ params }: FontDetailPageProps) {
    const font = await getFontById(params.id)

    if (!font) {
        notFound()
    }

    // Increment view count
    await incrementFontViewCount(params.id)

    const fontFamily = `font-${font.name.replace(/\s+/g, '-').toLowerCase()}`

    return (
        <main className="">
            <h1
                style={{
                    fontFamily: fontFamily,
                    lineHeight: 1,
                    wordBreak: 'break-word',
                }}
                className="py-6 text-center text-[clamp(2rem,8vw,7rem)]">
                {font.name}
            </h1>

            <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

            <div className="mx-auto max-w-6xl border-x px-6 py-6">
                <Suspense fallback={'Loading...'}>
                    <FontDetailView font={font} />
                </Suspense>
            </div>
        </main>
    )
}
