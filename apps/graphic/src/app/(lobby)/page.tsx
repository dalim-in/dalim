import { getGraphics } from '@/src/actions/graphic'
import { GraphicsFilters } from '@/src/components/graphic/graphics-filters'
import { GraphicsGrid } from '@/src/components/graphic/graphics-grid'
import { PageHeader } from '@dalim/core/components/common/page-header'

interface GraphicsPageProps {
    searchParams: {
        search?: string
        category?: string
        tags?: string
        page?: string
    }
}

export default async function GraphicsPage({ searchParams }: GraphicsPageProps) {
    const search = searchParams.search || ''
    const category = searchParams.category || ''
    const tags = searchParams.tags ? searchParams.tags.split(',') : []
    const page = Number.parseInt(searchParams.page || '1')

    // Debug logging
    console.log('Search params:', { search, category, tags, page })

    try {
        const { graphics, pages, currentPage } = await getGraphics({
            search,
            category,
            tags,
            page,
            limit: 12,
        })

        console.log('Graphics result:', { count: graphics.length, pages, currentPage })

        return (
            <div className="">
                <PageHeader
                    badge="Graphics"
                    className="-mx-6 -mt-14 mb-6"
                    title={'Ready for Every Design.'}
                    subheading="Discover the essence of creativity in our exquisite collection of top-tier abstract design assets. Each piece is a blend of beauty and utility, perfect for elevating any project."
                />

                <div className="">
                    <GraphicsFilters />
                    <div className="relative pb-6 before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

                    <GraphicsGrid
                        graphics={graphics}
                        pages={pages}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        )
    } catch (error) {
        console.error('Error loading graphics:', error)
        return (
            <div className="">
                <div className="py-12 text-center">
                    <h3 className="mb-2 text-lg font-semibold">Error loading graphics</h3>
                    <p className="text-muted-foreground">Please try again later.</p>
                </div>
            </div>
        )
    }
}
