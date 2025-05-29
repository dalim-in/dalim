import { AlertCircle, CheckCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@dalim/core/ui/alert'
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'
import { DALIM_URL } from '@dalim/auth'

interface AuthFormMessageProps {
    title?: string
    message: string
    type: 'default' | 'destructive'
}
const AuthFormMessage = ({ message, type, title }: AuthFormMessageProps) => {
    return (
        <div>
            <div className="my-12 flex h-[40vh] flex-col items-center">
                <main className="relative w-full overflow-hidden px-6">
                    <div>
                        <Alert
                            className="flex items-center justify-center border-none [&>svg]:static [&>svg]:mx-auto"
                            variant={type}>
                            {type === 'default' ? (
                                <CheckCircle
                                    strokeWidth={0.5}
                                    className="h-20 w-20"
                                />
                            ) : (
                                <AlertCircle
                                    strokeWidth={0.5}
                                    className="h-20 w-20"
                                />
                            )}
                        </Alert>
                    </div>

                    {title && <h1 className="mb-3 text-center text-3xl font-extrabold tracking-tighter md:text-5xl">{message}</h1>}
                    <p className="text-primary/60 px-6 text-center text-xs md:text-sm lg:text-lg">{title}</p>
                    <div className="my-8 flex items-center justify-center gap-1">
                        <span className="relative flex h-3 w-3 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        <p className="text-xs text-green-500">Available for New Projects</p>
                    </div>
                </main>
                <div className="">
                    <Link href={`${DALIM_URL}`}>
                        <Button size={'lg'}>Let's Go</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const AuthFormMessageLogin = ({ message, type, title }: AuthFormMessageProps) => {
    return (
        <div>
            <div>
                <Alert variant={type}>
                    {type === 'default' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4" />}
                    {title && <AlertTitle>{title}</AlertTitle>}
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            </div>
        </div>
    )
}

export { AuthFormMessage, AuthFormMessageLogin }
