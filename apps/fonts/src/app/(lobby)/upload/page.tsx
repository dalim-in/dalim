'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@dalim/core/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Card } from '@dalim/core/ui/card'
import { FontUploadForm } from '@/src/components/fonts/font-upload-form'
import { FontPreview } from '@/src/components/fonts/font-preview'

export default function UploadFontPage() {
    const router = useRouter()
    const [previewFont, setPreviewFont] = useState<{
        url: string
        name: string
        type: string
    } | null>(null)

    return (
        <main className="-mt-14">
            <div className="flex justify-center items-center py-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold">Upload New Font</h1>
            </div>
              <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

            <div className="grid grid-cols-1 my-6 gap-3 md:grid-cols-2">
                <Card className="p-6">
                    <FontUploadForm setPreviewFont={setPreviewFont} />
                </Card>

                <Card className="h-full p-6">
                    {previewFont ? (
                        <FontPreview expanded font={previewFont} />
                    ) : (
                        <div className="text-muted-foreground flex h-full items-center justify-center">
                            <p>Upload a font to see preview</p>
                        </div>
                    )}
                </Card>
            </div>
        </main>
    )
}
