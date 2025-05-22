'use client'

import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Loader, LoaderIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@dalim/core/ui/input-otp";

import { login, CredentialsSchema } from '@dalim/auth'
import { Button } from '@dalim/core/ui/button'
import AuthFormMessage from './auth-form-message'
import { Separator } from '@dalim/core/ui/separator'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@dalim/core/ui/form'
import { Input } from '../ui/input'

export function LoginForm() {
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

                const { error, success, data } = resp

                if (data?.twoFactorAuthEnabled) {
                    setShowOTP(true)
                    if (resp.error) {
                        setError(resp.error)
                        setSuccess('')
                    }
                    return
                }

                if (error) {
                    setError(error)
                    setSuccess('')
                    form.reset()
                    return
                }

                if (success) {
                    setSuccess(success)
                    setError('')
                }

                form.reset()
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

            {/* Google Sign-In Button */}
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
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 256 262"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2">
                    <path
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        fill="#4285F4"
                    />
                    <path
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        fill="#34A853"
                    />
                    <path
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        fill="#FBBC05"
                    />
                    <path
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        fill="#EB4335"
                    />
                </svg>
            </Button>

            {/* Divider */}
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
                                                        className="text-secondary-foreground mt-2 ml-auto text-sm underline">
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
                        <AuthFormMessage
                            type="default"
                            message={callbackError}
                            title="Error"
                        />
                    )}
                    {error && (
                        <AuthFormMessage
                            type="default"
                            message={error}
                            title="Error"
                        />
                    )}
                    {success && (
                        <AuthFormMessage
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
