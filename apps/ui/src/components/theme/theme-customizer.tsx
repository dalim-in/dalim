"use client"

import * as React from "react"
import { useConfig } from "@/src/hooks/use-config"
import { cn } from "@dalim/core/lib/utils"
import { Button, buttonVariants } from "@dalim/core/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@dalim/core/ui/drawer"
import { Label } from "@dalim/core/ui/label"
import { Select, SelectContent, SelectItem } from "@dalim/core/ui/select"
import { useTheme } from "next-themes"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"
import { SelectTrigger, SelectValue } from "@/registry/default/ui/select"
import { Slider } from "@/registry/default/ui/slider"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs"
import { baseColors, baseColorsV4 } from "@/registry/registry-base-colors"

import { ThemeWrapper } from "./theme-wrapper"

export function ThemeCustomizer() {
  return (
    <div className="flex items-center gap-2">
      <Customizer />
    </div>
  )
}

export function Customizer() {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme: mode } = useTheme()
  const [config, setConfig] = useConfig()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent mismatched HTML

  return (
    <div className="p-3">
      <div className="grid gap-3 items-center md:flex">
        <div className="flex items-center gap-2">
          <Label className="text-xs font-medium">Color</Label>
          <Select
            value={config.theme}
            onValueChange={(value) => {
              setConfig({
                ...config,
                theme: value,
              })
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a theme">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-4 w-4 shrink-0 rounded-full"
                    style={{
                      backgroundColor: `hsl(${baseColors.find((t) => t.name === config.theme)?.activeColor[mode === "dark" ? "dark" : "light"]})`,
                    }}
                  />
                  {baseColors.find((t) => t.name === config.theme)?.label ===
                  "Zinc"
                    ? "Default"
                    : baseColors.find((t) => t.name === config.theme)?.label}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {baseColors.map((theme) => (
                <SelectItem key={theme.name} value={theme.name}>
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-4 w-4 shrink-0 rounded-full"
                      style={{
                        backgroundColor: `hsl(${theme.activeColor[mode === "dark" ? "dark" : "light"]})`,
                      }}
                    />
                    {theme.label === "Zinc" ? "Default" : theme.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-xs font-medium">Border Radius</Label>
          <div className="flex items-center gap-2">
            <Slider
              value={[config.radius]}
              onValueChange={(value) => {
                setConfig({
                  ...config,
                  radius: value[0],
                })
              }}
              max={1.5}
              min={0}
              step={0.1}
              className="w-40"
            />
            <div className="text-muted-foreground flex justify-between gap-2 text-xs">
              <span className="font-medium">{config.radius} rem</span> 
            </div>
          </div>
        </div>
        <CopyCodeButton size="sm" className="[&_svg]:hidden" />
      </div>
    </div>
  )
}

export function CopyCodeButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <>
      <Drawer>
        <DrawerTrigger
          className={cn(
            "h-8 rounded-lg shadow-none sm:hidden",
            className,
            buttonVariants
          )}
          {...props}
        >
          Copy
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Theme</DrawerTitle>
            <DrawerDescription>
              Copy and paste the following code into your CSS file.
            </DrawerDescription>
          </DrawerHeader>
          <ThemeWrapper className="relative px-6">
            <CustomizerCode />
          </ThemeWrapper>
        </DrawerContent>
      </Drawer>
      <Dialog>
        <DialogTrigger
          className={cn(
            "hidden h-8 items-center rounded-lg px-3 text-xs shadow-none hover:bg-[#fff200] hover:text-black sm:flex",
            className
          )}
          {...props}
        >
          Copy Code
        </DialogTrigger>
        <DialogContent className="mx-auto min-w-xl outline-none">
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>
          <ThemeWrapper className="relative">
            <CustomizerCode />
          </ThemeWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

function CustomizerCode() {
  const [config] = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)
  const [themeVersion, setThemeVersion] = React.useState("v4")

  const activeThemeOKLCH = React.useMemo(
    () => baseColorsV4[config.theme as keyof typeof baseColorsV4],
    [config.theme]
  )

  React.useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false)
      }, 2000)
    }
  }, [hasCopied])

  const copyToClipboard = () => {
    const cssCode = generateCSSCode()
    navigator.clipboard.writeText(cssCode)
    setHasCopied(true)
  }

  const generateCSSCode = () => {
    if (themeVersion === "v4") {
      let css = `:root {\n  --radius: ${config.radius}rem;\n`
      Object.entries(activeThemeOKLCH?.light || {}).forEach(([key, value]) => {
        css += `  --${key}: ${value};\n`
      })
      css += `}\n\n.dark {\n`
      Object.entries(activeThemeOKLCH?.dark || {}).forEach(([key, value]) => {
        css += `  --${key}: ${value};\n`
      })
      css += `}`
      return css
    }
    return ""
  }

  return (
    <div className="relative space-y-4">
      <Tabs value={themeVersion} onValueChange={setThemeVersion}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="v4">Tailwind v4</TabsTrigger>
          </TabsList>
          <Button size="sm" onClick={copyToClipboard} className="h-7">
            {hasCopied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <TabsContent value="v4">
          <div className="relative">
            <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-black px-4 py-4">
              <code className="relative rounded bg-black px-[0.3rem] py-[0.2rem] font-mono text-sm text-white">
                {generateCSSCode()}
              </code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
