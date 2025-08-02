import { FlagMetadata } from "./types";
import { 
  IndiaMetadata
} from "./flags";  

export const flagDatabase: Record<string, FlagMetadata> = { 
"India": IndiaMetadata,

};

// Get all icons
export function getAllFlags(): FlagMetadata[] {
  return Object.values(flagDatabase);
}

// Get icon by name
export function getFlagByName(name: string): FlagMetadata | undefined {
  return flagDatabase[name];
}

// Get icons by category
export function getFlagsByCategory(category: string): FlagMetadata[] {
  return Object.values(flagDatabase).filter(flag => flag.category === category);
}

// Get icons by tag
export function getFlagsByTag(tag: string): FlagMetadata[] {
  return Object.values(flagDatabase).filter(flag => 
    flag.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

// Get all categories
export function getAllFlagCategories(): string[] {
  const categories = new Set<string>();
  Object.values(flagDatabase).forEach(flag => {
    categories.add(flag.category);
  });
  return Array.from(categories);
}

// Get all tags
export function getAllFlagTags(): string[] {
  const tags = new Set<string>();
  Object.values(flagDatabase).forEach(flag => {
    flag.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

// Search icons
export function searchFlags(query: string): FlagMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(flagDatabase).filter(flag => 
    flag.name.toLowerCase().includes(lowercaseQuery) ||
    flag.category.toLowerCase().includes(lowercaseQuery) ||
    flag.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    (flag.description && flag.description.toLowerCase().includes(lowercaseQuery))
  );
}
