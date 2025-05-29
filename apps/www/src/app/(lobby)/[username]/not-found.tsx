import Link from 'next/link'

import { Button } from '@dalim/core/ui/button'

export default function NotFound() {
    return (
        <>
            <div className="mb-10 mt-40 text-center">
                <h1 className="mb-6 text-5xl md:text-7xl">404</h1>
                <p className="text-primary/60">The page you&apos;re looking for does not exist or is no longer here.</p>
            </div>
            <div className="text-center">
                <Link href="/">
                    <Button >Home</Button>
                </Link>
            </div>
        </>
    )
}
