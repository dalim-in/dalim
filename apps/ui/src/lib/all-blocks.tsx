import { registryItemSchema } from "shadcn/registry"
import { z } from "zod"

export async function getAllBlockIds(
  types: z.infer<typeof registryItemSchema>["type"][] = ["registry:block"],
  categories: string[] = [],
  style: "default" = "default",
): Promise<string[]> {
  "use server"

  try {
    // Import your blocks registry
    const { blocks } = await import("@/registry/default/blocks")
    
    if (!blocks || typeof blocks !== 'object') {
      console.warn('Blocks registry not found or invalid')
      return []
    }

    const index = z.record(registryItemSchema).parse(blocks[style] || blocks)

    return Object.values(index)
      .filter(
        (block) =>
          types.includes(block.type) &&
          (categories.length === 0 || block.categories?.some((category) => categories.includes(category))) &&
          !block.name.startsWith("chart-"),
      )
      .map((block) => block.name)
  } catch (error) {
    console.error('Failed to get all block IDs:', error)
    return []
  }
}

export async function getRegistryItem(name: string) {
  "use server"

  try {
    // Import the blocks from the correct location
    const blocksModule = await import("@/scripts/types")
    const { blocks } = blocksModule
    
    if (!blocks || typeof blocks !== 'object') {
      console.warn('Blocks registry not found')
      return null
    }

    // Access the block directly from the blocks object
    const block = blocks[name]

    if (!block) {
      console.warn(`Block not found: ${name}. Available blocks: ${Object.keys(blocks).join(', ')}`)
      return null
    }

    return block
  } catch (error) {
    console.error(`Failed to get registry item: ${name}`, error)
    return null
  }
}

export interface FileTreeItem {
  name: string
  path?: string
  children?: FileTreeItem[]
}

export function createFileTreeForRegistryItemFiles(files: Array<{ path: string; target?: string }>): FileTreeItem[] {
  const tree: FileTreeItem[] = []

  if (!files || !Array.isArray(files)) {
    return tree
  }

  files.forEach((file) => {
    if (!file.path) return
    
    const parts = file.path.split("/")
    let current = tree

    parts.forEach((part, index) => {
      const existing = current.find((item) => item.name === part)

      if (existing) {
        current = existing.children = existing.children || []
      } else {
        const isFile = index === parts.length - 1
        const newItem: FileTreeItem = {
          name: part,
          path: isFile ? file.target || file.path : undefined,
          children: isFile ? undefined : [],
        }
        current.push(newItem)
        if (!isFile) {
          current = newItem.children!
        }
      }
    })
  })

  return tree
}
