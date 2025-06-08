import { IconMetadata } from "./types";
import { accessMetadata, cheveronrightMetadata, heartMetadata } from "./icons";

export const iconDatabase: Record<string, IconMetadata> = {
  "Access": accessMetadata,
  "Heart": heartMetadata,
  "ChevronRight": cheveronrightMetadata,
  "Lock": {
    name: "Lock",
    category: "Security",
    tags: ["security", "password", "protection", "private", "lock", "padlock"],
    description: "A lock icon representing security and protection",
    author: "Ali Imam",
    created: "2023-05-10",
    variants: ["stroke", "solid", "duotone"]
  },
  "Shield": {
    name: "Shield",
    category: "Security",
    tags: ["security", "protection", "defense", "guard", "shield"],
    description: "A shield icon representing protection and security",
    author: "Ali Imam",
    created: "2023-05-12",
    variants: ["stroke", "solid", "duotone", "twotone"]
  }
};

// Get all icons
export function getAllIcons(): IconMetadata[] {
  return Object.values(iconDatabase);
}

// Get icon by name
export function getIconByName(name: string): IconMetadata | undefined {
  return iconDatabase[name];
}

// Get icons by category
export function getIconsByCategory(category: string): IconMetadata[] {
  return Object.values(iconDatabase).filter(icon => icon.category === category);
}

// Get icons by tag
export function getIconsByTag(tag: string): IconMetadata[] {
  return Object.values(iconDatabase).filter(icon => 
    icon.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

// Get all categories
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  Object.values(iconDatabase).forEach(icon => {
    categories.add(icon.category);
  });
  return Array.from(categories);
}

// Get all tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  Object.values(iconDatabase).forEach(icon => {
    icon.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

// Search icons
export function searchIcons(query: string): IconMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(iconDatabase).filter(icon => 
    icon.name.toLowerCase().includes(lowercaseQuery) ||
    icon.category.toLowerCase().includes(lowercaseQuery) ||
    icon.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    (icon.description && icon.description.toLowerCase().includes(lowercaseQuery))
  );
}
