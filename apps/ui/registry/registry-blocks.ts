import { type Registry } from "shadcn/registry"

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
        target: "app/dashboard/page.tsx",
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
        target: "app/login/page.tsx",
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
        target: "app/call-to-action/page.tsx",
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
    name: "hero-01",
    description: "A simple hero section",
    type: "registry:block",
    registryDependencies: ["button", "render-canvas"],
    files: [
      {
        path: "blocks/hero/hero-01/page.tsx",
        target: "app/hero/page.tsx",
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
        target: "app/hero/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/hero/hero-02/components/gallery.tsx",
        type: "registry:component",
      },
    ],
    categories: ["banner", "hero"],
  },
]
