import fs from "fs"

import type { Registry } from "./types"
import {
  REGISTRY_DIR,
  REGISTRY_OUTPUT_PATH,
  REGISTRY_PART1_PATH,
  REGISTRY_PART2_PATH,
  REGISTRY_PART3_PATH,
} from "./types"

async function mergeRegistries(): Promise<void> {
  try {
    console.log("🔄 Merging registry files...")

    // Ensure registry directory exists
    if (!fs.existsSync(REGISTRY_DIR)) {
      fs.mkdirSync(REGISTRY_DIR, { recursive: true })
    }

    // Check if registry part files exist
    if (
      !fs.existsSync(REGISTRY_PART1_PATH) ||
      !fs.existsSync(REGISTRY_PART2_PATH) ||
      !fs.existsSync(REGISTRY_PART3_PATH)
    ) {
      throw new Error(`Registry part files not found in /`)
    }

    const part1 = JSON.parse(
      fs.readFileSync(REGISTRY_PART1_PATH, "utf8")
    ) as Registry
    const part2 = JSON.parse(
      fs.readFileSync(REGISTRY_PART2_PATH, "utf8")
    ) as Registry
    const part3 = JSON.parse(
      fs.readFileSync(REGISTRY_PART3_PATH, "utf8")
    ) as Registry

    // Merge the items
    const mergedRegistry: Registry = {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "Dalim",
      homepage: "https://ui.dalim.in",
      items: [...part1.items, ...part2.items, ...part3.items],
    }

    // Sort items alphabetically by name
    mergedRegistry.items.sort((a, b) => a.name.localeCompare(b.name))

    // Write the merged registry
    fs.writeFileSync(
      REGISTRY_OUTPUT_PATH,
      JSON.stringify(mergedRegistry, null, 2)
    )

    console.log(`✅ Successfully merged registry files:`)
    console.log(`   📦 Part 1: ${part1.items.length} components`)
    console.log(`   📦 Part 2: ${part2.items.length} components`)
    console.log(`   📦 Part 3: ${part3.items.length} components`)
    console.log(`   📄 Total: ${mergedRegistry.items.length} components`)
    console.log(`   💾 Output: ${REGISTRY_OUTPUT_PATH}`)
  } catch (error) {
    console.error("❌ Error merging registries:", error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  mergeRegistries()
}

export { mergeRegistries }
