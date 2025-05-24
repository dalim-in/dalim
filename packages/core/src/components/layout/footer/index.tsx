'use client'

import Link from 'next/link'
import { Button } from '../../../ui/button'
import { Input } from '../../../ui/input'
import { Send } from 'lucide-react'
import { ThemeSwitch } from './theme-switch'

const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Docs', href: '/docs' },
    { label: 'Contact', href: '/contact' },
]

function Footer() {
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
                            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                            <div className="space-y-2 text-white/40 dark:text-black/60">
                                <p>Bokaro, India</p>
                                <p>Phone: (123) 456-7890</p>
                                <p>Email: contact@dalim.in</p>
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
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Works
                                </a>
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Fonts
                                </a>
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Graphics
                                </a>
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Products
                                </a>
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    About
                                </a>
                            </nav>
                        </div>
                        <div className="">
                            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                            <div className="space-y-2 text-white/40 dark:text-black/60">
                                <p>Bokaro, India</p>
                                <p>Phone: (123) 456-7890</p>
                                <p>Email: contact@dalim.in</p>
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
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Works
                                </a>
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Fonts
                                </a>
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Graphics
                                </a>
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    Products
                                </a>
                                <a
                                    href="#"
                                    className="block text-white/40 transition-colors hover:text-white dark:text-black/60 dark:hover:text-black">
                                    About
                                </a>
                            </nav>
                        </div>
                        <div className="">
                            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                            <div className="space-y-2 text-white/40 dark:text-black/60">
                                <p>Bokaro, India</p>
                                <p>Phone: (123) 456-7890</p>
                                <p>Email: contact@dalim.in</p>
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
