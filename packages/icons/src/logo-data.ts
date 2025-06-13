import { LogoMetadata } from "./types";
import { 
  AppleMetadata,
  CursorMetadata,
  GeminiMetadata,
  GithubMetadata,
  OpenAIMetadata,
  ChromeMetadata,
  VercelMetadata,
  PhotoshopMetadata,
  IllustratorMetadata,
  AfterEffectsMetadata,
  PremiereProMetadata,
  FigmaMetadata,
  ShopifyMetadata,
  InstagramMetadata,
  FacebookMetadata,
  LinkedInMetadata,
  MetaMetadata,
  PinterestMetadata,
  ThreadsMetadata,
  WhatsAppMetadata,
  XTwitterMetadata,
  YouTubeMetadata
} from "./logos";  

export const logoDatabase: Record<string, LogoMetadata> = { 
  "Gemini": GeminiMetadata,
  "OpenAI": OpenAIMetadata,
  "Apple": AppleMetadata,
  "Cursor": CursorMetadata,
  "Vercel": VercelMetadata,
  "Github": GithubMetadata,
  "Chrome": ChromeMetadata,

  // Design

  "Photoshop": PhotoshopMetadata,
  "Illustrator": IllustratorMetadata,
  "AfterEffects": AfterEffectsMetadata,
  "PremierePro": PremiereProMetadata, 

  // CMS

  "Shopify": ShopifyMetadata,

  // Social

  "Instagram": InstagramMetadata,
  "Facebook": FacebookMetadata,
  "LinkedIn": LinkedInMetadata,
  "Meta": MetaMetadata,
  "Pinterest": PinterestMetadata,
  "Threads": ThreadsMetadata,
  "WhatsApp": WhatsAppMetadata,
  "X": XTwitterMetadata,
  "YouTube": YouTubeMetadata,

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
