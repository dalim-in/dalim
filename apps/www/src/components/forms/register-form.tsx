'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, LoaderIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import type { z } from 'zod'

import Link from 'next/link'

import { register, RegisterSchema } from '@dalim/auth'

import AuthFormMessage from './auth-form-message'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@dalim/core/ui/form'
import { Button } from '@dalim/core/ui/button'
import { Input } from '../ui/input'

export function RegisterForm() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        startTransition(async () => {
            try {
                const { success, error } = await register(values)

                if (error) {
                    setError(error)
                    setSuccess('')
                    return
                }

                setSuccess(success || 'Registration successful')
                setError('')
                form.reset()
            } catch {
                setError('Something went wrong. Please try again.')
                setSuccess('')
                form.reset()
            }
        })
    }

    return (
        <div className="mx-auto max-w-md space-y-4 p-6">
            {/* Header */}
            <div className="space-y-1 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">Create Account</h1>
                <p className="text-muted-foreground text-sm">Join Dalim today</p>
            </div>

            {/* Register Form */}
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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Your name"
                                        autoComplete="off"
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
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
                                    <Input
                                        type="password"
                                        placeholder="••••••"
                                        autoComplete="new-password"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                        type="submit"
                        variant="default"
                        className="w-full"
                        disabled={isPending}>
                        <LoaderIcon className={!isPending ? 'hidden' : 'mr-2 animate-spin'} />
                        Register
                    </Button>
                </form>
            </Form>

            {/* Footer */}
            <div className="text-center text-sm">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="underline">
                    Sign in
                </Link>
            </div>
        </div>
    )
}
