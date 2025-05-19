import { docsConfig } from '@/src/config/docs'
import { DocsNav } from '@/src/components/mdx/docs-nav'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <div className="flex-1 items-start md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6">
                <aside className="fixed top-2 z-30 hidden h-[calc(100vh-1rem)] w-full shrink-0 border-r md:sticky md:block">
                    <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
                        <DocsNav config={docsConfig} />
                    </div>
                </aside>
                {children}
            </div>
        </div>
    )
}
