// BlockToolbar.tsx
"use client"

import Link from "next/link"
import { blockScreens } from "@/src/lib/blocks"
import { Button } from "@dalim/core/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@dalim/core/ui/tooltip"
import { FullscreenIcon } from "lucide-react" 

import { BlockInstallCommandCopyButton } from "./block-intsall-command-copy-button"
import { useBlockContext } from "./block-provider"
import V0Button from "./v0-button"

interface BlockToolbarProps {
  block: string
}

const BlockToolbar = ({ block }: BlockToolbarProps) => {
  const { screenSize, setScreenSize } = useBlockContext()

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <BlockInstallCommandCopyButton block={block} />
      <div className="flex gap-2">
        <div className="flex items-center gap-1 rounded-md border px-0.5">
          {blockScreens.map(({ name, icon: Icon }) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Button
                  size={"sm"}
                  variant={name === screenSize ? "secondary" : "ghost"}
                  className="h-7 w-7 rounded-sm"
                  onClick={() => setScreenSize(name)}
                >
                  <Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize">{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="outline" className="h-8 w-8" size="icon">
              <Link href={`/blocks/${block}/preview`} target="_blank">
                <FullscreenIcon />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open preview in new tab</p>
          </TooltipContent>
        </Tooltip>
        <div className="mx-3 border-r" />
        <V0Button url={`/r/${block}.json`} />
      </div>
    </div>
  )
}

export default BlockToolbar
