import { tool } from "ai";
import { z } from "zod";

export const colorPaletteTool = tool({
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

export const iconGeneratorTool = tool({
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
      description,
      style,
      size,
      svgCode,
      usage: `Copy this SVG code and use it in your designs. Customize the stroke color with CSS.`
    };
  },
});

export const typographyTool = tool({
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

export const layoutTool = tool({
  description: "Generate layout suggestions and CSS Grid/Flexbox code",
  parameters: z.object({
    layoutType: z.string().describe("Type of layout needed (e.g., 'hero section', 'card grid', 'sidebar layout')"),
    responsive: z.boolean().default(true).describe("Whether the layout should be responsive"),
  }),
  execute: async ({ layoutType, responsive }) => {
    const layouts = {
      'hero section': {
        html: `<section class="hero">
  <div class="hero-content">
    <h1>Your Amazing Headline</h1>
    <p>Compelling subtitle that explains your value proposition</p>
    <button class="cta-button">Get Started</button>
  </div>
</section>`,
        css: `
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
}

${responsive ? `
@media (max-width: 768px) {
  .hero-content h1 { font-size: 2.5rem; }
  .hero-content p { font-size: 1rem; }
}` : ''}
        `
      },
      'card grid': {
        html: `<div class="card-grid">
  <div class="card">
    <h3>Feature 1</h3>
    <p>Description of your first feature</p>
  </div>
  <div class="card">
    <h3>Feature 2</h3>
    <p>Description of your second feature</p>
  </div>
  <div class="card">
    <h3>Feature 3</h3>
    <p>Description of your third feature</p>
  </div>
</div>`,
        css: `
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 1rem;
  color: #1f2937;
}

.card p {
  color: #6b7280;
  line-height: 1.6;
}

${responsive ? `
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}` : ''}
        `
      }
    };
    
    const layout = layouts[layoutType.toLowerCase() as keyof typeof layouts] || layouts['hero section'];
    
    return {
      layoutType,
      responsive,
      html: layout.html,
      css: layout.css,
      description: `A responsive ${layoutType} layout with modern styling and hover effects.`
    };
  },
});
