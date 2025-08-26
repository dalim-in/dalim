"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/registry/default/lib/utils"

const accordionVariants = cva("border-b", {
  variants: {
    variant: {
      default: "border-border last:border-b-0",
      ghost: "border-transparent",
      outline: "border-2 border-border rounded-lg mb-2 last:mb-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const accordionTriggerVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md text-left font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "hover:underline",
        ghost: "hover:bg-muted/50 px-6",
        outline: "hover:bg-muted/30 px-6",
      },
      size: {
        sm: "py-2 text-sm",
        md: "py-4 text-sm",
        lg: "py-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const accordionContentVariants = cva(
  "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
        outline: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

interface AccordionItemProps
  extends React.ComponentProps<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionVariants> {}

function AccordionItem({ className, variant, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionVariants({ variant }), className)}
      {...props}
    />
  )
}

interface AccordionTriggerProps
  extends React.ComponentProps<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {}

function AccordionTrigger({
  className,
  children,
  variant,
  size,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={cn(
            "text-muted-foreground pointer-events-none h-4 w-4 shrink-0 translate-y-0.5 transition-transform duration-200"
          )}
        />{" "}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

interface AccordionContentProps
  extends React.ComponentProps<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {}

function AccordionContent({
  className,
  children,
  variant,
  size,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(accordionContentVariants({ size, variant }))}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>
        <div
          className={cn(
            size === "sm" && "pt-0 pb-2",
            size === "md" && "pt-0 pb-4",
            size === "lg" && "pt-0 pb-6",
            variant === "default" && " ",
            variant === "ghost" && "px-6 pt-3",
            variant === "outline" && "px-6 pt-3",
            className
          )}
        >
          {children}
        </div>
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
