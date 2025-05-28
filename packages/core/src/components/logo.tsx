import Image from 'next/image'
import Link from 'next/link'
import LogoDark from '../../public/brand/dalim-black.svg'
import Logo from '../../public/brand/dalim.svg'
import PhoneLogoDark from '../../public/brand/logo-icon-black.svg'
import PhoneLogo from '../../public/brand/logo-icon.svg'
import UILogoDark from '../../public/brand/dalim-ui-black.svg'
import UILogo from '../../public/brand/dalim-ui.svg'
import AgencyLogoDark from '../../public/brand/dalim-agency-black.svg'
import AgencyLogo from '../../public/brand/dalim-agency.svg'
import WorksLogoDark from '../../public/brand/dalim-works-black.svg'
import WorksLogo from '../..//public/brand/dalim-works.svg'
import { DALIM_URL } from '@dalim/auth'

export function DalimLogo() {
    return (
        <div className="">
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
    )
}

export function DalimLogoIcon() {
    return (
        <div className="">
            <Link
                className="shrink-0"
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
                    height={24}
                    className="hidden dark:block"
                    priority
                />
            </Link>
        </div>
    )
}

export function DalimLogoIcon2() {
    return (
        <div className="">
            <Link
                className="shrink-0"
                href={DALIM_URL}
                aria-label="Home">
                <span className="sr-only">Dalim</span>
                <Image
                    src={PhoneLogoDark}
                    alt="Dalim logo"
                    width={30}
                    height={30}
                    className="hidden dark:block"
                    priority
                />
                <Image
                    src={PhoneLogo}
                    alt="Dalim logo"
                    width={30}
                    height={30}
                    className="dark:hidden"
                    priority
                />
            </Link>
        </div>
    )
}

export function DalimWorksLogo() {
    return (
        <div className="">
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
    )
}

export function DalimUILogo() {
    return (
        <div className="">
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
    )
}

export function DalimAgencyLogo() {
    return (
        <div className="">
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
                    className="h-7.5 mt-1 w-auto object-contain dark:hidden"
                    priority
                />
                <Image
                    src={AgencyLogo}
                    alt="Dalim logo"
                    height={24}
                    width={0}
                    className="h-7.5 mt-1 hidden w-auto object-contain dark:block"
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
    )
}
