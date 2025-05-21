 
import { Metadata } from 'next/types'

const title = 'Admin'
const description = 'Manage users and view system statistics'

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
}

export default function BlocksLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        
            <div className="container-wrapper flex-1">{children}</div>
        </>
    )
}
