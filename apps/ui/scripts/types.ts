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
export const REGISTRY_OUTPUT_PATH = `registry.json`
