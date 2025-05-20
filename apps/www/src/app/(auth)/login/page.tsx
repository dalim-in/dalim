'use client'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Checkbox } from '@dalim/core/ui/checkbox'
import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { client } from '@/src/lib/auth/auth-client'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)

    const [googleLoading, setGoogleLoading] = useState(false)
    const [githubLoading, seGithubLoading] = useState(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const toggleVisibility = () => setIsVisible((prevState) => !prevState)

    return (
        <Card className="z-50 mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
                <CardDescription className="text-xs md:text-sm">Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="contact@dalim.in"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                        />
                    </div>
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forget-password"
                            className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="relative grid gap-2">
                        <Input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                            placeholder="Password"
                            type={isVisible ? 'text' : 'password'}
                        />
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label={isVisible ? 'Hide password' : 'Show password'}
                            aria-pressed={isVisible}
                            aria-controls="password">
                            {isVisible ? (
                                <EyeOffIcon
                                    size={16}
                                    aria-hidden="true"
                                />
                            ) : (
                                <EyeIcon
                                    size={16}
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            onClick={() => {
                                setRememberMe(!rememberMe)
                            }}
                        />
                        <Label>Remember me</Label>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                        onClick={async () => {
                            await client.signIn.email(
                                {
                                    email: email,
                                    password: password,
                                    callbackURL: '/dashboard',
                                    rememberMe,
                                },
                                {
                                    onRequest: () => {
                                        setLoading(true)
                                    },
                                    onResponse: () => {
                                        setLoading(false)
                                    },
                                    onError: (ctx) => {
                                        toast.error(ctx.error.message)
                                    },
                                }
                            )
                        }}>
                        {loading ? (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            'Login'
                        )}
                    </Button>
                    <div className="flex w-full flex-wrap items-center gap-2">
                        <Button
                            variant="outline"
                            className="w-full flex-1 gap-2 py-4"
                            onClick={async () => {
                                try {
                                    setGoogleLoading(true)
                                    await client.signIn.social({
                                        provider: 'google',
                                        callbackURL: '/dashboard',
                                    })
                                } finally {
                                    setGoogleLoading(false)
                                }
                            }}>
                            {googleLoading ? (
                                <Loader2
                                    className="animate-spin"
                                    size={16}
                                />
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="0.98em"
                                        height="1em"
                                        viewBox="0 0 256 262">
                                        <path
                                            fill="currentColor"
                                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                        />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full flex-1 gap-2 py-4"
                            onClick={async () => {
                                try {
                                    seGithubLoading(true)
                                    await client.signIn.social({
                                        provider: 'github',
                                        callbackURL: '/dashboard',
                                    })
                                } finally {
                                    seGithubLoading(false)
                                }
                            }}>
                            {githubLoading ? (
                                <Loader2
                                    className="animate-spin"
                                    size={16}
                                />
                            ) : (
                                <>
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            clipRule="evenodd"
                                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                            fill="#fff"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                    Continue with Github
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex w-full justify-center border-t py-4">
                    <Link href={'/signup'}>
                        <p className="text-center text-xs text-neutral-500">
                            Don't have an account? <span className="text-orange-400">Sign Up</span>
                        </p>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
export default LogIn
