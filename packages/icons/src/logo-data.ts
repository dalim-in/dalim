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
  YouTubeMetadata,
  VisualStudioCodeMetadata,
  SpotifyMetadata,
  GmailMetadata,
  SafariMetadata,
  CanvaMetadata,
  GoogleMetadata,
  ReactJSMetadata,
  PayPalMetadata,
  BlenderMetadata,
  DalimMetadata,
  MicrosoftMetadata,
  NikeMetadata,
  V0Metadata,
  LovableMetadata,
  NextJSMetadata,
  GrokMetadata,
  PerplexityAIMetadata,
  ReplicateMetadata,
  RunwayMetadata,
  xAIMetadata,
  BingMetadata,
  EdgeMetadata,
  FirefoxMetadata,
  OperaMetadata,
  WordPressMetadata,
  DrizzleORMMetadata,
  MongoDBMetadata,
  NeonMetadata,
  PlanetScaleMetadata, 
  RedisMetadata,
  SupabaseMetadata,
  TursoMetadata,
  UpstashMetadata,
  AdobeMetadata,
  AnimateMetadata,
  InDesignMetadata,
  LayersMetadata,
  LightroomMetadata,
  SketchMetadata,
  XDMetadata,
  NetflixMetadata,
  TwitchMetadata,
  NuxtMetadata,
  TailwindCSSMetadata,
  VueMetadata,
  GoogleCloudMetadata,
  GoogleDriveMetadata,
  YoutubeMusicMetadata,
  DropboxMetadata
} from "./logos";  

export const logoDatabase: Record<string, LogoMetadata> = { 

  "Dalim": DalimMetadata,
  // AI

  "Gemini": GeminiMetadata,
  "OpenAI": OpenAIMetadata,
  "V0": V0Metadata,
  "Lovable": LovableMetadata,
  "Grok": GrokMetadata,
  "PerplexityAI": PerplexityAIMetadata,
  "Replicate": ReplicateMetadata,
  "Runway": RunwayMetadata,
  "xAI": xAIMetadata,

  // Hosting
  
  "Vercel": VercelMetadata, 
  "Dropbox": DropboxMetadata,

  // Browser

  "Safari": SafariMetadata,
  "Chrome": ChromeMetadata,
  "Bing": BingMetadata,
  "Edge": EdgeMetadata,
  "Firefox": FirefoxMetadata,
  "Opera": OperaMetadata,

  // Software

  "Cursor": CursorMetadata,
  "Apple": AppleMetadata,
  "Github": GithubMetadata,
  "VisualStudioCode": VisualStudioCodeMetadata,
  "Google": GoogleMetadata,
  "Gmail": GmailMetadata,
  "GoogleDrive": GoogleDriveMetadata,
  "GoogleCloud": GoogleCloudMetadata,
  "Blender": BlenderMetadata,
  "Microsoft": MicrosoftMetadata,
  "NextJS": NextJSMetadata,
  "Nuxt": NuxtMetadata,
  "TailwindCSS": TailwindCSSMetadata,
  "Vue": VueMetadata,

  // Sport

  "Nike": NikeMetadata,

  // Design


  "Adobe": AdobeMetadata,
  "Animate": AnimateMetadata,
  "Photoshop": PhotoshopMetadata,
  "Illustrator": IllustratorMetadata,
  "AfterEffects": AfterEffectsMetadata,
  "PremierePro": PremiereProMetadata, 
  "InDesign": InDesignMetadata,
  "Lightroom": LightroomMetadata,
  "XDMetadata": XDMetadata,
  "Figma": FigmaMetadata,
  "Canva": CanvaMetadata,
  "Layers": LayersMetadata,
  "Sketch": SketchMetadata,

  // Database

  "DrizzleORM": DrizzleORMMetadata,
  "MongoDB": MongoDBMetadata,
  "Neon": NeonMetadata,
  "PlanetScale": PlanetScaleMetadata,
  "Redis": RedisMetadata,
  "Supabase": SupabaseMetadata,
  "Turso": TursoMetadata,
  "Upstash": UpstashMetadata,

  // CMS

  "Shopify": ShopifyMetadata,
  "WordPress": WordPressMetadata,

  // Entertainmet

  "Netflix": NetflixMetadata,
  "TwitchMetadata": TwitchMetadata,

  // Social

  "Instagram": InstagramMetadata,
  "Facebook": FacebookMetadata,
  "LinkedIn": LinkedInMetadata,
  "Meta": MetaMetadata,
  "Pinterest": PinterestMetadata,
  "Threads": ThreadsMetadata,
  "WhatsApp": WhatsAppMetadata,
  "XTwitter": XTwitterMetadata,
  "YouTube": YouTubeMetadata,

  // Music

  "Spotify": SpotifyMetadata,
  "YoutubeMusic": YoutubeMusicMetadata,

  // Library

  "ReactJS": ReactJSMetadata,

  // Payment

  "PayPal": PayPalMetadata,
  

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
