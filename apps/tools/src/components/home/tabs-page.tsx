"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@dalim/core/ui/tabs" 

const tabs = [
  { value: "gradient", label: "Gradient", href: "/gradient" },
  { value: "linedraw", label: "LineDraw",   href: "/linedraw" },
  { value: "background", label: "Background",   href: "/background" }, 
]

export function TabNavigation() {
  const pathname = usePathname()
  
  // Determine active tab based on current pathname
  const activeTab = tabs.find(tab => pathname === tab.href)?.value || "gradient"

  return (
    <Tabs value={activeTab} className="-mt-12 -mb-1 flex justify-center">
      <TabsList className=" ">
        {tabs.map((tab) => { 
          return (
            <Link key={tab.value} href={tab.href}>
              <TabsTrigger 
                value={tab.value} 
                className="flex items-center gap-2 "
                asChild
              >
                <div> 
                  {tab.label}
                </div>
              </TabsTrigger>
            </Link>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
