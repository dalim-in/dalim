import { Grid5 } from '@dalim/core/components/common/gallery'
import { getBackgroundsNeonImages } from '@/src/lib/cloudinary'
import { Button } from '@dalim/core/ui/button'
import Link from 'next/link'
import { DALIM_URL, getCurrentUser } from '@dalim/auth'

export async function NeonBackgrounds() {
    const data = await getBackgroundsNeonImages()
    const user = await getCurrentUser()

    return (
        <main>
            <Link
                href={user ? 'https://www.jioaicloud.com/l/?u=H4odKkQtbZ4CD2iHzpvL59chzNq5QM4m6EWETrNiYrY=hkW' : `${DALIM_URL}/login`}
                {...(user ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <Button>{user ? 'Download All' : 'Login to Download All'}</Button>
            </Link> 
            <div className="mt-6">
                <Grid5 images={data.resources} />
            </div>
        </main>
    )
}
