"use client"

import * as React from "react"

import { useConfig } from "@/src/hooks/use-config" 

interface StyleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  styleName?: ["name"]
}

export function StyleWrapper({ styleName, children }: StyleWrapperProps) {
  const [config] = useConfig()

  if (!styleName || config.style === styleName) {
    return <div>{children}</div>
  }

  return null
}
