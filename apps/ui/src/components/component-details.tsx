/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCallback, useEffect, useState, type JSX } from "react"
import ComponentCli from "@/src/components/cli-commands"
import { CodeBlock } from "@/src/components/code-block"
import CopyButton from "@/src/components/copy-button"
import { convertRegistryPaths } from "@/src/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"
import { CodeIcon, RotateCwIcon } from "lucide-react"
import { motion } from "motion/react"
import type { RegistryItem } from "shadcn/registry"

import { Button } from "@/registry/default/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip"

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I’m looking at this dalim/ui documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.
  `
  )}`
}

export default function ComponentDetails({
  component,
}: {
  component: RegistryItem
}) {
  const [files, setFiles] = useState<
    { type: string; content: string; label: string }[]
  >([])
  const [highlightedCode, setHighlightedCode] = useState<JSX.Element | null>(
    null
  )
  const [reloadKey, setReloadKey] = useState("")
  const baseName = component.name.replace(/-\d+$/, "")

  const fetchFiles = useCallback(async () => {
    const baseName = component.name.replace(/-\d+$/, "")
    setHighlightedCode(null)

    try {
      const timestamp = Date.now()
      const [componentRes, uiRes] = await Promise.all([
        fetch(`/r/${component.name}.json?t=${timestamp}`),
        fetch(`/r/${baseName}.json?t=${timestamp}`),
      ])

      const [componentJson, uiJson] = await Promise.all([
        componentRes.ok ? componentRes.json() : { files: [] },
        uiRes.ok ? uiRes.json() : { files: [] },
      ])

      const componentFiles =
        componentJson.files?.map((f: any) => ({
          type: f.type,
          content: convertRegistryPaths(f.content),
          label: "Component Code",
        })) || []

      const uiFiles =
        uiJson.files?.map((f: any) => ({
          type: f.type,
          content: convertRegistryPaths(f.content),
          label: "UI Code",
        })) || []

      setFiles([...uiFiles, ...componentFiles])
    } catch (err) {
      console.error("Error loading files:", err)
      setFiles([])
    }
  }, [component.name])

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1)
    fetchFiles()
  }

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  return (
    <div className="absolute top-2 right-2 flex gap-2 peer-data-comp-loading:hidden">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              key={reloadKey}
              className="focus-visible:ring-ring ghost text-muted-foreground/80 hover:text-foreground inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 lg:opacity-0 lg:group-focus-within/item:opacity-100 lg:group-hover/item:opacity-100"
              animate={{ rotate: reloadKey ? 360 : 0 }}
              onClick={handleReload}
            >
              <RotateCwIcon size={14} aria-hidden={true} />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent className="text-muted-foreground px-2 py-1 text-xs">
            Refresh component
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={getPromptUrl("https://v0.dev", component.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                key={reloadKey}
                className="focus-visible:ring-ring ghost text-muted-foreground/80 hover:text-foreground inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 lg:opacity-0 lg:group-focus-within/item:opacity-100 lg:group-hover/item:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 147 70"
                  className="size-4.5 -translate-x-px"
                >
                  <path d="M56 50.203V14h14v46.156C70 65.593 65.593 70 60.156 70c-2.596 0-5.158-1-7-2.843L0 14h19.797L56 50.203ZM147 56h-14V23.953L100.953 56H133v14H96.687C85.814 70 77 61.186 77 50.312V14h14v32.156L123.156 14H91V0h36.312C138.186 0 147 8.814 147 19.688V56Z" />
                </svg>
              </motion.button>
            </a>
          </TooltipTrigger>
          <TooltipContent className="text-muted-foreground px-2 py-1 text-xs">
            Open in v0
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={getPromptUrl("https://chatgpt.com", component.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                key={reloadKey}
                className="focus-visible:ring-ring ghost text-muted-foreground/80 hover:text-foreground inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 lg:opacity-0 lg:group-focus-within/item:opacity-100 lg:group-hover/item:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.button>
            </a>
          </TooltipTrigger>
          <TooltipContent className="text-muted-foreground px-2 py-1 text-xs">
            Open in ChatGPT
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground/80 hover:text-foreground transition-none hover:bg-transparent disabled:opacity-100 lg:opacity-0 lg:group-focus-within/item:opacity-100 lg:group-hover/item:opacity-100"
                  >
                    <CodeIcon size={16} aria-hidden={true} />
                  </Button>
                </DialogTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="text-muted-foreground px-2 py-1 text-xs">
              View code
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent className="-mt-10 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-left">Installation</DialogTitle>
            <DialogDescription className="sr-only">
              Use the CLI to add components to your project
            </DialogDescription>
          </DialogHeader>

          <div className="min-w-0 space-y-5" key={reloadKey}>
            <div className="space-y-4">
              <div className="relative space-y-6">
                <Tabs defaultValue="component" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="component">Component Code</TabsTrigger>
                    <TabsTrigger value="ui">UI Code</TabsTrigger>
                  </TabsList>

                  <TabsContent value="component">
                    {files.filter((file) => file.label === "Component Code")
                      .length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No component code available.
                      </p>
                    ) : (
                      files
                        .filter((file) => file.label === "Component Code")
                        .map((file, idx) => (
                          <div key={`component-${idx}`} className="space-y-2">
                            <ComponentCli name={component.name} />
                            <CodeBlock
                              code={file.content}
                              lang="tsx"
                              preHighlighted={highlightedCode}
                            />
                            <CopyButton
                              className="top-40"
                              componentSource={file.content}
                            />
                          </div>
                        ))
                    )}
                  </TabsContent>

                  <TabsContent value="ui">
                    {files.filter((file) => file.label === "UI Code").length ===
                    0 ? (
                      <p className="text-muted-foreground text-sm">
                        No UI code available.
                      </p>
                    ) : (
                      files
                        .filter((file) => file.label === "UI Code")
                        .map((file, idx) => (
                          <div key={`ui-${idx}`} className="space-y-2">
                            <ComponentCli name={baseName} />
                            <CodeBlock
                              code={file.content}
                              lang="tsx"
                              preHighlighted={highlightedCode}
                            />
                            <CopyButton
                              className="top-40"
                              componentSource={file.content}
                            />
                          </div>
                        ))
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
