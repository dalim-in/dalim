"use client"

import { 
  MoreHorizontal, 
  type LucideIcon,
} from "lucide-react"
 
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuButton,
  SidebarMenuItem, 
} from "@dalim/core/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton disabled className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More Coming Soon</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
