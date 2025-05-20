import { MainNavItem, SidebarNavItem } from "@/src/types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  chartsNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Docs",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },

        {
          title: "Typography",
          href: "/docs/typography",
          items: [],
        },
      ],
    },
      
    {
      title: "Components",
      items: [
        {
          title: "Accordion",
          href: "/docs/components/accordion",
          items: [],
        },
        {
          title: "Alert",
          href: "/docs/components/alert",
          items: [],
        },

        {
          title: "Avatar",
          href: "/docs/components/avatar",
          items: [],
        },
        {
          title: "Badge",
          href: "/docs/components/badge",
          items: [],
        },
        {
          title: "Banner",
          href: "/docs/components/banner",
          items: [],
        },
        {
          title: "Book",
          label: "New",
          href: "/docs/components/book",
          items: [],
        },
        
      ],
    },
    {
      title: "Legal",
      label: "",
      items: [
        {
          title: "Terms",
          href: "/docs/legal/terms",
          items: [],
        },
        {
          title: "Privacy",
          href: "/docs/legal/privacy",
          items: [],
        },
        {
          title: "Contact",
          href: "/docs/legal/contact",
          items: [],
        },
      ],
    },
     
  ],
  chartsNav: [
    {
      title: "Getting Started",
      items: [],
    },
  ],
};


export const iconsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "All Icons",
      items: [
        {
          title: "AI",
          label: "New", 
          href: "/products/dicons/Ai",
          items: [],
        }, 
         
      ],
    },
     
      
  ],
  chartsNav: [
    {
      title: "Getting Started",
      items: [],
    },
  ],
};
