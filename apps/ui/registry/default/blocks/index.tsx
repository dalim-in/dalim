import { Block } from "@/scripts/types";
import * as React from "react";

// TODO: Remove these blocks and use the registry.json file instead
export const blocks: Record<string, Block> = {
   "dashboard-01": {
    name: "dashboard-01",
    title: "Dashboard 01",
    category: "dashboard",
    component: React.lazy(() => import("@/registry/default/blocks/dashboard/dashboard-01/page")),
    files: [
      {
        path: "page.tsx",
        target: "app/dashboard-01/page.tsx",
      },
      { 
        path: "app-sidebar.tsx",
        target: "app/dashboard-01/app-sidebar.tsx",
      },
      {
        path: "chart-area-interactive.tsx",
        target: "app/dashboard-01/chart-area-interactive.tsx",
      },
      {
        path: "data-table.tsx",
        target: "app/dashboard-01/data-table.tsx",
      },
      {
        path: "nav-documents.tsx",
        target: "app/dashboard-01/nav-documents.tsx",
      },
      {
        path: "nav-main.tsx",
        target: "app/dashboard-01/nav-main.tsx",
      },
      {
        path: "nav-secondary.tsx",
        target: "app/dashboard-01/nav-secondary.tsx",
      },
      {
        path: "nav-user.tsx",
        target: "app/dashboard-01/nav-user.tsx",
      },
       {
        path: "section-cards.tsx",
        target: "app/dashboard-01/section-cards.tsx",
      },
       {
        path: "site-header.tsx",
        target: "app/dashboard-01/site-header.tsx",
      },
       {
        path: "data.json",
        target: "app/dashboard-01/data.json",
      },
    ], 
  },
  "dashboard-02": {
    name: "dashboard-02",
    title: "Dashboard 02",
    category: "dashboard",
    component: React.lazy(() => import("@/registry/default/blocks/dashboard/dashboard-02/page")),
    files: [
      {
        path: "page.tsx",
        target: "app/dashboard-02/page.tsx",
      },
      { 
        path: "app-sidebar.tsx",
        target: "app/dashboard-02/app-sidebar.tsx",
      }, 
    ], 
  },
  "navbar-01": {
    name: "navbar-01",
    title: "Navbar 01",
    category: "navbar",
    component: React.lazy(() => import("@/registry/default/blocks/navbar/navbar-01/page")),
    files: [
      {
        path: "page.tsx",
        target: "app/navbar-01/page.tsx",
      },
      { 
        path: "logo.tsx",
        target: "app/navbar-01/logo.tsx",
      },
      {
        path: "nav-menu.tsx",
        target: "app/navbar-01/nav-menu.tsx",
      },
      {
        path: "navigation-sheet.tsx",
        target: "app/navbar-01/navigation-sheet.tsx",
      },
    ], 
  },
  "login-01": {
    name: "login-01",
    title: "Login 01",
    category: "login",
    component: React.lazy(() => import("@/registry/default/blocks/login/login-01/page")),
    files: [
      {
        path: "page.tsx",
        target: "app/login-01/page.tsx",
      }
    ], 
  },
  "login-02": {
    name: "login-02",
    title: "Login 02",
    category: "login",
    component: React.lazy(() => import("@/registry/default/blocks/login/login-02/page")),
    files: [
      {
        path: "page.tsx",
        target: "app/login-02/page.tsx",
      },
      { 
        path: "login-form.tsx",
        target: "app/login-02/login-form.tsx",
      }, 
    ], 
  },
};

export const blockList = Object.values(blocks);

const getBlocksData = () => {
  const categories = [];
  const categorizedBlocks: Record<string, Block[]> = {};

  // Group blocks by category
  blockList.forEach((block) => {
    // Categorize blocks
    if (!categorizedBlocks[block.category as string]) {
      categorizedBlocks[block.category as string] = [];
    }
    categorizedBlocks[block.category as string].push(block);
  });

  // Generate categories
  for (const category in categorizedBlocks) {
    const blocks = categorizedBlocks[category];
    categories.push({ name: category, totalBlocks: blocks.length });
  }

  return { categories: categories, categorizedBlocks };
};

export const { categories: blockCategories, categorizedBlocks } =
  getBlocksData();