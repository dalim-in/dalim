import { ChevronDown } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible"

const items = [
  {
    id: "1",
    title: "What makes Dalim UI different?",
    collapsibles: [
      {
        title: "What about visual style?",
        content:
          "Dalim UI brings a refined design language with clean layouts, balanced spacing, and intuitive interactions—made for beautiful, consistent interfaces.",
      },
      {
        title: "How is the design system structured?",
        content:
          "It’s built on design tokens: consistent colors, typography, spacing, and motion. Everything is modular and scales with your brand.",
      },
    ],
  },
  {
    id: "2",
    title: "How can I customize the components?",
    collapsibles: [
      {
        title: "Can I apply my brand style?",
        content:
          "Yes. You can override tokens, apply custom themes, and adjust radii, shadows, or typography to match your brand identity.",
      },
      {
        title: "Does it support Tailwind?",
        content:
          "Absolutely. Dalim UI is utility-first and pairs naturally with Tailwind—giving you full control with minimal effort.",
      },
    ],
  },
  {
    id: "3",
    title: "Is Dalim UI optimized for performance?",
    collapsibles: [
      {
        title: "How lightweight is it?",
        open: true,
        content:
          "Each component is minimal by design. Tree-shaking, code splitting, and optimized rendering ensure performance doesn’t take a hit.",
      },
      {
        title: "What about responsiveness?",
        open: true,
        content:
          "All components are fully responsive and follow fluid layout principles. From mobile to desktop, your UI adapts seamlessly.",
      },
    ],
  },
  {
    id: "4",
    title: "How accessible is Dalim UI?",
    collapsibles: [
      {
        title: "Is accessibility baked in?",
        content:
          "Yes. We follow WAI-ARIA guidelines closely—providing keyboard navigation, proper labeling, and screen reader support out of the box.",
      },
      {
        title: "Is it inclusive for all users?",
        content:
          "We design with empathy. Color contrast, motion preferences, and assistive tech compatibility are core to Dalim UI’s design philosophy.",
      },
    ],
  },
]

export default function Component() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-lg -space-y-px"
        defaultValue="3"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            defaultValue="3"
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="rounded-md px-4 py-3 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="p-0">
              {item.collapsibles.map((collapsible, index) => (
                <CollapsibleDemo
                  key={index}
                  title={collapsible.title}
                  content={collapsible.content}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function CollapsibleDemo({
  title,
  content,
  open,
}: {
  title: string
  content: string
  open?: boolean
}) {
  return (
    <Collapsible
      className="bg-background border-t px-4 py-3"
      defaultOpen={open}
    >
      <CollapsibleTrigger className="flex gap-2 text-[15px] leading-6 font-semibold [&[data-state=open]>svg]:rotate-180">
        <ChevronDown
          size={16}
          className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
          aria-hidden="true"
        />
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent className="text-muted-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down mt-1 overflow-hidden ps-6 text-sm transition-all">
        {content}
      </CollapsibleContent>
    </Collapsible>
  )
}
