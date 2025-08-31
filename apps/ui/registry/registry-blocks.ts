import { type Registry } from "shadcn/schema"

export const blocks: Registry["items"] = [
  {
    name: "dashboard-01",
    type: "registry:block",
    description: "A dashboard with sidebar, charts and data table.",
    dependencies: [
      "@dnd-kit/core",
      "@dnd-kit/modifiers",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "@tanstack/react-table",
      "zod",
    ],
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "chart",
      "card",
      "select",
      "tabs",
      "table",
      "toggle-group",
      "badge",
      "button",
      "checkbox",
      "dropdown-menu",
      "drawer",
      "input",
      "avatar",
      "sheet",
      "sonner",
    ],
    files: [
      {
        path: "blocks/dashboard-01/page.tsx",
        type: "registry:page",
        target: "app/dashboard-01/page.tsx",
      },
      {
        path: "blocks/dashboard-01/components/app-header.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/data.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/home-content.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/types.ts",
        type: "registry:component",
      },
    ],
    categories: ["dashboard"],
    meta: {
      iframeHeight: "1000px",
    },
  },
  {
    name: "login-01",
    description: "A simple login form.",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "blocks/login-01/page.tsx",
        target: "app/login-01/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-01/components/login-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["authentication", "login"],
  },
  {
    name: "call-to-action-01",
    description: "A simple call to action form.",
    type: "registry:block",
    registryDependencies: ["button", "particle-highlight"],
    files: [
      {
        path: "blocks/call-to-action/call-to-action-01/page.tsx",
        target: "app/call-to-action-01/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/call-to-action/call-to-action-01/components/connect.tsx",
        type: "registry:component",
      },
    ],
    categories: ["connect", "call-to-action"],
    meta: {
      iframeHeight: "600px",
      mobile: "component",
    },
  },
  {
    name: "call-to-action-02",
    description: "A simple call to action form.",
    type: "registry:block",
    registryDependencies: ["button", "shine-border"],
    files: [
      {
        path: "blocks/call-to-action/call-to-action-02/page.tsx",
        target: "app/call-to-action-02/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/call-to-action/call-to-action-02/components/timeline.tsx",
        type: "registry:component",
      },
    ],
    categories: ["connect", "call-to-action"],
  },
  {
    name: "hero-01",
    description: "A simple hero section",
    type: "registry:block",
    registryDependencies: ["button", "render-canvas"],
    files: [
      {
        path: "blocks/hero/hero-01/page.tsx",
        target: "app/hero-01/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/hero/hero-01/components/hero.tsx",
        type: "registry:component",
      },
    ],
    categories: ["banner", "hero"],
  },
  {
    name: "hero-02",
    description: "A simple hero photo gallery section",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/hero/hero-02/page.tsx",
        target: "app/hero-02/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/hero/hero-02/components/gallery.tsx",
        type: "registry:component",
      },
    ],
    categories: ["banner", "hero"],
  },
  {
    name: "hero-03",
    description: "A simple hero section",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/hero/hero-03/page.tsx",
        target: "app/hero-03/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/hero/hero-03/components/hero.tsx",
        type: "registry:component",
      },
    ],
    categories: ["banner", "hero"],
  },
  {
    name: "hero-04",
    description: "A simple hero section",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/hero/hero-04/page.tsx",
        target: "app/hero-04/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/hero/hero-04/components/hero.tsx",
        type: "registry:component",
      },
    ],
    categories: ["banner", "hero"],
  },
  {
    name: "hero-05",
    description: "A simple hero section",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/hero/hero-05/page.tsx",
        target: "app/hero-05/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/hero/hero-05/components/hero.tsx",
        type: "registry:component",
      },
    ],
    categories: ["banner", "hero"],
  },
  {
    name: "hero-06",
    description: "A simple hero section",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/hero/hero-06/page.tsx",
        target: "app/hero-06/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/hero/hero-06/components/hero.tsx",
        type: "registry:component",
      },
    ],
    categories: ["banner", "hero"],
  },
  {
    name: "logos-01",
    description: "A simple client logo section",
    type: "registry:block",
    registryDependencies: ["marquee"],
    files: [
      {
        path: "blocks/client-logos/logos-01/page.tsx",
        target: "app/logos-01/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/client-logos/logos-01/components/logos.tsx",
        type: "registry:component",
      },
    ],
    categories: ["client", "logos"],
    meta: {
      iframeHeight: "600px",
      mobile: "component",
    },
  },
  {
    name: "logos-02",
    description: "A simple client logo section",
    type: "registry:block",
    registryDependencies: ["marquee"],
    files: [
      {
        path: "blocks/client-logos/logos-02/page.tsx",
        target: "app/logos-02/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/client-logos/logos-02/components/logos.tsx",
        type: "registry:component",
      },
    ],
    categories: ["client", "logos"],
    meta: {
      iframeHeight: "600px",
      mobile: "component",
    },
  },
  {
    name: "logos-03",
    description: "A simple client logo section",
    type: "registry:block",
    registryDependencies: ["marquee"],
    files: [
      {
        path: "blocks/client-logos/logos-03/page.tsx",
        target: "app/logos-03/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/client-logos/logos-03/components/logos.tsx",
        type: "registry:component",
      },
    ],
    categories: ["client", "logos"],
    meta: {
      iframeHeight: "800px",
      mobile: "component",
    },
  },
  {
    name: "logos-04",
    description: "A simple client logo section",
    type: "registry:block",
    registryDependencies: ["marquee"],
    files: [
      {
        path: "blocks/client-logos/logos-04/page.tsx",
        target: "app/logos-04/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/client-logos/logos-04/components/logos.tsx",
        type: "registry:component",
      },
    ],
    categories: ["client", "logos"],
    meta: {
      iframeHeight: "800px",
      mobile: "component",
    },
  },
  {
    name: "stats-01",
    description: "A simple stats section",
    type: "registry:block",
    registryDependencies: ["counter-number"],
    files: [
      {
        path: "blocks/stats/stats-01/page.tsx",
        target: "app/stats-01/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/stats/stats-01/components/stats.tsx",
        type: "registry:component",
      },
    ],
    categories: ["data", "stats"],
    meta: {
      iframeHeight: "600px",
      mobile: "component",
    },
  },
  {
    name: "stats-02",
    description: "A simple stats section",
    type: "registry:block",
    registryDependencies: ["counter-number"],
    files: [
      {
        path: "blocks/stats/stats-02/page.tsx",
        target: "app/stats-02/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/stats/stats-02/components/stats.tsx",
        type: "registry:component",
      },
    ],
    categories: ["data", "stats"],
    meta: {
      iframeHeight: "600px",
      mobile: "component",
    },
  },
  {
    name: "stats-02",
    description: "A simple stats section",
    type: "registry:block",
    registryDependencies: ["counter-number"],
    files: [
      {
        path: "blocks/stats/stats-02/page.tsx",
        target: "app/stats-02/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/stats/stats-02/components/stats.tsx",
        type: "registry:component",
      },
    ],
    categories: ["data", "stats"],
    meta: {
      iframeHeight: "600px",
      mobile: "component",
    },
  },
  {
    name: "stats-03",
    description: "A simple stats section",
    type: "registry:block",
    registryDependencies: ["counter-number"],
    files: [
      {
        path: "blocks/stats/stats-03/page.tsx",
        target: "app/stats-03/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/stats/stats-03/components/stats.tsx",
        type: "registry:component",
      },
    ],
    categories: ["data", "stats"],
    meta: {
      iframeHeight: "600px",
      mobile: "component",
    },
  },
  {
    name: "pricing-01",
    description: "A simple pricing section",
    type: "registry:block",
    registryDependencies: [""],
    files: [
      {
        path: "blocks/pricing/pricing-01/page.tsx",
        target: "app/pricing-01/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/pricing/pricing-01/components/price.tsx",
        type: "registry:component",
      },
    ],
    categories: ["subscription", "pricing"],
  },
  {
    name: "pricing-02",
    description: "A simple pricing section",
    type: "registry:block",
    registryDependencies: [""],
    files: [
      {
        path: "blocks/pricing/pricing-02/page.tsx",
        target: "app/pricing-02/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/pricing/pricing-02/components/price.tsx",
        type: "registry:component",
      },
    ],
    categories: ["subscription", "pricing"],
  },
]
