import { LogoMetadata } from "./types";
import { 
  GeminiMetadata,
  OpenAIMetadata
} from "./logos";

export const logoDatabase: Record<string, LogoMetadata> = { 
  "Gemini": GeminiMetadata,
  "OpenAI": OpenAIMetadata
};

// Get all icons
export function getAllLogos(): LogoMetadata[] {
  return Object.values(logoDatabase);
}

// Get icon by name
export function getLogoByName(name: string): LogoMetadata | undefined {
  return logoDatabase[name];
}

// Get icons by category
export function getLogosByCategory(category: string): LogoMetadata[] {
  return Object.values(logoDatabase).filter(logo => logo.category === category);
}

// Get icons by tag
export function getLogosByTag(tag: string): LogoMetadata[] {
  return Object.values(logoDatabase).filter(logo => 
    logo.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

// Get all categories
export function getAllLogoCategories(): string[] {
  const categories = new Set<string>();
  Object.values(logoDatabase).forEach(logo => {
    categories.add(logo.category);
  });
  return Array.from(categories);
}

// Get all tags
export function getAllLogoTags(): string[] {
  const tags = new Set<string>();
  Object.values(logoDatabase).forEach(logo => {
    logo.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

// Search icons
export function searchLogos(query: string): LogoMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(logoDatabase).filter(logo => 
    logo.name.toLowerCase().includes(lowercaseQuery) ||
    logo.category.toLowerCase().includes(lowercaseQuery) ||
    logo.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    (logo.description && logo.description.toLowerCase().includes(lowercaseQuery))
  );
}
