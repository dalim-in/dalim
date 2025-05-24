import { Badge } from '../../ui/badge'
import { cn } from '../../lib/utils'
import { GridPattern } from '../backgrunds/grid'

interface PageHeaderProps {
    title: string
    className?: string
    subheading: string
    badge: string
}

export function PageHeader({ title, className, subheading, badge }: PageHeaderProps) {
    return (
        <div className={cn('relative text-center md:border-b md:p-10', className)}>
            <GridPattern
                width={5}
                height={5}
                className="w-full opacity-50"
            />
            <div className="border-y  bg-white dark:bg-black md:py-18 p-10 md:border">
                <Badge
                    variant={'outline'}
                    className="rounded-full px-4 py-2">
                    {badge}
                </Badge>
                <h1 className="mb-3 mt-6 text-4xl font-bold tracking-tighter md:text-5xl">{title}</h1>
                <p className="text-muted-foreground text-md mx-auto max-w-xl">{subheading}</p>
            </div>
        </div>
    )
}
