 

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

export function BookCall() {
    useEffect(() => {
        ;(async function () {
            const cal = await getCalApi({ namespace: '15min' })
            cal('ui', { cssVarsPerTheme: { light: { 'cal-brand': '#000000' }, dark: { 'cal-brand': '#ffffff' } }, hideEventTypeDetails: false, layout: 'month_view' })
        })()
    }, [])
    return (
        <div className="my-8">
            <Cal
                namespace="15min"
                calLink="dalim/15min"
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view' }}
            />
        </div>
    )
}
