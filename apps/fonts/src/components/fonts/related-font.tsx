'use client'

import { FontCard } from './font-card'

interface RelatedFontsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fonts: any[]
}

export function RelatedFonts({ fonts }: RelatedFontsProps) {
    if (!fonts.length) {
        return null
    }

    return (
        <section className="mt-6">
            <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

            <h2 className="py-6 text-xl font-semibold text-center">Related Fonts</h2>

            <div className="grid gap-2">
                {fonts.map((font) => (
                    // eslint-disable-next-line react/jsx-key
                    <div>
                        <FontCard font={font} />
                    </div>
                ))}
            </div>
        </section>
    )
}
