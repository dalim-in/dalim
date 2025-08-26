import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"

export default function Component() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-lg"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" variant="outline">
          <AccordionTrigger variant="outline">
            What makes Dalim Design different?
          </AccordionTrigger>
          <AccordionContent
            variant="outline"
            className="flex flex-col gap-4 text-balance"
          >
            <p>
              Dalim Design blends creativity with clarity, offering a visually
              consistent system that empowers both designers and developers.
            </p>
            <p>
              It emphasizes minimal aesthetics, strong typography, and
              pixel-perfect components tailored for modern web experiences.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem variant="outline" value="item-2">
          <AccordionTrigger variant="outline">
            How can I customize the design system?
          </AccordionTrigger>
          <AccordionContent
            variant="outline"
            className="flex flex-col gap-4 text-balance"
          >
            <p>
              Dalim Design is highly flexible—modify design tokens, color
              palettes, typography scales, and spacing units to suit your brand.
            </p>
            <p>
              The system supports seamless theming, including dark mode and
              accessibility-aware contrast settings.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem variant="outline" value="item-3">
          <AccordionTrigger variant="outline">
            Is Dalim Design optimized for performance?
          </AccordionTrigger>
          <AccordionContent
            variant="outline"
            className="flex flex-col gap-4 text-balance"
          >
            <p>
              Absolutely. The design system is streamlined to avoid bloat,
              enabling fast load times and high responsiveness.
            </p>
            <p>
              Assets are optimized for modern rendering pipelines and support
              responsive and adaptive layouts by default.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
