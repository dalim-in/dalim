

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

    const { graphics, pages, currentPage } = await getGraphics({
        search,
        category,
        tags,
        page,
        limit: 12,
    })

    return (
        <div className="">
             <PageHeader
                badge="FonGraphicts"
                className="-mx-6 -mt-14"
                title={'Ready for Every Design.'}
                subheading="Discover the essence of creativity in our exquisite collection of top-tier abstract design assets. Each piece is a blend of beauty and utility, perfect for elevating any project."
            />

            <div className="">
                <div className="hidden">
                    <GraphicsFilters/>
                </div>
                
            </div>
            <div className="lg:col-span-3">
                    <GraphicsGrid
                        graphics={graphics} 
                        pages={pages}
                        currentPage={currentPage}
                    />
                </div>
        </div>
    )
}
