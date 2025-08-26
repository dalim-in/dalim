import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/default/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] gap-y-0.5 items-start [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        destructive:
          "text-destructive bg-destructive/10 border-destructive/20 [&>svg]:text-destructive",
        success:
          "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/50 dark:border-green-900 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        warning:
          "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/50 dark:border-amber-900 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        info: "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/50 dark:border-blue-900 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
      size: {
        sm: "px-3 py-2 has-[>svg]:gap-x-1 text-xs [&>svg]:size-3 [&>svg]:translate-y-0.5",
        md: "px-4 py-3 has-[>svg]:gap-x-2 text-sm [&>svg]:size-4 [&>svg]:translate-y-0.5",
        lg: "px-6 py-4 has-[>svg]:gap-x-3 text-base [&>svg]:size-5 [&>svg]:translate-y-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Alert({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
