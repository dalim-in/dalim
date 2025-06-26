import { tool as createTool } from 'ai';
import { z } from "zod";

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { weather: 'Sunny', temperature: 75, location };
  },
});

export const colorPaletteTool = createTool({
  description: "Generate a color palette based on a theme, mood, or brand",
  parameters: z.object({
    theme: z.string().describe("The theme or mood for the color palette (e.g., 'modern tech', 'warm autumn', 'minimalist')"),
    count: z.number().min(3).max(10).default(5).describe("Number of colors in the palette"),
    format: z.enum(["hex", "rgb", "hsl"]).default("hex").describe("Color format"),
  }),
  execute: async ({ theme, count, format }) => {
    // Generate colors based on theme
    const palettes = {
      'modern tech': ['#0066FF', '#00D4FF', '#7C3AED', '#EC4899', '#10B981'],
      'warm autumn': ['#D97706', '#DC2626', '#B45309', '#92400E', '#451A03'],
      'minimalist': ['#000000', '#374151', '#6B7280', '#D1D5DB', '#FFFFFF'],
      'ocean': ['#0EA5E9', '#0284C7', '#0369A1', '#075985', '#0C4A6E'],
      'sunset': ['#F59E0B', '#F97316', '#EF4444', '#EC4899', '#8B5CF6'],
    };
    
    const baseColors = palettes[theme.toLowerCase() as keyof typeof palettes] || palettes['modern tech'];
    
    return {
      theme,
      colors: baseColors.slice(0, count),
      format,
      usage: `Perfect for ${theme} themed designs. Use the primary color for main elements, secondary for accents.`
    };
  },
});

export const iconGeneratorTool = createTool({
  description: "Generate SVG icon code based on description",
  parameters: z.object({
    description: z.string().describe("Description of the icon to generate"),
    style: z.enum(["outline", "filled", "duotone"]).default("outline").describe("Icon style"),
    size: z.number().default(24).describe("Icon size in pixels"),
  }),
  execute: async ({ description, style, size }) => {
    // Simple SVG icon templates based on description
    const iconTemplates = {
      'home': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>`,
      'user': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>`,
      'design': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>`,
      'palette': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="13.5" cy="6.5" r=".5"/>
        <circle cx="17.5" cy="10.5" r=".5"/>
        <circle cx="8.5" cy="7.5" r=".5"/>
        <circle cx="6.5" cy="12.5" r=".5"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>`,
    };
    
    const matchedIcon = Object.keys(iconTemplates).find(key => 
      description.toLowerCase().includes(key)
    );
    
    const svgCode = matchedIcon ? iconTemplates[matchedIcon as keyof typeof iconTemplates] : iconTemplates['design'];
    
    return {
      iconName: description, // 👈 add this
      description,
      style,
      size,
      svgCode,
      usage: `Copy this SVG code and use it in your designs. Customize the stroke color with CSS.`
    };
  },
});

export const typographyTool = createTool({
  description: "Suggest typography combinations and font pairings",
  parameters: z.object({
    projectType: z.string().describe("Type of project (e.g., 'website', 'app', 'poster', 'logo')"),
    mood: z.string().describe("Desired mood or feeling (e.g., 'professional', 'playful', 'elegant')"),
  }),
  execute: async ({ projectType, mood }) => {
    const suggestions = {
      'website-professional': {
        heading: 'Inter',
        body: 'Source Sans Pro',
        accent: 'JetBrains Mono',
        sizes: { h1: '2.5rem', h2: '2rem', body: '1rem' }
      },
      'app-modern': {
        heading: 'Poppins',
        body: 'Inter',
        accent: 'Space Mono',
        sizes: { h1: '2rem', h2: '1.5rem', body: '0.875rem' }
      },
      'poster-creative': {
        heading: 'Playfair Display',
        body: 'Source Sans Pro',
        accent: 'Dancing Script',
        sizes: { h1: '4rem', h2: '2.5rem', body: '1.125rem' }
      }
    };
    
    const key = `${projectType}-${mood}`.toLowerCase();
    const suggestion = suggestions[key as keyof typeof suggestions] || suggestions['website-professional'];
    
    return {
      projectType,
      mood,
      fonts: suggestion,
      googleFontsUrl: `https://fonts.googleapis.com/css2?family=${suggestion.heading.replace(' ', '+')}:wght@400;600;700&family=${suggestion.body.replace(' ', '+')}:wght@400;500&display=swap`,
      cssExample: `
        h1, h2, h3 { font-family: '${suggestion.heading}', sans-serif; }
        body, p { font-family: '${suggestion.body}', sans-serif; }
        code { font-family: '${suggestion.accent}', monospace; }
      `
    };
  },
});

 