'use client'

import Link from 'next/link'
import { Button } from '../../../ui/button'
import { Input } from '../../../ui/input'
import { Send } from 'lucide-react'
import { ThemeSwitch } from './theme-switch'

function FooterAgency() {
    return (
        <div className="">
            <footer className="relative before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="px-3 pt-10">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                        <div className="relative">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
                            <p className="text-muted-foreground mb-6">Join our newsletter for the latest updates and exclusive offers.</p>
                            <form className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pr-12 backdrop-blur-sm"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="bg-primary text-primary-foreground absolute right-0.5 top-0.5 h-8 w-8 rounded-md transition-transform hover:scale-105">
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
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Works
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Fonts
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Graphics
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Products
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    About
                                </a>
                            </nav>
                        </div>
                        <div className=''>
                            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                            <div className="space-y-2 text-primary/60">
                                <p>Bokaro, India</p>
                                <p>Phone: (123) 456-7890</p>
                                <p>Email: contact@dalim.in</p>
                            </div>
                        </div>
                        <div className="relative">
                            <h3 className="mb-4 text-lg  font-semibold">Follow Us</h3>
                            <div className="mb-6 flex gap-6">
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
                                    LinkedIn
                                </Link>
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
                                    Twitter X
                                </Link>
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
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
                                className="hover:text-primary text-primary/60 transition-colors">
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary text-primary/60 transition-colors">
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
        <div className="">
            <footer className="relative before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="px-3 pt-10">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                        <div className="relative">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
                            <p className="text-muted-foreground mb-6">Join our newsletter for the latest updates and exclusive offers.</p>
                            <form className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pr-12 backdrop-blur-sm"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="bg-primary text-primary-foreground absolute right-0.5 top-0.5 h-8 w-8 rounded-md transition-transform hover:scale-105">
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
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Works
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Fonts
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Graphics
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Products
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    About
                                </a>
                            </nav>
                        </div>
                        <div className=''>
                            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                            <div className="space-y-2 text-primary/60">
                                <p>Bokaro, India</p>
                                <p>Phone: (123) 456-7890</p>
                                <p>Email: contact@dalim.in</p>
                            </div>
                        </div>
                        <div className="relative">
                            <h3 className="mb-4 text-lg  font-semibold">Follow Us</h3>
                            <div className="mb-6 flex gap-6">
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
                                    LinkedIn
                                </Link>
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
                                    Twitter X
                                </Link>
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
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
                                className="hover:text-primary text-primary/60 transition-colors">
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary text-primary/60 transition-colors">
                                Terms of Service
                            </a>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}


function Footer() {
    return (
        <div className="">
            <footer className="relative before:absolute before:-inset-x-full before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="px-3 pt-10">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                        <div className="relative">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
                            <p className="text-muted-foreground mb-6">Join our newsletter for the latest updates and exclusive offers.</p>
                            <form className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pr-12 backdrop-blur-sm"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="bg-primary text-primary-foreground absolute right-0.5 top-0.5 h-8 w-8 rounded-md transition-transform hover:scale-105">
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
                                    className="hover:text-primary text-primary/60 block transition-colors">
                              About
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Agency
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    UI
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Products
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-primary text-primary/60 block transition-colors">
                                    Contact
                                </a>
                            </nav>
                        </div>
                        <div className=''>
                            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                            <div className="space-y-2 text-primary/60">
                                <p>Bokaro, India</p>
                                <p>Phone: (123) 456-7890</p>
                                <p>Email: contact@dalim.in</p>
                            </div>
                        </div>
                        <div className="relative">
                            <h3 className="mb-4 text-lg  font-semibold">Follow Us</h3>
                            <div className="mb-6 flex gap-6">
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
                                    LinkedIn
                                </Link>
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
                                    Twitter X
                                </Link>
                                <Link
                                    href={'/'}
                                    className="hover:text-primary text-primary/60">
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
                                className="hover:text-primary text-primary/60 transition-colors">
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary text-primary/60 transition-colors">
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
