import Image from "next/image"
import Link from "next/link"
import LogoDark from "@/public/brand/logo-icon-black.svg"
import Logo from "@/public/brand/logo-icon.svg"
import ThemeToggle from "@/src/components/theme-toggle"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"

import { MenuUI, Menu } from "./navmenu"


export function Header() {
  return (
    <div className="">
      <header className="before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px">
        <div className="h-[82px] py-2">
          <div className="fixed inset-x-0 z-50 container mx-auto px-3">
            <div className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl border bg-neutral-100/60 px-6 backdrop-blur-md backdrop-filter dark:bg-neutral-900/60">
              <Link className="shrink-0" href="/" aria-label="Home">
                <span className="sr-only">Dalim UI</span>
                <Image
                  src={LogoDark}
                  alt="Dalim logo"
                  width={30}
                  height={24}
                  className="dark:hidden"
                  priority={true}
                />
                <Image
                  src={Logo}
                  alt="Dalim logo"
                  width={30}
                  height={30}
                  className="hidden dark:block"
                  priority={true}
                />
              </Link>
              <Menu />
              <div className="flex items-center">
                <div className="flex items-center gap-1">
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Dalim" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dalim">Dalim</SelectItem>
                      <SelectItem value="ui">UI</SelectItem>
                      <SelectItem value="ali">Ali</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                      <SelectItem value="works">Works</SelectItem>
                      <SelectItem value="fonts">Fonts</SelectItem>
                    </SelectContent>
                  </Select>
                  <ThemeToggle />
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
      <header className="before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] relative mb-14 before:absolute before:-inset-x-full before:bottom-0 before:h-px">
        <div className="h-[82px] py-2">
          <div className="fixed inset-x-0 z-50 container mx-auto px-3">
            <div className="flex h-[64px] w-full items-center justify-between gap-3 rounded-3xl border bg-neutral-100/60 px-6 backdrop-blur-md backdrop-filter dark:bg-neutral-900/60">
              <Link className="shrink-0" href="/" aria-label="Home">
                <span className="sr-only">Dalim UI</span>
                <Image
                  src={LogoDark}
                  alt="Dalim logo"
                  width={30}
                  height={24}
                  className="dark:hidden"
                  priority={true}
                />
                <Image
                  src={Logo}
                  alt="Dalim logo"
                  width={30}
                  height={30}
                  className="hidden dark:block"
                  priority={true}
                />
              </Link>
              <MenuUI />
              <div className="flex items-center">
                <div className="flex items-center gap-1">
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Dalim" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dalim">Dalim</SelectItem>
                      <SelectItem value="ui">UI</SelectItem>
                      <SelectItem value="ali">Ali</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                      <SelectItem value="works">Works</SelectItem>
                      <SelectItem value="fonts">Fonts</SelectItem>
                    </SelectContent>
                  </Select>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

