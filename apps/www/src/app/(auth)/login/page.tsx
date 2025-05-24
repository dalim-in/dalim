import { Suspense } from 'react'
import Link from 'next/link'

import { Button } from '@dalim/core/ui/button'
import { Card, CardContent } from '@dalim/core/ui/card'
import { LoginForm } from '@/src/components/forms/login-form'
import { getCurrentUser } from '@dalim/auth'
import { redirect } from 'next/navigation'
import { WarpBackground } from "@dalim/core/components/backgrunds/warp-bg";


export const metadata = {
    title: 'Login - Dalim',
    description: 'A design agency with a touch of magic.',
}

export default async function Page() {
    const user = await getCurrentUser()

    if (user) {
        redirect('/dashboard') // ✅ Redirect only if the user is logged in
    }

    return (
        <WarpBackground perspective={200} className='-mx-6 -mt-14'>
        <div className="">
            <div className="relative z-10 flex flex-col divide-indigo-300 dark:divide-indigo-700">
                <div className="mx-auto flex h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-2 px-2 py-4 sm:px-10 lg:px-24">
                    <Link
                        href="/">
                        <Button >Back to Home</Button>
                    </Link>
                    <h1 className="text-text-primary dark:text-dark-text-primary text-pretty text-center text-4xl font-medium leading-none tracking-[-1.44px] sm:text-5xl md:max-w-screen-lg md:text-6xl md:tracking-[-2.16px] lg:text-[clamp(50px,7vw,75px)]">Log in to your account</h1>
                    <h2 className="text-md text-text-tertiary dark:text-dark-text-tertiary max-w-2xl text-pretty text-center md:text-lg">Get started now.</h2>
                </div>

                <div className="dark:divide-dark-border -mt-10 mb-20 flex items-start justify-center divide-y divide-white/10 px-8 sm:px-24">
                    <div className="m flex w-full max-w-md flex-col items-center justify-start">
                        <div className="grid w-full gap-6">
                            <Card className="py-6 shadow-2xl">
                                <CardContent>
                                    <Suspense>
                                        <LoginForm />
                                    </Suspense>
                                </CardContent>
                            </Card>
                            <p className="px-8 text-center text-sm text-slate-600 dark:text-slate-400">
                                By clicking continue, you agree to our{' '}
                                <Link
                                    href="/terms"
                                    className="hover:text-primary underline underline-offset-4 hover:no-underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="/privacy"
                                    className="hover:text-primary underline underline-offset-4 hover:no-underline">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </WarpBackground>
    )
}
