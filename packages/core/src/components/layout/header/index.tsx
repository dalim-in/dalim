import ThemeToggle from '../../../ui/theme-toggle'

import { Menu, MenuAgency, MenuUI } from './navmenu'
import { LinkSelect } from './link-select'
import { MobileWWW } from './mobile-menu'
import { LoginButton, MobileLoginButton } from './auth-buttons'
import { ClientOnly } from './client-only'
import { DalimLogo, DalimUILogo, DalimAgencyLogo, DalimWorksLogo } from '../../logo'

export function Header() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl border bg-neutral-100/60 pl-6 pr-3 backdrop-blur-md backdrop-filter dark:bg-neutral-900/60">
                            <div className="w-40">
                                <DalimLogo />
                            </div>
                            <Menu />
                            <MobileWWW>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileWWW>
                            <div className="hidden items-center md:flex">
                                <div className="flex items-center gap-1">
                                    <ThemeToggle />
                                    <LinkSelect />
                                    <ClientOnly>
                                        <LoginButton />
                                    </ClientOnly>
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
                           <div className="w-40">
                            <DalimUILogo />
                            </div>
                            <MenuUI />
                            <MobileWWW>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileWWW>
                            <div className="hidden items-center md:flex">
                                <div className="flex items-center gap-1">
                                    <ThemeToggle />
                                    <LinkSelect />
                                    <ClientOnly>
                                        <LoginButton />
                                    </ClientOnly>
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
                            <div className="w-60">
                                <DalimAgencyLogo />
                            </div>
                            <MenuAgency />
                            <MobileWWW>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileWWW>
                            <div className="hidden items-center md:flex">
                                <div className="flex items-center gap-1">
                                    <ThemeToggle />
                                    <LinkSelect />
                                    <ClientOnly>
                                        <LoginButton />
                                    </ClientOnly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export function HeaderWorks() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl border bg-neutral-100/60 pl-6 pr-3 backdrop-blur-md backdrop-filter dark:bg-neutral-900/60">
                            <div className="w-60">
                            <DalimWorksLogo />
                            </div>
                            <MobileWWW>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileWWW>
                            <div className="hidden items-center md:flex">
                                <div className="flex items-center gap-1">
                                    <ThemeToggle />
                                    <LinkSelect />
                                    <ClientOnly>
                                        <LoginButton />
                                    </ClientOnly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
