import { ComponentType } from "react"
import type { RegistryItem } from "shadcn/registry" 

interface ComponentLoaderProps {
  component: RegistryItem
}

// Define folders to search
const componentFolders = [
  "default/components",
  "default/components/ai",
  "default/components/button",
  "default/components/pagination"
]

export default async function ComponentLoader<TProps extends object>({
  component,
  ...props
}: ComponentLoaderProps & TProps) {
  if (!component?.name) {
    return null
  }

  const loadedComponents: ComponentType<TProps>[] = []

  for (const folder of componentFolders) {
    let found = false

    // Try multiple path formats
    const possiblePaths = [
      `../../registry/${folder}/${component.name}`,
      `../../registry/${folder}/${component.name}/index.tsx`
    ]

    for (const path of possiblePaths) {
      try {
        const ImportedComponent = (
          await import(path)
        ).default as ComponentType<TProps>

        loadedComponents.push(ImportedComponent)
        found = true
        break // stop trying other paths in this folder
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.code !== "MODULE_NOT_FOUND") {
          console.error(`Error loading "${component.name}" from ${path}:`, error)
        }
      }
    }

    if (!found) {
      console.warn(`Component "${component.name}" not found in ${folder}`)
    }
  }

  if (loadedComponents.length === 0) {
    return null
  }

  return (
    <>
      {loadedComponents.map((Component, index) => (
        <Component
          key={`${component.name}-${index}`}
          {...(props as TProps)}
          currentPage={1}
          totalPages={10}
        />
      ))}
    </>
  )
}
