import type { JSX } from "react";

export interface RegistryItem {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: Array<{
    path: string
    type: string
  }>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tailwind?: any
  meta?: {
    tags?: string[]
    style?: number
    colSpan?: number
  }
}

export interface Registry {
  $schema: string
  name: string
  homepage: string
  items: RegistryItem[]
}

export interface ComponentStats {
  total: number
  ui: number
  hooks: number
  components: number
  lib: number
  byType: Record<string, number>
  dependencies: string[]
}

export const REGISTRY_DIR = "registry"
export const REGISTRY_PART1_PATH = `${REGISTRY_DIR}/registry-ui.json`
export const REGISTRY_PART2_PATH = `${REGISTRY_DIR}/registry-components.json`
export const REGISTRY_PART3_PATH = `${REGISTRY_DIR}/registry-hooks.json`
export const REGISTRY_PART4_PATH = `${REGISTRY_DIR}/registry-blocks.json`
export const REGISTRY_OUTPUT_PATH = `registry.json`

type TreeItem = {
  name: string;
  children?: TreeItem[];
} & (
  | { type: "file"; path: string; target: string }
  | { type: "folder"; children: TreeItem[] }
);

export type FileTree = TreeItem[];

export interface BlockFile {
  path: string;
  target?: string;
}

export interface Block {
  name: string;
  title: string;
  description?: string;
  category: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  files: BlockFile[];
}

export type BlockScreenSizeUnion = `${BlockScreenSize}`;

export enum BlockScreenSize {
  desktop = "desktop",
  tablet = "tablet",
  mobile = "mobile",
}