'use client'

import { useEffect, useState } from 'react'
import { FontCard } from '@/src/components/fonts/font-card'
import { getFonts } from '@/src/lib/fonts'
import { Button } from '@dalim/core/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@dalim/core/hooks/use-toast'

export function FontsList() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fonts, setFonts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        const loadFonts = async () => {
            try {
                const fontData = await getFonts()
                setFonts(fontData)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load fonts',
                    variant: 'destructive',
                })
            } finally {
                setLoading(false)
            }
        }

        loadFonts()
    }, [toast])

    if (loading) {
        return (
            <div className="grid gap-2 py-6">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-card h-30 animate-pulse rounded-lg border p-4"
                    />
                ))}
            </div>
        )
    }

    if (fonts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="mb-4 text-2xl font-semibold">No fonts yet</h3>
                <p className="text-muted-foreground mb-6">Upload your first font to start building your collection</p>
                <Button onClick={() => router.push('/fonts/upload')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload a Font
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-8 py-6">
            <div className="grid gap-2">
                {fonts.map((font) => (
                    <FontCard
                        key={font.id}
                        font={font}
                    />
                ))}
            </div>
        </div>
    )
}


