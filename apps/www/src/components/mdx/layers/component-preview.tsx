 
"use client";

import * as React from "react";
import Image from "next/image"; 
import { CodeBlockInstall } from "./code-block-command";

import { cn } from "@/src/lib/utils";
import { useConfig } from "@/src/hooks/use-config";
import { CopyButton } from "./copy-button"; 
import { ThemeWrapper } from "./theme-wrapper";
import OpenInV0 from "./open-in-v0";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dalim/core/ui/tabs";
 
import { Eye, FolderCode, Settings2 } from "lucide-react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  extractClassname?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
  description?: string;
  hideCode?: boolean;
  type?: "block" | "component" | "example";
}

export function ComponentPreview({
  name,
  type, 
  className, 
  align = "center", 
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const [config] = useConfig();
   
    

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
        <Image
          src={`/r/styles/${config.style}/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 w-[970px] max-w-none bg-background dark:hidden sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <Image
          src={`/r/styles/${config.style}/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 hidden w-[970px] max-w-none bg-background dark:block sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <div className="absolute inset-0 hidden w-[1600px] bg-background md:block">
          <iframe
            src={`/view/styles/${config.style}/${name}`}
            className="size-full"
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode && (
            <div className="flex items-center border-b w-full">
              <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="preview"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Eye className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <FolderCode className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="install"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Settings2 className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2 items-center">
                <OpenInV0
                  componentSource={`https://designali.in/r/styles/default/${name}.json`}
                />
                <CopyButton
                  value={""}
                  variant="ghost"
                  className="h-8 w-8 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:h-3.5 [&_svg]:w-3.5"
                />
                <p className="text-primary/60 text-xs hidden md:block text-nowrap">
                  {name}
                </p>
              </div>
            </div>
          )}
        </div>
        <TabsContent value="preview" className="relative rounded-3xl border">
          <ThemeWrapper defaultTheme="stone">
            <div
              className={cn(
                "preview flex min-h-[400px] w-full justify-center p-6 md:p-10",
                {
                  "items-center": align === "center",
                  "items-start": align === "start",
                  "items-end": align === "end",
                }
              )}
            >
              <React.Suspense
                fallback={
                  <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                     
                    Loading...
                  </div>
                }
              >
                
              </React.Suspense>
            </div>
          </ThemeWrapper>
        </TabsContent>
        <TabsContent className="grid" value="code">
          <div className="grid w-full min-w-0 overflow-x-auto rounded-xl [&_pre]:mx-auto [&_pre]:my-0 [&_pre]:flex [&_pre]:max-h-[400px] [&_pre]:w-full [&_pre]:overflow-auto">
            vsf
          </div>
        </TabsContent>
        <TabsContent value="install">
          <div className="flex flex-col space-y-4">
            <CodeBlockInstall
              __npmCommand__={`npx shadcn@latest add https://www.designali.in/r/styles/default/${name}.json`}
              __yarnCommand__={`npx shadcn@latest add https://www.designali.in/r/styles/default/${name}.json`}
              __pnpmCommand__={`pnpm dlx shadcn@latest add https://www.designali.in/r/styles/default/${name}.json`}
              __bunCommand__={`bunx --bun shadcn@latest add  https://www.designali.in/r/styles/default/${name}.json`}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
