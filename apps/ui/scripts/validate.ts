import fs from "fs"
import path from "path"
import Ajv from "ajv"

import type { Registry } from "./types"
import {
  REGISTRY_OUTPUT_PATH,
  REGISTRY_PART1_PATH,
  REGISTRY_PART2_PATH,
  REGISTRY_PART3_PATH,
  REGISTRY_PART4_PATH,
} from "./types"

const ajv = new Ajv()

// shadcn/ui registry schema (simplified)
const registrySchema = {
  type: "object",
  properties: {
    $schema: { type: "string" },
    name: { type: "string" },
    homepage: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          type: { type: "string" },
          dependencies: {
            type: "array",
            items: { type: "string" },
          },
          registryDependencies: {
            type: "array",
            items: { type: "string" },
          },
          files: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: { type: "string" },
                type: { type: "string" },
              },
              required: ["path", "type"],
            },
          },
          tailwind: { type: "object" },
          meta: { type: "object" },
        },
        required: ["name", "type", "files"],
      },
    },
  },
  required: ["$schema", "name", "homepage", "items"],
}

const validate = ajv.compile(registrySchema)

async function validateRegistry(filePath: string): Promise<boolean> {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`)
      return false
    }

    const content = fs.readFileSync(filePath, "utf8")
    const registry = JSON.parse(content) as Registry

    const isValid = validate(registry)

    if (!isValid) {
      console.error(`❌ Validation failed for ${filePath}:`)
      console.error(validate.errors)
      return false
    }

    // Additional validations
    const duplicateNames = findDuplicateNames(registry.items)
    if (duplicateNames.length > 0) {
      console.error(
        `❌ Duplicate component names found in ${filePath}: ${duplicateNames.join(", ")}`
      )
      return false
    }

    console.log(
      `✅ ${path.basename(filePath)} is valid (${registry.items.length} components)`
    )
    return true
  } catch (error) {
    console.error(`❌ Error validating ${filePath}:`, error)
    return false
  }
}

function findDuplicateNames(items: Registry["items"]): string[] {
  const names = items.map((item) => item.name)
  const duplicates = names.filter(
    (name, index) => names.indexOf(name) !== index
  )
  return [...new Set(duplicates)]
}

async function validateAllRegistries(): Promise<void> {
  console.log("🔍 Validating registry files...")

  const filesToValidate = [REGISTRY_PART1_PATH, REGISTRY_PART2_PATH, REGISTRY_PART3_PATH, REGISTRY_PART4_PATH]

  // Also validate merged registry if it exists
  if (fs.existsSync(REGISTRY_OUTPUT_PATH)) {
    filesToValidate.push(REGISTRY_OUTPUT_PATH)
  }

  let allValid = true

  for (const file of filesToValidate) {
    const isValid = await validateRegistry(file)
    if (!isValid) {
      allValid = false
    }
  }

  if (allValid) {
    console.log("🎉 All registry files are valid!")
  } else {
    console.error("💥 Some registry files have validation errors")
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateAllRegistries()
}

export { validateRegistry, validateAllRegistries }
