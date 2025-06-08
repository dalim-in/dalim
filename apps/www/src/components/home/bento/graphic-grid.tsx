import { getGraphics } from '../../../../../graphic/src/actions/graphic'
import { GraphicsGridWWW } from '../../../../../graphic/src/components/graphic/graphics-grid'

export async function Graphics() {
    const page = 1 // Always start with page 1 for infinite scroll

    try {
        const { graphics, total, currentPage } = await getGraphics({
            page,
            limit: 12,
        })

        return (
            <div className="">
                <GraphicsGridWWW
                    initialGraphics={graphics}
                    initialTotal={total}
                    initialPage={currentPage}
                />
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
