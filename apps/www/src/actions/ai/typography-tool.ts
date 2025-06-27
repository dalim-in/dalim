import { tool as createTool } from 'ai';
import { z } from "zod";

export const typographyTool = createTool({
  description: "Suggest typography and font pairings for design projects",
  parameters: z.object({
    style: z.enum(["modern", "classic", "playful", "elegant", "minimal", "bold", "corporate", "creative"]).describe("Typography style"),
    purpose: z.enum(["website", "app", "print", "branding", "presentation", "editorial"]).describe("Purpose of the typography"),
    mood: z.string().optional().describe("Desired mood or feeling (e.g., 'professional', 'friendly', 'luxurious')"),
  }),
  execute: async ({ style, purpose, mood }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fontPairings: Record<string, any> = {
      modern: {
        primary: { name: "Inter", category: "Sans-serif", weight: "400, 500, 600, 700" },
        secondary: { name: "DM Sans", category: "Sans-serif", weight: "400, 500" },
        accent: { name: "Playfair Display", category: "Serif", weight: "400, 700" },
      },
      classic: {
        primary: { name: "Georgia", category: "Serif", weight: "400, 700" },
        secondary: { name: "Helvetica Neue", category: "Sans-serif", weight: "300, 400, 500" },
        accent: { name: "Crimson Text", category: "Serif", weight: "400, 600" },
      },
      playful: {
        primary: { name: "Poppins", category: "Sans-serif", weight: "300, 400, 600, 700" },
        secondary: { name: "Nunito", category: "Sans-serif", weight: "400, 600, 800" },
        accent: { name: "Fredoka One", category: "Display", weight: "400" },
      },
      elegant: {
        primary: { name: "Playfair Display", category: "Serif", weight: "400, 500, 700" },
        secondary: { name: "Source Sans Pro", category: "Sans-serif", weight: "300, 400, 600" },
        accent: { name: "Cormorant Garamond", category: "Serif", weight: "300, 400, 500" },
      },
      minimal: {
        primary: { name: "Helvetica", category: "Sans-serif", weight: "300, 400, 500" },
        secondary: { name: "SF Mono", category: "Monospace", weight: "400, 500" },
        accent: { name: "Times New Roman", category: "Serif", weight: "400, 700" },
      },
      bold: {
        primary: { name: "Montserrat", category: "Sans-serif", weight: "400, 600, 700, 900" },
        secondary: { name: "Open Sans", category: "Sans-serif", weight: "400, 600, 700" },
        accent: { name: "Oswald", category: "Sans-serif", weight: "300, 400, 700" },
      },
      corporate: {
        primary: { name: "Roboto", category: "Sans-serif", weight: "300, 400, 500, 700" },
        secondary: { name: "Lato", category: "Sans-serif", weight: "300, 400, 700" },
        accent: { name: "Merriweather", category: "Serif", weight: "300, 400, 700" },
      },
      creative: {
        primary: { name: "Raleway", category: "Sans-serif", weight: "300, 400, 600, 700" },
        secondary: { name: "Fira Sans", category: "Sans-serif", weight: "300, 400, 500" },
        accent: { name: "Abril Fatface", category: "Display", weight: "400" },
      },
    };

    const selectedPairing = fontPairings[style] || fontPairings.modern;

    // Generate typography scale
    const typographyScale = {
      h1: { size: "3rem", lineHeight: "1.2", letterSpacing: "-0.02em" },
      h2: { size: "2.25rem", lineHeight: "1.3", letterSpacing: "-0.01em" },
      h3: { size: "1.875rem", lineHeight: "1.4", letterSpacing: "0" },
      h4: { size: "1.5rem", lineHeight: "1.4", letterSpacing: "0" },
      h5: { size: "1.25rem", lineHeight: "1.5", letterSpacing: "0" },
      h6: { size: "1.125rem", lineHeight: "1.5", letterSpacing: "0" },
      body: { size: "1rem", lineHeight: "1.6", letterSpacing: "0" },
      small: { size: "0.875rem", lineHeight: "1.5", letterSpacing: "0" },
      caption: { size: "0.75rem", lineHeight: "1.4", letterSpacing: "0.05em" },
    };

    // Generate CSS
    const generateCSS = () => {
      return `
/* Typography System */
:root {
  --font-primary: '${selectedPairing.primary.name}', ${selectedPairing.primary.category.toLowerCase()};
  --font-secondary: '${selectedPairing.secondary.name}', ${selectedPairing.secondary.category.toLowerCase()};
  --font-accent: '${selectedPairing.accent.name}', ${selectedPairing.accent.category.toLowerCase()};
}

/* Typography Scale */
h1 { font-family: var(--font-primary); font-size: ${typographyScale.h1.size}; line-height: ${typographyScale.h1.lineHeight}; letter-spacing: ${typographyScale.h1.letterSpacing}; }
h2 { font-family: var(--font-primary); font-size: ${typographyScale.h2.size}; line-height: ${typographyScale.h2.lineHeight}; letter-spacing: ${typographyScale.h2.letterSpacing}; }
h3 { font-family: var(--font-primary); font-size: ${typographyScale.h3.size}; line-height: ${typographyScale.h3.lineHeight}; letter-spacing: ${typographyScale.h3.letterSpacing}; }
h4 { font-family: var(--font-primary); font-size: ${typographyScale.h4.size}; line-height: ${typographyScale.h4.lineHeight}; letter-spacing: ${typographyScale.h4.letterSpacing}; }
h5 { font-family: var(--font-primary); font-size: ${typographyScale.h5.size}; line-height: ${typographyScale.h5.lineHeight}; letter-spacing: ${typographyScale.h5.letterSpacing}; }
h6 { font-family: var(--font-primary); font-size: ${typographyScale.h6.size}; line-height: ${typographyScale.h6.lineHeight}; letter-spacing: ${typographyScale.h6.letterSpacing}; }
body, p { font-family: var(--font-secondary); font-size: ${typographyScale.body.size}; line-height: ${typographyScale.body.lineHeight}; letter-spacing: ${typographyScale.body.letterSpacing}; }
.accent { font-family: var(--font-accent); }
.small { font-size: ${typographyScale.small.size}; line-height: ${typographyScale.small.lineHeight}; }
.caption { font-size: ${typographyScale.caption.size}; line-height: ${typographyScale.caption.lineHeight}; letter-spacing: ${typographyScale.caption.letterSpacing}; }
      `.trim();
    };

    // Usage recommendations
    const usageRecommendations = {
      website: "Use the primary font for headings, secondary for body text, and accent sparingly for emphasis.",
      app: "Prioritize readability with the secondary font for UI text and primary for important headings.",
      print: "The serif fonts work well for body text in print, while sans-serif fonts are great for headings.",
      branding: "Use the accent font for brand elements and logos, primary for headlines.",
      presentation: "Bold weights of the primary font work well for slide titles and key points.",
      editorial: "Mix serif and sans-serif strategically - serif for long-form reading, sans-serif for UI elements.",
    };

    return {
      style,
      purpose,
      mood,
      fonts: selectedPairing,
      typographyScale,
      css: generateCSS(),
      googleFontsImport: `@import url('https://fonts.googleapis.com/css2?family=${selectedPairing.primary.name.replace(/\s+/g, '+')}:wght@${selectedPairing.primary.weight}&family=${selectedPairing.secondary.name.replace(/\s+/g, '+')}:wght@${selectedPairing.secondary.weight}&family=${selectedPairing.accent.name.replace(/\s+/g, '+')}:wght@${selectedPairing.accent.weight}&display=swap');`,
      usage: usageRecommendations[purpose] || "Use these fonts consistently throughout your design for a cohesive look.",
      tips: [
        "Limit yourself to 2-3 font families maximum",
        "Ensure sufficient contrast between text and background",
        "Test readability at different sizes",
        "Consider loading performance when using web fonts",
      ],
    };
  },
});
