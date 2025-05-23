import { Suspense } from 'react'
import Link from 'next/link'

import { Button } from '@dalim/core/ui/button'
import { Card, CardContent } from '@dalim/core/ui/card'
import { RegisterForm } from '@/src/components/forms/register-form'
import { getCurrentUser } from '@dalim/auth'
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'Create an Account - Dalim',
    description: 'Join Dalim to unlock powerful design tools and collaboration features.',
}

export default async function Page() {
    const user = await getCurrentUser()

    if (user) {
        redirect('/dashboard') // Redirect if already logged in
    }

    return (
        <div>
            <div className="relative z-10 flex flex-col -mt-10">
                {/* Header */}
                <div className="mx-auto flex h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-2 px-2 py-4 sm:px-10 lg:px-24">
                    <Link
                        href="/"
                        className="">
                        <Button variant="secondary">Back to Home</Button>
                    </Link>
                    <h1 className="text-text-primary dark:text-dark-text-primary text-pretty text-center text-4xl font-medium leading-none tracking-[-1.44px] sm:text-5xl md:max-w-screen-lg md:text-6xl md:tracking-[-2.16px] lg:text-[clamp(50px,7vw,75px)]">Create your account</h1>
                    <h2 className="text-md text-text-tertiary dark:text-dark-text-tertiary max-w-2xl text-pretty text-center md:text-lg">Sign up in seconds and start building something amazing.</h2>
                </div>

                {/* Form */}
                <div className="dark:divide-dark-border mb-20 flex items-start justify-center divide-y divide-white/10 px-8 sm:px-24">
                    <div className="flex w-full max-w-md flex-col items-center justify-start">
                        <div className="grid w-full gap-6">
                            <Card className="py-6 shadow-2xl">
                                <CardContent>
                                    <Suspense>
                                        <RegisterForm />
                                    </Suspense>
                                </CardContent>
                            </Card>
                            <p className="px-8 text-center text-sm text-slate-600 dark:text-slate-400">
                                By continuing, you agree to our{' '}
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
    )
}
