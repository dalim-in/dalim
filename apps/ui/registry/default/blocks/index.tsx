import { Block } from "@/scripts/types";
import * as React from "react";

// TODO: Remove these blocks and use the registry.json file instead
export const blocks: Record<string, Block> = {
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
    category: "navbar",
    component: React.lazy(() => import("@/registry/default/blocks/login/login-01/page")),
    files: [
      {
        path: "page.tsx",
        target: "app/login-01/page.tsx",
      }
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