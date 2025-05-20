'use client'

import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { useState } from 'react'
import Image from 'next/image'
import { EyeIcon, EyeOffIcon, Loader2, X } from 'lucide-react'
import { signUp } from '@dalim/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUp() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const toggleVisibility = () => setIsVisible((prevState) => !prevState)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Card className="z-50 mx-auto mb-10 max-w-md">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
                <CardDescription className="text-xs md:text-sm">Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input
                                id="first-name"
                                placeholder="Max"
                                required
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                                value={firstName}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                                id="last-name"
                                placeholder="Robinson"
                                required
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                                value={lastName}
                            />
                        </div>
                    </div>
                    <div className=" grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                        />
                        
                    </div>
                    <div className="relative grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type={isVisible ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            placeholder="Password"
                        />
                        <button
                            className="mt-2.5 text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
                    <div className="grid relative gap-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type={isVisible ? 'text' : 'password'}
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            autoComplete="new-password"
                            placeholder="Confirm Password"
                        />
						<button
                            className="mt-2.5 text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
                    <div className="grid gap-2">
                        <Label htmlFor="image">Profile Image (optional)</Label>
                        <div className="flex items-end gap-4">
                            {imagePreview && (
                                <div className="relative h-16 w-16 overflow-hidden rounded-sm">
                                    <Image
                                        src={imagePreview}
                                        alt="Profile preview"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            )}
                            <div className="flex w-full items-center gap-2">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full"
                                />
                                {imagePreview && (
                                    <X
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setImage(null)
                                            setImagePreview(null)
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                        onClick={async () => {
                            await signUp.email({
                                email,
                                password,
                                name: `${firstName} ${lastName}`,
                                image: image ? await convertImageToBase64(image) : '',
                                callbackURL: '/dashboard',
                                fetchOptions: {
                                    onResponse: () => {
                                        setLoading(false)
                                    },
                                    onRequest: () => {
                                        setLoading(true)
                                    },
                                    onError: (ctx) => {
                                        toast.error(ctx.error.message)
                                    },
                                    onSuccess: async () => {
                                        router.push('/dashboard')
                                    },
                                },
                            })
                        }}>
                        {loading ? (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            'Create an account'
                        )}
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex w-full justify-center border-t py-4">
                    <Link href={'/login'}>
                        <p className="text-center text-xs text-neutral-500">
                            Already have an account? <span className="text-orange-400">Login</span>
                        </p>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

async function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}
