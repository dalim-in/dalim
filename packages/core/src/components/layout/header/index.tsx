import Image from 'next/image'
import Link from 'next/link'
import LogoDark from '../../../../public/brand/dalim-black.svg'
import Logo from '../../../..//public/brand/dalim.svg'
import UILogoDark from '../../../../public/brand/dalim-ui-black.svg'
import UILogo from '../../../../public/brand/dalim-ui.svg'
import AgencyLogoDark from '../../../../public/brand/dalim-agency-black.svg'
import AgencyLogo from '../../../../public/brand/dalim-agency.svg'
import WorksLogoDark from '../../../../public/brand/dalim-works-black.svg'
import WorksLogo from '../../../..//public/brand/dalim-works.svg'
import PhoneLogoDark from '../../../../public/brand/logo-icon-black.svg'
import PhoneLogo from '../../../../public/brand/logo-icon.svg'
import ThemeToggle from '../../../ui/theme-toggle'

import { Menu, MenuAgency, MenuUI } from './navmenu'
import { LinkSelect } from './link-select'
import { MobileWWW } from './mobile-menu'
import { LoginButton, MobileLoginButton } from './auth-buttons'
import { ClientOnly } from './client-only'
import { DALIM_URL } from '@dalim/auth'

export function Header() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl border bg-neutral-100/60 pl-6 pr-3 backdrop-blur-md backdrop-filter dark:bg-neutral-900/60">
                            {/* LOGO SECTION */}
                            <div className="w-40">
                                <Link
                                    className="hidden shrink-0 md:block"
                                    href={DALIM_URL}
                                    aria-label="Home">
                                    <span className="sr-only">Dalim</span>
                                    <Image
                                        src={LogoDark}
                                        alt="Dalim logo"
                                        height={24} // fixed height
                                        width={0} // width auto-adjusts with "w-auto"
                                        className="h-6 w-auto object-contain dark:hidden"
                                        priority
                                    />
                                    <Image
                                        src={Logo}
                                        alt="Dalim logo"
                                        height={24}
                                        width={0}
                                        className="hidden h-6 w-auto object-contain dark:block"
                                        priority
                                    />
                                </Link>
                                <Link
                                    className="block shrink-0 md:hidden"
                                    href={DALIM_URL}
                                    aria-label="Home">
                                    <span className="sr-only">Dalim</span>
                                    <Image
                                        src={PhoneLogoDark}
                                        alt="Dalim logo"
                                        width={24}
                                        height={24}
                                        className="dark:hidden"
                                        priority
                                    />
                                    <Image
                                        src={PhoneLogo}
                                        alt="Dalim logo"
                                        width={24}
                                        height={30}
                                        className="hidden dark:block"
                                        priority
                                    />
                                </Link>
                            </div>

                            {/* OTHER COMPONENTS */}
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
                            <div className="w-38">
                                <Link
                                    className="hidden shrink-0 md:block"
                                    href={DALIM_URL}
                                    aria-label="Home">
                                    <span className="sr-only">Dalim</span>
                                    <Image
                                        src={UILogoDark}
                                        alt="Dalim logo"
                                        height={24} // fixed height
                                        width={0} // width auto-adjusts with "w-auto"
                                        className="h-6 w-auto object-contain dark:hidden"
                                        priority
                                    />
                                    <Image
                                        src={UILogo}
                                        alt="Dalim logo"
                                        height={24}
                                        width={0}
                                        className="hidden h-6 w-auto object-contain dark:block"
                                        priority
                                    />
                                </Link>
                                <Link
                                    className="block shrink-0 md:hidden"
                                    href={`${DALIM_URL}`}
                                    aria-label="Home">
                                    <span className="sr-only">Dalim</span>
                                    <Image
                                        src={PhoneLogoDark}
                                        alt="Dalim logo"
                                        width={24}
                                        height={24}
                                        className="dark:hidden"
                                        priority={true}
                                    />
                                    <Image
                                        src={PhoneLogo}
                                        alt="Dalim logo"
                                        width={24}
                                        height={30}
                                        className="hidden dark:block"
                                        priority={true}
                                    />
                                </Link>
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
                            <div className="w-68">
                                <Link
                                    className="hidden shrink-0 md:block"
                                    href={DALIM_URL}
                                    aria-label="Home">
                                    <span className="sr-only">Dalim</span>
                                    <Image
                                        src={AgencyLogoDark}
                                        alt="Dalim logo"
                                        height={24} // fixed height
                                        width={0} // width auto-adjusts with "w-auto"
                                        className="h-6 w-auto object-contain dark:hidden"
                                        priority
                                    />
                                    <Image
                                        src={AgencyLogo}
                                        alt="Dalim logo"
                                        height={24}
                                        width={0}
                                        className="hidden h-6 w-auto object-contain dark:block"
                                        priority
                                    />
                                </Link>

                                <Link
                                    className="block shrink-0 md:hidden"
                                    href={`${DALIM_URL}`}
                                    aria-label="Home">
                                    <span className="sr-only">Dalim</span>
                                    <Image
                                        src={PhoneLogoDark}
                                        alt="Dalim logo"
                                        width={24}
                                        height={24}
                                        className="dark:hidden"
                                        priority={true}
                                    />
                                    <Image
                                        src={PhoneLogo}
                                        alt="Dalim logo"
                                        width={24}
                                        height={30}
                                        className="hidden dark:block"
                                        priority={true}
                                    />
                                </Link>
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
                            <div className="w-68">
                                <Link
                                    className="hidden shrink-0 md:block"
                                    href={DALIM_URL}
                                    aria-label="Home">
                                    <span className="sr-only">Dalim</span>
                                    <Image
                                        src={WorksLogoDark}
                                        alt="Dalim logo"
                                        height={24} // fixed height
                                        width={0} // width auto-adjusts with "w-auto"
                                        className="h-6 w-auto object-contain dark:hidden"
                                        priority
                                    />
                                    <Image
                                        src={WorksLogo}
                                        alt="Dalim logo"
                                        height={24}
                                        width={0}
                                        className="hidden h-6 w-auto object-contain dark:block"
                                        priority
                                    />
                                </Link>

                                <Link
                                    className="block shrink-0 md:hidden"
                                    href={`${DALIM_URL}`}
                                    aria-label="Home">
                                    <span className="sr-only">Dalim</span>
                                    <Image
                                        src={PhoneLogoDark}
                                        alt="Dalim logo"
                                        width={24}
                                        height={24}
                                        className="dark:hidden"
                                        priority={true}
                                    />
                                    <Image
                                        src={PhoneLogo}
                                        alt="Dalim logo"
                                        width={24}
                                        height={30}
                                        className="hidden dark:block"
                                        priority={true}
                                    />
                                </Link>
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
