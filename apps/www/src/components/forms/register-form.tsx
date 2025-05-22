'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
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
