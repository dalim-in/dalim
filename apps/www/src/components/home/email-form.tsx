'use client'
import React, { useTransition } from 'react'
import { toast } from '@dalim/core/hooks/use-toast'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input' 
import { Hourglass, LoaderCircle, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@dalim/core/ui/badge'
import { Globe } from '@dalim/core/components/backgrunds/globe'

const EmailForm = ( ) => {
    const [isPending, startTransaction] = useTransition()

    const [, setIsLoading] = useState<boolean>(false)

    const handleClick = () => {
        setIsLoading(true)
        // Simulate an async operation
        setTimeout(() => {
            setIsLoading(false)
        }, 1000) // Reset after 1 second
    }

    function getDaysLeft(): number {
        const endDate = new Date('2026-01-01') // Set your target date here
        const today = new Date()
        const diffTime = endDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return Math.max(0, diffDays)
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const target = event.target as HTMLFormElement
        const form = new FormData(target)
        const email = form.get('email')
        const fullName = form.get('name') as string

        if (!email || !fullName) {
            return null
        }

        // Split full name into first and last name
        const [firstName, ...lastNameParts] = fullName.trim().split(' ')
        const lastName = lastNameParts.join(' ') || '' // Join remaining parts or empty string

        startTransaction(async () => {
            try {
                const res = await fetch('/api/resend', {
                    method: 'POST',
                    body: JSON.stringify({ email, firstName, lastName }),
                    headers: { 'Content-Type': 'application/json' },
                })

                if (res.ok) {
                    target.reset()
                    toast({
                        title: 'Thank you for subscribing 🎉',
                        description: "You're all set to receive updates.",
                    })
                } else {
                    console.error('Error:', res.status, res.statusText)

                    toast({
                        title: 'Something went wrong',
                        description: "You're all set to receive updates.",
                    })
                }
            } catch (error) {
                console.error('Fetch error:', error)
            }
        })
    }
    return (
        <div className='border-y -mx-6 mb-10'>
            <div className='grid md:grid-cols-2'>
               <div className="relative flex h-full w-full justify-center overflow-hidden">
       
      <Globe className="top-2" />
     </div>
        <div className="flex flex-col justify-center space-y-6 p-6 md:p-10">
            <div className="space-y-3">
                {/* <div className="text-orange-500 font-medium">Limited Time Offer</div> */}
                <Badge className='bg-green-500 text-sm text-white'>
                    <Hourglass
                        className='w-3 mr-1 h-3'
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                    {getDaysLeft()} days left
                </Badge> 
                <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Designs With AI.</h1>
                <p className='text-primary/60 text-xs'>A platform for discovering open-source design projects, fostering creative collaboration, and growing together — connecting designers with impactful projects and passionate contributors.</p>
            </div>

            <form
                onSubmit={(e) => handleSubmit(e)}
                className="">
                <div className='flex flex-wrap gap-2'> 
                    <div className="relative">
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="Name..."
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                            <User
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <Input
                            type="email"
                            className='w-60'
                            name="email"
                            id="email"
                            required
                            placeholder="Email Address..."
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                            <Mail
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
                <Button
                    onClick={handleClick}
                    disabled={isPending}
                    data-loading={isPending}
                    type="submit"
                    className="group mt-2 relative disabled:opacity-100">
                    <span className="group-data-[loading=true]:text-transparent">Join the waitlist</span>
                    {isPending && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <LoaderCircle
                                className="animate-spin"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>
                    )}
                </Button>
                
            </form>
            </div>
        </div>
        </div>
    )
}

export { EmailForm }
