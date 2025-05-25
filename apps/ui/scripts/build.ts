import { mergeRegistries } from "./merge"
import { validateAllRegistries } from "./validate" 

async function build(): Promise<void> {
  console.log("🚀 Building Dalim UI Registry...\n")

  try {
    // Step 1: Validate source files
    console.log("Step 1: Validating source files")
    await validateAllRegistries()

    // Step 2: Merge registries
    console.log("\nStep 2: Merging registry files")
    await mergeRegistries()

    // Step 3: Validate merged registry
    console.log("\nStep 3: Validating merged registry")
    await validateAllRegistries()
    console.log("\n🎉 Build completed successfully!")
    console.log("\n📋 Next steps:")
    console.log("   • Deploy registry/registry.json to your server")
    console.log("   • Update your documentation")
    console.log("   • Test component installation")
  } catch (error) {
    console.error("\n💥 Build failed:", error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  build()
}

export { build }
