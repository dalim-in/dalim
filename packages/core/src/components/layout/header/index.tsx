import ThemeToggle from '../../../ui/theme-toggle'

import { Menu, MenuAgency, MenuFonts, MenuGraphic, MenuIcons, MenuUI } from './navmenu'
import { LinkSelect } from './link-select'
import { MobileWWW, MobileGraphic, MobileFonts, MobileUI, MobileAgency, MobileWorks } from './mobile-menu'
import { LoginButton, MobileLoginButton } from './auth-buttons'
import { ClientOnly } from './client-only'
import { DalimLogo, DalimUILogo, DalimFontsLogo, DalimAgencyLogo, DalimWorksLogo, DalimGraphicLogo, DalimIconsLogo } from '../../logo'

export function Header() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div
                            style={{ backdropFilter: 'url("#container-glass11")' }}
                            className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl pl-6 pr-3 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
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
            <GlassFilter />
        </div>
    )
}

export function HeaderUI() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div
                            style={{ backdropFilter: 'url("#container-glass1")' }}
                            className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl pl-6 pr-3 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                            <div className="w-40">
                                <DalimUILogo />
                            </div>
                            <MenuUI />
                            <MobileUI>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileUI>
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
            <GlassFilter />
        </div>
    )
}

export function HeaderAgency() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div
                            style={{ backdropFilter: 'url("#container-glass1")' }}
                            className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl pl-6 pr-3 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                            <div className="w-60">
                                <DalimAgencyLogo />
                            </div>
                            <MenuAgency />
                            <MobileAgency>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileAgency>
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
            <GlassFilter />
        </div>
    )
}

export function HeaderWorks() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div
                            style={{ backdropFilter: 'url("#container-glass1")' }}
                            className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl pl-6 pr-3 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                            <div className="w-60">
                                <DalimWorksLogo />
                            </div>
                            <MobileWorks>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileWorks>
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
            <GlassFilter />
        </div>
    )
}

export function HeaderFonts() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div
                            style={{ backdropFilter: 'url("#container-glass1")' }}
                            className="flex h-[64px] w-full items-center  justify-between gap-3 rounded-3xl pl-6 pr-3 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                            <div className="w-60">
                                <DalimFontsLogo />
                            </div>
                            <MenuFonts />
                            <MobileFonts>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileFonts>
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
            <GlassFilter />
        </div>
    )
}

export function HeaderGraphic() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div
                            style={{ backdropFilter: 'url("#container-glass1")' }}
                            className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl pl-6 pr-3 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                            <div className="w-60">
                                <DalimGraphicLogo />
                            </div>
                            <MenuGraphic />
                            <MobileGraphic>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileGraphic>
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
            <GlassFilter />
        </div>
    )
}

export function HeaderIcons() {
    return (
        <div className="">
            <header className="relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                <div className="h-[82px] py-2">
                    <div className="container fixed inset-x-0 z-50 mx-auto px-3">
                        <div
                            style={{ backdropFilter: 'url("#container-glass1")' }}
                            className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl pl-6 pr-3 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                            <div className="w-60">
                                <DalimIconsLogo />
                            </div>
                            <MenuIcons />
                            <MobileGraphic>
                                <ClientOnly>
                                    <MobileLoginButton />
                                </ClientOnly>
                            </MobileGraphic>
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
            <GlassFilter />
        </div>
    )
}


function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass1"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.02"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />

          {/* Blur the turbulence pattern slightly */}
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />

          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="120"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />

          {/* Apply overall blur on the final result */}
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />

          {/* Output the result */}
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}