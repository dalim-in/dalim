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
      ],
    },
    {
      title: "Dalim Icons",
      items: [ 
        {
          title: "Introduction",
          label: "New",
          href: "/docs/icons/introduction", 
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
