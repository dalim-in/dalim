'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@dalim/core/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Card } from '@dalim/core/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'
import { useToast } from '@dalim/core/hooks/use-toast'
import { getFontById } from '@/src/lib/fonts'
import { FontEditForm } from '@/src/components/fonts/font-edit-form'
import { FontPreview } from '@/src/components/fonts/font-preview'
import Link from 'next/link'

interface FontEditPageProps {
    params: Promise<{ id: string }>
}

export default function FontEditPage({ params }: FontEditPageProps) {
    const { id } = use(params) // ✅ unwrap params with use()
    const router = useRouter()
    const { toast } = useToast()
    const { data: session, status } = useSession()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [font, setFont] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [unauthorized, setUnauthorized] = useState(false)

    useEffect(() => {
        const fetchFont = async () => {
            try {
                const fontData = await getFontById(id)
                if (!fontData) {
                    toast({
                        title: 'Error',
                        description: 'Font not found',
                        variant: 'destructive',
                    })
                    router.push('/fonts')
                    return
                }

                // ✅ Only allow access if current user is the owner
                if (session?.user?.id !== fontData.userId) {
                    setUnauthorized(true)
                    return
                }

                setFont(fontData)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load font',
                    variant: 'destructive',
                })
            } finally {
                setLoading(false)
            }
        }

        if (status !== 'loading') {
            fetchFont()
        }
    }, [id, session, status, router, toast])

    if (loading || status === 'loading') {
        return (
            <div className="container mx-auto flex h-[70vh] items-center justify-center px-4 py-8">
                <div className="animate-pulse text-xl">Loading font data...</div>
            </div>
        )
    }

    if (unauthorized) {
        return (
            <div className="container mx-auto px-4 py-28 text-center">
                <h2 className="mb-2 text-2xl font-bold">Unauthorized</h2>
                <p className="text-muted-foreground">You don’t have permission to edit this font.</p>
                <Link href="/">
                    <Button className="mt-8">Home</Button>
                </Link>
            </div>
        )
    }

    return (
        <main className="my-3 mb-6">
            <div className="mb-3 flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="mr-2">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold">Edit Font: {font?.name}</h1>
            </div>
            <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

            <Tabs
                defaultValue="details"
                className="w-full pt-6">
                <TabsList className="">
                    <TabsTrigger value="details">Font Details</TabsTrigger> 
                    <TabsTrigger value="files">Files</TabsTrigger>
                </TabsList>

                <TabsContent className='grid gap-3' value="details">
                    <Card className="p-6">
                        <FontEditForm font={font} />
                    </Card>
                    <FontPreview
                            font={{
                                url: font?.previewUrl,
                                name: font?.name,
                                type: font?.type,
                            }}
                            expanded
                        />
                </TabsContent> 

                <TabsContent value="files">
                    <Card className="p-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Font Files</h3>
                            <p className="text-muted-foreground">To replace files, please upload a new font.</p>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between rounded-md border p-3">
                                    <span>Preview Font File</span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        asChild>
                                        <a
                                            href={font?.previewUrl}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            View
                                        </a>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between rounded-md border p-3">
                                    <span>Download Font File</span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        asChild>
                                        <a
                                            href={font?.downloadUrl}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            View
                                        </a>
                                    </Button>
                                </div>
                                {font?.zipFileUrl && (
                                    <div className="flex items-center justify-between rounded-md border p-3">
                                        <span>ZIP Font Package</span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            asChild>
                                            <a
                                                href={font?.zipFileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                View
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}
