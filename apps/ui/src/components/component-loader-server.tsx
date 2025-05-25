import { ComponentType } from "react"
import type { RegistryItem } from "shadcn/registry"
import { categories } from "@/src/config/components"

interface ComponentLoaderProps {
  component: RegistryItem
}

export default async function ComponentLoader<TProps extends object>({
  component,
  ...props
}: ComponentLoaderProps & TProps) {
  if (!component?.name) {
    return null
  }

  // Find which folder the component belongs to
  const category = categories.find(cat =>
    cat.components.some(c => c.name === component.name)
  )

  if (!category) {
    console.error(`No category found for component ${component.name}`)
    return null
  }

  try {
    const Component = (
      await import(`@/registry/default/components/${category.slug}/${component.name}`)
    ).default as ComponentType<TProps>

    return <Component {...(props as TProps)} currentPage={1} totalPages={10} />
  } catch (error) {
    console.error(`Failed to load component ${component.name} from ${category.slug}:`, error)
    return null
  }
}
