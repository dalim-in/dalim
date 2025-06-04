import { Backgrounds } from '@/src/components/backgrounds/backgrounds'
import { PageHeader } from '@dalim/core/components/common/page-header'

export default function GraphicBackgroundsPage() {
    return (
        <div className="-mt-14">
            <PageHeader
                badge="Backgrounds"
                className="-mx-6 -mt-14 mb-6"
                title={'Download High Quality Backgrounds.'}
                subheading="Discover the essence of creativity in our exquisite collection of top-tier abstract design assets. Each piece is a blend of beauty and utility, perfect for elevating any project."
            />
            <Backgrounds/>
        </div>
    )
}
