"use client"

import { useState } from "react"
import Image from "next/image"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"

const defaultFeatures = [
  {
    id: 1,
    title: "What makes Dalim Design different?",
    image: "/thumbs/accordion.jpg",
    description:
      "Dalim Design blends creativity with clarity, offering a visually consistent system that empowers both designers and developers.",
  },
  {
    id: 2,
    title: "How can I customize the design system?",
    image: "/thumbs/button.jpg",
    description:
      "Dalim Design is highly flexible—modify design tokens, color palettes, typography scales, and spacing units to suit your brand.",
  },
  {
    id: 3,
    title: "Is Dalim Design optimized for performance?",
    image: "/thumbs/book.jpg",
    description: (
      <div>
        <p className="pl-2">
          Absolutely. The design system is streamlined to avoid bloat, enabling
          fast load times and high responsiveness.
        </p>
      </div>
    ),
  },
]

const Component = () => {
  const [activeTabId, setActiveTabId] = useState<number | null>(1)
  const [activeImage, setActiveImage] = useState(defaultFeatures[0].image)

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full items-start justify-between gap-3">
        <div className="w-full p-4 md:w-1/2">
          <Accordion type="single" className="w-full" defaultValue="item-1">
            {defaultFeatures.map((tab) => (
              <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                <AccordionTrigger
                  onClick={() => {
                    setActiveImage(tab.image)
                    setActiveTabId(tab.id)
                  }}
                  className="cursor-pointer !no-underline transition"
                >
                  <h6
                    className={`text-md font-semibold ${
                      tab.id === activeTabId
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tab.title}
                  </h6>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-muted-foreground text-sm">
                    {tab.description}
                  </div>
                  <div className="mt-4 md:hidden">
                    <Image
                      src={tab.image}
                      alt={tab.title}
                      width={200}
                      height={200}
                      className="h-full w-full rounded-sm object-cover"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="bg-muted relative m-auto hidden w-1/2 overflow-hidden rounded-sm md:block">
          <Image
            src={activeImage}
            width={200}
            height={200}
            alt="Feature preview"
            className="h-full w-full rounded-md border object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Component
