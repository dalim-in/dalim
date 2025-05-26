// components/category/category-navbar.tsx
"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs } from "@dalim/core/ui/tabs"
import { ScrollableTabs } from "./scroll-tab"

export default function CategoryNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  // Extract current category from path or default to "all"
  const current = pathname === "/blocks" ? "all" : decodeURIComponent(pathname.split("/").pop() || "all")

  const handleChange = (value: string) => {
    if (value === "all") {
      router.push("/blocks")
    } else {
      router.push(`/blocks/category/${value}`)
    }
  }

  return (
    <div className="mt-6 mx-auto max-w-max relative">
      <Tabs
        defaultValue="all"
        value={current}
        onValueChange={handleChange}
        className="items-center  justify-center px-6 w-auto text-center"
      >
        <ScrollableTabs />
      </Tabs>
    </div>
  )
}
