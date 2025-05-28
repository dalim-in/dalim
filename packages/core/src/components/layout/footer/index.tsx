'use client'

import Link from 'next/link'
import { Button } from '../../../ui/button'
import { Input } from '../../../ui/input'
import { ThemeSwitch } from './theme-switch'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
import { DALIM_URL, WORKS_URL } from '@dalim/auth'

const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Docs', href: '/docs' },
    { label: 'Contact', href: '/contact' },
]

const navLinksUI = [
    { label: 'UI', href: '/ui' },
    { label: 'Blocks', href: '/blocks' },
    { label: 'Colors', href: '/colors' },
    { label: 'Easings', href: '/easings' },
    { label: 'Contact', href: `${DALIM_URL}/docs` },
]

const navLinksAgency = [
    { label: 'Works', href: `${WORKS_URL}/docs` },
    { label: 'About', href: `${DALIM_URL}/about` },
    { label: 'Pricing', href: `${DALIM_URL}/pricing` },
    { label: 'Blogs', href: `${DALIM_URL}/blogs` },
    { label: 'Contact', href: `${DALIM_URL}/docs` },
]

function Footer() {
    const router = useRouter()
    return (
        <div className="text-white dark:text-black">
            <footer className="relative before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="pt-10">
                    <div className="bg-brand -my-6 grid gap-12 rounded-3xl border p-10 md:-my-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="relative">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
                            <p className="mb-6 text-white/40 dark:text-black/60">Join our newsletter for the latest updates and exclusive offers.</p>
                            <form className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white pr-12 backdrop-blur-sm"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-0.5 top-0.5 h-8 w-8 rounded-md bg-white text-black transition-transform hover:scale-105 hover:text-white dark:hover:text-black">
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Subscribe</span>
                                </Button>
                            </form>
                            <div className="bg-primary/10 absolute -right-4 top-0 h-24 w-24 rounded-full blur-2xl" />
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                            <nav className="space-y-2">
                                {navLinksUI.map(({ label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="">
                            <div className="">
                                <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                                <div className="grid space-y-2 text-white/40 dark:text-black/60">
                                    <a
                                        href="https://www.google.com/maps/place/Dalim/@23.6407561,86.1020664,19z/data=!3m1!4b1!4m6!3m5!1s0x39f42309f0f5d0b5:0xb7e835eb8fe26ca3!8m2!3d23.6407549!4d86.1027101!16s%2Fg%2F11xftydckp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline">
                                        Bokaro, India
                                    </a>
                                    <a
                                        href="tel:+11234567890"
                                        className="hover:underline">
                                        Phone
                                    </a>
                                    <a
                                        href="mailto:contact@dalim.in"
                                        className="hover:underline">
                                        Email
                                    </a>
                                </div>
                            </div>

                            <div className="-ml-3 mt-1">
                                <Select onValueChange={(value) => router.push(`/docs/legal/${value}`)}>
                                    <SelectTrigger className="text-md w-40 border-0 text-white/40 shadow-none dark:text-black/60">
                                        <SelectValue placeholder="Legal" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        <SelectGroup>
                                            <SelectItem value="contact">Contact</SelectItem>
                                            <SelectItem value="terms">Terms</SelectItem>
                                            <SelectItem value="privacy">Privacy</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="relative">
                            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
                            <div className="mb-6 flex gap-6">
                                <Link
                                    href={'https://www.linkedin.com/company/dalim-in'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    LinkedIn
                                </Link>
                                <Link
                                    href={'https://x.com/dalim_in'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Twitter X
                                </Link>
                                <Link
                                    href={'https://www.instagram.com/dalim.design/'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Instagram
                                </Link>
                            </div>
                            <ThemeSwitch />
                        </div>
                    </div>
                    <div className="relative mt-10 before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]"></div>
                    <div className="flex flex-col items-center justify-between gap-3 py-4 text-center md:flex-row">
                        <p className="text-muted-foreground text-sm">© 2025 Dalim. All rights reserved.</p>
                        <nav className="flex gap-4 text-sm">
                            <a
                                href="#"
                                className="text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                Terms of Service
                            </a>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FooterAgency() {
    const router = useRouter()
    return (
        <div className="text-white dark:text-black">
            <footer className="relative before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="pt-10">
                    <div className="bg-brand -my-6 grid gap-12 rounded-3xl border p-10 md:-my-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="relative">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
                            <p className="mb-6 text-white/40 dark:text-black/60">Join our newsletter for the latest updates and exclusive offers.</p>
                            <form className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white pr-12 backdrop-blur-sm"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-0.5 top-0.5 h-8 w-8 rounded-md bg-white text-black transition-transform hover:scale-105 hover:text-white dark:hover:text-black">
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Subscribe</span>
                                </Button>
                            </form>
                            <div className="bg-primary/10 absolute -right-4 top-0 h-24 w-24 rounded-full blur-2xl" />
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                            <nav className="space-y-2">
                                {navLinks.map(({ label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="">
                            <div className="">
                                <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                                <div className="grid space-y-2 text-white/40 dark:text-black/60">
                                    <a
                                        href="https://www.google.com/maps/place/Dalim/@23.6407561,86.1020664,19z/data=!3m1!4b1!4m6!3m5!1s0x39f42309f0f5d0b5:0xb7e835eb8fe26ca3!8m2!3d23.6407549!4d86.1027101!16s%2Fg%2F11xftydckp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline">
                                        Bokaro, India
                                    </a>
                                    <a
                                        href="tel:+11234567890"
                                        className="hover:underline">
                                        Phone
                                    </a>
                                    <a
                                        href="mailto:contact@dalim.in"
                                        className="hover:underline">
                                        Email
                                    </a>
                                </div>
                            </div>

                            <div className="-ml-3 mt-1">
                                <Select onValueChange={(value) => router.push(`/docs/legal/${value}`)}>
                                    <SelectTrigger className="text-md w-40 border-0 text-white/40 shadow-none dark:text-black/60">
                                        <SelectValue placeholder="Legal" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        <SelectGroup>
                                            <SelectItem value="contact">Contact</SelectItem>
                                            <SelectItem value="terms">Terms</SelectItem>
                                            <SelectItem value="privacy">Privacy</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="relative">
                            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
                            <div className="mb-6 flex gap-6">
                                <Link
                                    href={'https://www.linkedin.com/company/dalim-in'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    LinkedIn
                                </Link>
                                <Link
                                    href={'https://x.com/dalim_in'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Twitter X
                                </Link>
                                <Link
                                    href={'https://www.instagram.com/dalim.design/'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Instagram
                                </Link>
                            </div>
                            <ThemeSwitch />
                        </div>
                    </div>
                    <div className="relative mt-10 before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]"></div>
                    <div className="flex flex-col items-center justify-between gap-3 py-4 text-center md:flex-row">
                        <p className="text-muted-foreground text-sm">© 2025 Dalim. All rights reserved.</p>
                        <nav className="flex gap-4 text-sm">
                            <a
                                href="#"
                                className="text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                Terms of Service
                            </a>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FooterUI() {
    const router = useRouter()
    return (
        <div className="text-white dark:text-black">
            <footer className="relative before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="pt-10">
                    <div className="bg-brand -my-6 grid gap-12 rounded-3xl border p-10 md:-my-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="relative">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
                            <p className="mb-6 text-white/40 dark:text-black/60">Join our newsletter for the latest updates and exclusive offers.</p>
                            <form className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white pr-12 backdrop-blur-sm"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-0.5 top-0.5 h-8 w-8 rounded-md bg-white text-black transition-transform hover:scale-105 hover:text-white dark:hover:text-black">
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Subscribe</span>
                                </Button>
                            </form>
                            <div className="bg-primary/10 absolute -right-4 top-0 h-24 w-24 rounded-full blur-2xl" />
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                            <nav className="space-y-2">
                                {navLinksAgency.map(({ label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="">
                            <div className="">
                                <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                                <div className="grid space-y-2 text-white/40 dark:text-black/60">
                                    <a
                                        href="https://www.google.com/maps/place/Dalim/@23.6407561,86.1020664,19z/data=!3m1!4b1!4m6!3m5!1s0x39f42309f0f5d0b5:0xb7e835eb8fe26ca3!8m2!3d23.6407549!4d86.1027101!16s%2Fg%2F11xftydckp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline">
                                        Bokaro, India
                                    </a>
                                    <a
                                        href="tel:+11234567890"
                                        className="hover:underline">
                                        Phone
                                    </a>
                                    <a
                                        href="mailto:contact@dalim.in"
                                        className="hover:underline">
                                        Email
                                    </a>
                                </div>
                            </div>

                            <div className="-ml-3 mt-1">
                                <Select onValueChange={(value) => router.push(`/docs/legal/${value}`)}>
                                    <SelectTrigger className="text-md w-40 border-0 text-white/40 shadow-none dark:text-black/60">
                                        <SelectValue placeholder="Legal" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        <SelectGroup>
                                            <SelectItem value="contact">Contact</SelectItem>
                                            <SelectItem value="terms">Terms</SelectItem>
                                            <SelectItem value="privacy">Privacy</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="relative">
                            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
                            <div className="mb-6 flex gap-6">
                                <Link
                                    href={'https://www.linkedin.com/company/dalim-in'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    LinkedIn
                                </Link>
                                <Link
                                    href={'https://x.com/dalim_in'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Twitter X
                                </Link>
                                <Link
                                    href={'https://www.instagram.com/dalim.design/'}
                                    target="_blank"
                                    className="text-white/40 hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Instagram
                                </Link>
                            </div>
                            <ThemeSwitch />
                        </div>
                    </div>
                    <div className="relative mt-10 before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]"></div>
                    <div className="flex flex-col items-center justify-between gap-3 py-4 text-center md:flex-row">
                        <p className="text-muted-foreground text-sm">© 2025 Dalim. All rights reserved.</p>
                        <nav className="flex gap-4 text-sm">
                            <a
                                href="#"
                                className="text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                Terms of Service
                            </a>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export { FooterAgency, Footer, FooterUI }
