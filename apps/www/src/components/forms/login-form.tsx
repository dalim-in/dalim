'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Loader, LoaderIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@dalim/core/ui/input-otp'

import { login, CredentialsSchema } from '@dalim/auth'
import { Button } from '@dalim/core/ui/button'
import { AuthFormMessageLogin } from './auth-form-message'
import { Separator } from '@dalim/core/ui/separator'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@dalim/core/ui/form'
import { Input } from '../ui/input'
import { Google } from '@dalim/core/components/logos'

export function LoginForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [showOTPForm, setShowOTP] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const callbackError = searchParams?.get('error') === 'OAuthAccountNotLinked' ? 'Email in use with a different provider' : undefined

    const form = useForm<z.infer<typeof CredentialsSchema>>({
        resolver: zodResolver(CredentialsSchema),
        defaultValues: {
            email: '',
            password: '',
            code: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof CredentialsSchema>) => {
        startTransition(async () => {
            try {
                const resp = await login(values)

                if (!resp) {
                    setError('Invalid response from server')
                    setSuccess('')
                    form.reset()
                    return
                }

                const { error: loginError, success: loginSuccess, data } = resp

                if (data?.twoFactorAuthEnabled) {
                    setShowOTP(true)
                    if (loginError) {
                        setError(loginError)
                        setSuccess('')
                    }
                    return
                }

                if (loginError) {
                    setError(loginError)
                    setSuccess('')
                    form.reset()
                    return
                }

                if (loginSuccess) {
                    setSuccess(loginSuccess)
                    setError('')

                    // 🔐 Create session with NextAuth
                    const res = await signIn('credentials', {
                        email: values.email,
                        password: values.password,
                        redirect: false,
                    })

                    if (res?.ok) {
                        router.push('/dashboard')
                    } else {
                        setError('Login failed during session creation.')
                    }

                    form.reset()
                    return
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Something went wrong')
                setSuccess('')
                form.reset()
            }
        })
    }

    return (
        <div className="mx-auto max-w-md space-y-4 p-6">
            {/* Header */}
            <div className="space-y-1 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">Dalim</h1>
                <p className="text-muted-foreground text-sm">Designs That Give</p>
            </div>

            {/* Google Sign-In */}
            <Button
                variant="outline"
                size="lg"
                type="button"
                onClick={() => {
                    setIsGoogleLoading(true)
                    signIn('google', { callbackUrl: '/dashboard' })
                }}
                disabled={isPending || isGoogleLoading}
                className="w-full">
                {isGoogleLoading && <Loader className="mr-2 size-4 animate-spin" />}
                <span>Continue with Google</span>
                <Google/>
            </Button>

            <Separator />
            <p className="text-muted-foreground text-center text-sm">or continue with email</p>

            {/* Auth Form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4">
                    {!showOTPForm && (
                        <>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                                <div className="flex items-center">
                                                    <Link
                                                        href="/reset-password"
                                                        className="text-secondary-foreground ml-auto mt-2 text-sm underline">
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {showOTPForm && (
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>2FA Code</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>Enter the code sent to your email</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {callbackError && (
                        <AuthFormMessageLogin
                            type="default"
                            message={callbackError}
                            title="Error"
                        />
                    )}
                    {error && (
                        <AuthFormMessageLogin
                            type="default"
                            message={error}
                            title="Error"
                        />
                    )}
                    {success && (
                        <AuthFormMessageLogin
                            type="default"
                            message={success}
                            title="Success"
                        />
                    )}

                    <Button
                        variant="default"
                        className="w-full"
                        disabled={isPending}>
                        <LoaderIcon className={!isPending ? 'hidden' : 'mr-2 animate-spin'} />
                        {showOTPForm ? 'Verify' : 'Sign in'}
                    </Button>
                </form>
            </Form>

            {/* Footer */}
            <div className="text-center text-sm">
                {showOTPForm ? (
                    <>
                        {'Want to sign in again?'}{' '}
                        <Link
                            href="/login"
                            className="underline">
                            Sign in
                        </Link>
                    </>
                ) : (
                    <>
                        {"Don't have an account?"}{' '}
                        <Link
                            href="/register"
                            className="underline">
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
