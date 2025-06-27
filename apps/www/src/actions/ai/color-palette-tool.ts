import { tool as createTool } from 'ai';
import { z } from "zod";

export const colorPaletteTool = createTool({
  description: "Generate a color palette based on a theme, mood, or base color",
  parameters: z.object({
    theme: z.string().describe("Theme or mood for the color palette (e.g., 'modern', 'warm', 'ocean', 'sunset')"),
    baseColor: z.string().optional().describe("Base hex color to build palette around (optional)"),
    count: z.number().default(5).describe("Number of colors in the palette (3-8)"),
    type: z.enum(["monochromatic", "analogous", "complementary", "triadic", "tetradic", "custom"]).default("custom").describe("Type of color harmony"),
  }),
  execute: async ({ theme, baseColor, count, type }) => {
    // Color generation logic based on theme and type
    const generatePalette = (theme: string, baseColor?: string, count: number = 5, type: string = "custom") => {
      const palettes: Record<string, string[]> = {
        modern: ["#2563eb", "#64748b", "#f8fafc", "#1e293b", "#0ea5e9"],
        warm: ["#f59e0b", "#ef4444", "#f97316", "#fbbf24", "#fed7aa"],
        ocean: ["#0ea5e9", "#06b6d4", "#0891b2", "#164e63", "#cffafe"],
        sunset: ["#f59e0b", "#f97316", "#ef4444", "#ec4899", "#fbbf24"],
        nature: ["#22c55e", "#84cc16", "#65a30d", "#166534", "#dcfce7"],
        purple: ["#8b5cf6", "#a855f7", "#9333ea", "#7c3aed", "#ede9fe"],
        minimal: ["#000000", "#374151", "#9ca3af", "#e5e7eb", "#ffffff"],
        vibrant: ["#ef4444", "#f59e0b", "#eab308", "#22c55e", "#3b82f6"],
        pastel: ["#fecaca", "#fed7aa", "#fef3c7", "#d1fae5", "#dbeafe"],
        dark: ["#111827", "#1f2937", "#374151", "#4b5563", "#6b7280"],
      };

      let colors = palettes[theme.toLowerCase()] || palettes.modern;
      
      // If baseColor is provided, generate harmonious colors
      if (baseColor) {
        colors = generateHarmoniousColors(baseColor, type, count);
      }
      
      // Adjust count if needed
      if (colors.length > count) {
        colors = colors.slice(0, count);
      } else if (colors.length < count) {
        // Generate additional colors
        const additional = generateAdditionalColors(colors, count - colors.length);
        colors = [...colors, ...additional];
      }

      return colors;
    };

    const generateHarmoniousColors = (baseColor: string, type: string, count: number): string[] => {
      // Convert hex to HSL for easier manipulation
      const hexToHsl = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        // eslint-disable-next-line prefer-const
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }

        return [h * 360, s * 100, l * 100];
      };

      const hslToHex = (h: number, s: number, l: number) => {
        h /= 360; s /= 100; l /= 100;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => {
          const k = (n + h * 12) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      };

      const [baseH, baseS, baseL] = hexToHsl(baseColor);
      const colors = [baseColor];

      switch (type) {
        case "monochromatic":
          for (let i = 1; i < count; i++) {
            const newL = Math.max(10, Math.min(90, baseL + (i - count/2) * 15));
            colors.push(hslToHex(baseH, baseS, newL));
          }
          break;
        case "analogous":
          for (let i = 1; i < count; i++) {
            const newH = (baseH + i * 30) % 360;
            colors.push(hslToHex(newH, baseS, baseL));
          }
          break;
        case "complementary":
          colors.push(hslToHex((baseH + 180) % 360, baseS, baseL));
          if (count > 2) {
            for (let i = 2; i < count; i++) {
              const newL = Math.max(10, Math.min(90, baseL + (i - count/2) * 20));
              colors.push(hslToHex(baseH, baseS, newL));
            }
          }
          break;
        case "triadic":
          colors.push(hslToHex((baseH + 120) % 360, baseS, baseL));
          colors.push(hslToHex((baseH + 240) % 360, baseS, baseL));
          if (count > 3) {
            for (let i = 3; i < count; i++) {
              const newL = Math.max(10, Math.min(90, baseL + (i - count/2) * 15));
              colors.push(hslToHex(baseH, baseS, newL));
            }
          }
          break;
        default:
          // Custom generation
          for (let i = 1; i < count; i++) {
            const newH = (baseH + i * (360 / count)) % 360;
            const newS = Math.max(20, Math.min(80, baseS + (Math.random() - 0.5) * 30));
            const newL = Math.max(20, Math.min(80, baseL + (Math.random() - 0.5) * 40));
            colors.push(hslToHex(newH, newS, newL));
          }
      }

      return colors;
    };

    const generateAdditionalColors = (existingColors: string[], needed: number): string[] => {
      const additional = [];
      for (let i = 0; i < needed; i++) {
        // Generate variations of existing colors
        const baseColor = existingColors[i % existingColors.length];
        // Simple variation by adjusting brightness
        const variation = adjustBrightness(baseColor, (i + 1) * 0.1);
        additional.push(variation);
      }
      return additional;
    };

    const adjustBrightness = (hex: string, factor: number): string => {
      const num = parseInt(hex.replace("#", ""), 16);
      const amt = Math.round(2.55 * factor * 100);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };

    const colors = generatePalette(theme, baseColor, count, type);
    
    // Generate color names
    const generateColorName = (hex: string, index: number): string => {
      const colorNames = [
        "Primary", "Secondary", "Accent", "Background", "Text",
        "Highlight", "Muted", "Border", "Success", "Warning"
      ];
      return colorNames[index] || `Color ${index + 1}`;
    };

    const palette = colors.map((color, index) => ({
      hex: color,
      name: generateColorName(color, index),
      rgb: hexToRgb(color),
      hsl: hexToHsl(color),
    }));

    function hexToRgb(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    }

    function hexToHsl(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      // eslint-disable-next-line prefer-const
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    return {
      theme,
      type,
      baseColor,
      palette,
      usage: `Use this ${theme} color palette in your designs. Each color includes hex, RGB, and HSL values for easy implementation.`,
      cssVariables: palette.map((color) => `--color-${color.name.toLowerCase().replace(/\s+/g, '-')}: ${color.hex};`).join('\n'),
    };
  },
});
