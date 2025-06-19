import { AtSignIcon, CommandIcon, EclipseIcon, ZapIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"

const items = [
  {
    id: "1",
    title: "What makes Dalim Design different?",
    icon: CommandIcon,
    content:
      "Dalim Design blends creativity with clarity, offering a visually consistent system that empowers both designers and developers. It emphasizes minimal aesthetics, strong typography, and pixel-perfect components tailored for modern web experiences.",
  },
  {
    id: "2",
    title: "How can I customize the design system?",
    icon: EclipseIcon,
    content:
      "Dalim Design is highly flexible—modify design tokens, color palettes, typography scales, and spacing units to suit your brand. The system supports seamless theming, including dark mode and accessibility-aware contrast settings.",
  },
  {
    id: "3",
    title: "Is Dalim Design optimized for performance?",
    icon: ZapIcon,
    content:
      "Absolutely. The design system is streamlined to avoid bloat, enabling fast load times and high responsiveness. Assets are optimized for modern rendering pipelines and support responsive and adaptive layouts by default.",
  },
  {
    id: "4",
    title: "How accessible is Dalim Design?",
    icon: AtSignIcon,
    content:
      "Accessibility is a core principle. All visual elements are designed with inclusive UX in mind—ensuring legible typography, sufficient contrast, focus indicators, and compatibility with assistive technologies.",
  },
]

export default function Component() {
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="w-[350px] space-y-1 md:w-lg"
        defaultValue="3"
      >
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
              <span className="flex items-center gap-3">
                <item.icon
                  size={16}
                  className="shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>{item.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ps-7 pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
