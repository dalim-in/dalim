/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { JSX, useEffect, useState } from "react"
import ComponentCli from "@/src/components/cli-commands"
import {CodeBlock} from "@/src/components/code-block"
import CopyButton from "@/src/components/copy-button"
import OpenInV0 from "@/src/components/open-in-v0"
import { convertRegistryPaths } from "@/src/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"
import { CodeIcon } from "lucide-react"
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

  const baseName = component.name.replace(/-\d+$/, "")

  useEffect(() => {
    const fetchFiles = async () => {
      const baseName = component.name.replace(/-\d+$/, "") // e.g. ai-input-01 → ai-input
      setHighlightedCode(null)

      try {
        const [componentRes, uiRes] = await Promise.all([
          fetch(`/r/${component.name}.json`),
          fetch(`/r/${baseName}.json`),
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
    }

    fetchFiles()
  }, [component.name])

  return (
    <div className="absolute top-2 right-2 flex gap-2 peer-data-comp-loading:hidden">
      <OpenInV0
        componentSource={`https://ui.dalim.in/r/${component.name}.json`}
      />
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
        <DialogContent className="sm:max-w-[600px] -mt-10">
          <DialogHeader>
            <DialogTitle className="text-left">Installation</DialogTitle>
            <DialogDescription className="sr-only">
              Use the CLI to add components to your project
            </DialogDescription>
          </DialogHeader>
          <div className="min-w-0 space-y-5">
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
