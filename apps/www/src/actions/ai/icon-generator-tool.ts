import { tool } from "ai"
import { z } from "zod"

// Simple icon mapping based on your iconDatabase
const iconMapping = {
  // Common search terms to exact icon names
  plus: "Plus",
  add: "Plus",
  "plus sign": "Plus",
  circle: "Circle",
  round: "Circle",
  home: "House",
  house: "House",
  building: "Building",
  user: "CircleUser",
  person: "CircleUser",
  profile: "CircleUser",
  menu: "Menu",
  hamburger: "Menu",
  star: "CirclePlus", // Using CirclePlus as fallback since no Star
  heart: "HeartPlus",
  mail: "Mail",
  email: "Mail",
  message: "Mail",
  search: "ScanSearch",
  find: "ScanSearch",
  eye: "Eye",
  view: "Eye",
  see: "Eye",
  hand: "Hand",
  arrow: "ArrowDown",
  "arrow down": "ArrowDown",
  "arrow up": "ArrowBigUp",
  "arrow left": "ArrowBigLeft",
  "arrow right": "ArrowBigRight",
  calculator: "Calculator",
  math: "Calculator",
  percent: "Percent",
  percentage: "Percent",
  minus: "Minus",
  subtract: "Minus",
  x: "X",
  close: "X",
  times: "X",
  multiply: "X",
  divide: "Divide",
  equal: "Equal",
  equals: "Equal",
  info: "Info",
  information: "Info",
  help: "CircleHelp",
  question: "CircleHelp",
  sun: "Sun",
  moon: "MoonM",
  key: "Key",
  lock: "Key",
  unlock: "Key",
  login: "LogIn",
  logout: "LogOut",
  signin: "LogIn",
  signout: "LogOut",
  bell: "Bell",
  notification: "Bell",
  alert: "BadgeAlert",
  warning: "BadgeAlert",
  flag: "Flag",
  bookmark: "Bookmark",
  save: "Bookmark",
  gift: "Gift",
  present: "Gift",
  cake: "Cake",
  birthday: "Cake",
  phone: "Contact",
  contact: "Contact",
  map: "MapPin",
  location: "MapPin",
  pin: "Pin",
  badge: "Badge",
  award: "AwardMetadata",
  trophy: "AwardMetadata",
}

// All available icons from your library
const availableIcons = [
  "Plus",
  "Circle",
  "House",
  "Building",
  "CircleUser",
  "Menu",
  "Mail",
  "Eye",
  "Hand",
  "ArrowDown",
  "ArrowBigUp",
  "ArrowBigLeft",
  "ArrowBigRight",
  "Calculator",
  "Percent",
  "Minus",
  "X",
  "Divide",
  "Equal",
  "Info",
  "CircleHelp",
  "Sun",
  "MoonM",
  "Key",
  "LogIn",
  "LogOut",
  "Bell",
  "BadgeAlert",
  "Flag",
  "Bookmark",
  "Gift",
  "Cake",
  "Contact",
  "MapPin",
  "Pin",
  "Badge",
  "AwardMetadata",
  "CirclePlus",
  "HeartPlus",
  "ScanSearch",
]

export const iconGeneratorTool = tool({
  description: "Generate icon code from dalim-icons library based on description",
  parameters: z.object({
    description: z.string().describe("Description of the icon to generate"),
    variant: z.enum(["stroke", "solid", "duotone", "twotone", "bulk"]).default("stroke").describe("Icon variant"),
    size: z.number().default(72).describe("Icon size in pixels"),
    color: z.string().default("currentColor").describe("Icon color"),
    strokeWidth: z.number().default(2).describe("Stroke width for stroke variant"),
  }),
  execute: async ({ description, variant, size, color, strokeWidth }) => {
    console.log("🔧 Tool called with:", { description, variant, size, color, strokeWidth })

    try {
      const searchTerm = description.toLowerCase().trim()
      console.log("🔍 Searching for:", searchTerm)

      let selectedIconName = null

      // First, try exact mapping
      if (iconMapping[searchTerm as keyof typeof iconMapping]) {
        selectedIconName = iconMapping[searchTerm as keyof typeof iconMapping]
        console.log("✅ Found exact mapping:", selectedIconName)
      }

      // If no exact match, try partial matching
      if (!selectedIconName) {
        for (const [key, value] of Object.entries(iconMapping)) {
          if (searchTerm.includes(key) || key.includes(searchTerm)) {
            selectedIconName = value
            console.log("✅ Found partial mapping:", key, "->", selectedIconName)
            break
          }
        }
      }

      // If still no match, try direct icon name matching
      if (!selectedIconName) {
        const directMatch = availableIcons.find((iconName) =>
          iconName.toLowerCase().includes(searchTerm) || searchTerm.includes(iconName.toLowerCase()),
        )
        if (directMatch) {
          selectedIconName = directMatch
          console.log("✅ Found direct match:", selectedIconName)
        }
      }

      // Final fallback
      if (!selectedIconName) {
        selectedIconName = "Plus" // Safe fallback
        console.log("⚠️ Using fallback icon:", selectedIconName)
      }

      console.log("🎯 Final selected icon:", selectedIconName)

      // Generate the React component code
      const componentCode = `import { ${selectedIconName} } from 'dalim-icons';

export function GeneratedIcon() {
  return (
    <${selectedIconName}
      size={${size}}
      variant="${variant}"
      color="${color}"
      strokeWidth={${strokeWidth}}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}`

      // Generate SVG template
      const svgCode = `<svg 
  width="${size}" 
  height="${size}" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="${color}" 
  stroke-width="${strokeWidth}" 
  stroke-linecap="round" 
  stroke-linejoin="round"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- ${selectedIconName} icon from dalim-icons -->
  <!-- SVG content will be extracted from the rendered component -->
</svg>`

      const result = {
        iconName: selectedIconName,
        description: description,
        variant,
        size,
        color,
        strokeWidth,
        componentCode,
        svgCode,
        category: "generated",
        tags: [searchTerm],
        matchingIcons: [
          {
            name: selectedIconName,
            category: "generated",
            tags: [searchTerm],
          },
        ],
        usage: `Use the React component code above in your project. Import ${selectedIconName} from 'dalim-icons' and customize the props as needed.`,
      }

      console.log("✅ Tool result:", result)
      return result
    } catch (error) {
      console.error("❌ Error in icon generator tool:", error)

      // Return a working fallback instead of error
      return {
        iconName: "Plus", // Use a known working icon
        description: description,
        variant,
        size,
        color,
        strokeWidth,
        componentCode: `import { Plus } from 'dalim-icons';

export function GeneratedIcon() {
  return (
    <Plus
      size={${size}}
      variant="${variant}"
      color="${color}"
      strokeWidth={${strokeWidth}}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}`,
        svgCode: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5v14M5 12h14"/>
</svg>`,
        category: "fallback",
        tags: ["plus", "add"],
        matchingIcons: [],
        usage: `Fallback icon used due to error: `,
      }
    }
  },
})

export const tools = {
  generateIcon: iconGeneratorTool,
}
