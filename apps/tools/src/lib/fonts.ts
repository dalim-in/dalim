import {
  Bricolage_Grotesque,
  Space_Mono,
  Space_Grotesk,
  Manrope,
  Poppins,
  Montserrat,
  Onest,
  Instrument_Serif,
  Inter,
  DM_Serif_Display,
  Lora,
  Geist,
  Geist_Mono,
  Ms_Madi,
  Funnel_Sans,
  Funnel_Display,
} from "next/font/google";

// Sans-serif fonts
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: 'swap',
});

export const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
  display: 'swap',
});

export const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  display: 'swap',
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: 'swap',
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: 'swap',
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
});

// Serif fonts
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: ["400"],
  display: 'swap',
});

export const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: 'swap',
});

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const msMadi = Ms_Madi({
  subsets: ["latin"],
  variable: "--font-ms-madi",
  weight: ["400"],
  display: 'swap',
});

// Monospace fonts
export const geistMono = Geist_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: 'swap',
});

export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: 'swap',
});
