import Image from 'next/image'
import Link from 'next/link'
import LogoDark from '@/public/brand/logo-black.svg'
import Logo from '@/public/brand/logo.svg'
import ThemeToggle from '../../../ui/theme-toggle'

import { Button } from '../../../ui/button'
import { Menu, MenuAgency, MenuUI } from './navmenu'
import LinkSelect from './link-select'
import { SignIn } from './sign-in'
import { MobileAgency } from './mobile-menu'

export function Header() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl border bg-neutral-100/60 pl-6 pr-3 backdrop-blur-md backdrop-filter dark:bg-neutral-900/60">
                            <div className="w-40">
                                <Link
                                    className="shrink-0"
                                    href="/"
                                    aria-label="Home">
                                    <span className="sr-only">Dalim UI</span>
                                    <Image
                                        src={LogoDark}
                                        alt="Dalim logo"
                                        width={100}
                                        height={24}
                                        className="dark:hidden"
                                        priority={true}
                                    />
                                    <Image
                                        src={Logo}
                                        alt="Dalim logo"
                                        width={100}
                                        height={30}
                                        className="hidden dark:block"
                                        priority={true}
                                    />
                                </Link>
                            </div>
                            <Menu />
                            <div className="flex items-center">
                                <div className="flex items-center gap-1">
                                    <ThemeToggle />
                                    <LinkSelect />
                                    <Button>Login</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export function HeaderUI() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl border bg-neutral-100/60 pl-6 pr-3 backdrop-blur-md backdrop-filter dark:bg-neutral-900/60">
                            <div className="lg:w-38">
                                <Link
                                    className="shrink-0"
                                    href="/"
                                    aria-label="Home">
                                    <span className="sr-only">Dalim UI</span>
                                    <Image
                                        src={LogoDark}
                                        alt="Dalim logo"
                                        width={100}
                                        height={24}
                                        className="dark:hidden"
                                        priority={true}
                                    />
                                    <Image
                                        src={Logo}
                                        alt="Dalim logo"
                                        width={100}
                                        height={30}
                                        className="hidden dark:block"
                                        priority={true}
                                    />
                                </Link>
                            </div>
                            <MenuUI />
                            <div className="flex items-center">
                                <div className="flex items-center gap-1">
                                    <ThemeToggle />
                                    <LinkSelect />
                                    <SignIn />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export function HeaderAgency() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl border bg-neutral-100/60 pl-6 pr-3 backdrop-blur-md backdrop-filter dark:bg-neutral-900/60">
                            <div className="w-68">
                                <Link
                                    className="shrink-0"
                                    href="/"
                                    aria-label="Home">
                                    <span className="sr-only">Dalim UI</span>
                                    <Image
                                        src={LogoDark}
                                        alt="Dalim logo"
                                        width={100}
                                        height={24}
                                        className="dark:hidden"
                                        priority={true}
                                    />
                                    <Image
                                        src={Logo}
                                        alt="Dalim logo"
                                        width={100}
                                        height={30}
                                        className="hidden dark:block"
                                        priority={true}
                                    />
                                </Link>
                            </div>
                            <MenuAgency />
                            <MobileAgency />
                            <div className="hidden items-center md:flex">
                                <div className="flex items-center gap-1">
                                    <ThemeToggle />
                                    <LinkSelect />
                                    <Link target='_blank' href={'https://cal.com/dalim/15min'}>
                                        <Button>Book a call</Button>
                                    </Link> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
