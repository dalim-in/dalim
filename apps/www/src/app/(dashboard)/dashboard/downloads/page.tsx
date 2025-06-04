import { auth } from '@dalim/auth'
import { redirect } from 'next/navigation'
import { getUserDownloads, getDownloadStats } from '@/src/actions/downloads'
import { DownloadsDashboard } from '@/src/components/dashboard/downloads/downloads-dashboard'

interface DownloadsPageProps {
    searchParams: {
        page?: string
        search?: string
        type?: string
    }
}

export default async function DownloadsPage({ searchParams }: DownloadsPageProps) {
    const session = await auth()

    if (!session?.user) {
        redirect('/login')
    }

    const page = Number.parseInt(searchParams.page || '1')
    const search = searchParams.search || ''
    const type = searchParams.type || ''

    const [{ downloads, total, pages, currentPage }, stats] = await Promise.all([getUserDownloads({ page, search, type, limit: 20 }), getDownloadStats()])

    return (
        <div className="mt-3"> 
            <DownloadsDashboard
                downloads={downloads}
                total={total}
                pages={pages}
                currentPage={currentPage}
                stats={stats}
            />
        </div>
    )
}
