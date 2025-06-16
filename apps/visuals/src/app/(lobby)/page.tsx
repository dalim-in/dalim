import { auth } from '@dalim/auth'
import { prisma } from '@dalim/db'
import { VisualsGrid } from '@/src/components/visuals/visuals-grid' 
import { VisualFilters } from '@/src/components/visuals/visual-filters'
import { Suspense } from 'react'
import { PageHeader } from '@dalim/core/components/common/page-header'

interface VisualsPageProps {
    searchParams: {
        category?: string
        search?: string
    }
}

export default async function VisualsPage({ searchParams }: VisualsPageProps) {
    const session = await auth()
    const isAdmin = session?.user?.role === 'ADMIN'

    const visuals = await prisma.visuals.findMany({
        where: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(searchParams.category && { category: searchParams.category as any }),
            ...(searchParams.search && {
                OR: [{ title: { contains: searchParams.search, mode: 'insensitive' } }, { description: { contains: searchParams.search, mode: 'insensitive' } }, { tags: { has: searchParams.search } }],
            }),
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })

    return (
        <div className="">
            <PageHeader
                badge="Visuals"
                className="-mx-6 -mt-14"
                title={'Find a inspiration for your Designs.'}
                subheading="Discover beautifully crafted typefaces for every creative project — from modern displays to vintage-inspired lettering."
            />
           <div className="mx-auto max-w-6xl border-x px-6 py-6">
            <Suspense fallback={<div>Loading filters...</div>}>
                <VisualFilters isAdmin={isAdmin} />
            </Suspense>

            <Suspense fallback={<div>Loading visuals...</div>}>
                <VisualsGrid
                    visuals={visuals}
                    currentUserId={session?.user?.id}
                />
            </Suspense>
            </div>
        </div>
    )
}
