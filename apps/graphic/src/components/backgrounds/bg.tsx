import { Grid5 } from '@dalim/core/components/common/gallery'
import { getBackgroundsNeonImages, getBackgroundsNoiseImages, getBackgroundsOilPaintImages, getBackgroundsSolarizeImages } from '@/src/lib/cloudinary'
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

export async function SolarizeBackgrounds() {
    const data = await getBackgroundsSolarizeImages()
    const user = await getCurrentUser()

    return (
        <main>
            <Link
                href={user ? 'https://www.jioaicloud.com/l/?u=FOpZBgs8cx-a1pQaPwK8bJ3AMJL_Er2b0H1_YMBAoVs=jqE' : `${DALIM_URL}/login`}
                {...(user ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <Button>{user ? 'Download All' : 'Login to Download All'}</Button>
            </Link> 
            <div className="mt-6">
                <Grid5 images={data.resources} />
            </div>
        </main>
    )
}

export async function OilPaintBackgrounds() {
    const data = await getBackgroundsOilPaintImages()
    const user = await getCurrentUser()

    return (
        <main>
            <Link
                href={user ? 'https://www.jioaicloud.com/l/?u=pX4Tvp-6HZchJqG7mVRTIamQOn_9XzYEkIVlPirn2zU=o8v' : `${DALIM_URL}/login`}
                {...(user ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <Button>{user ? 'Download All' : 'Login to Download All'}</Button>
            </Link> 
            <div className="mt-6">
                <Grid5 images={data.resources} />
            </div>
        </main>
    )
}

export async function NoiseBackgrounds() {
    const data = await getBackgroundsNoiseImages()
    const user = await getCurrentUser()

    return (
        <main>
            <Link
                href={user ? 'https://www.jioaicloud.com/l/?u=Sb0f0xOVc4QPuEla8jjkPaQy5Nzu_2MRDd3PndOAdyA=VaU' : `${DALIM_URL}/login`}
                {...(user ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <Button>{user ? 'Download All' : 'Login to Download All'}</Button>
            </Link> 
            <div className="mt-6">
                <Grid5 images={data.resources} />
            </div>
        </main>
    )
}
