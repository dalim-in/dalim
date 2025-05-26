"use client";

import { Button } from "@dalim/core/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@dalim/core/ui/tooltip";
import { blockScreens } from "@/src/lib/blocks"; 
import { useBlockContext } from "./block-provider";
import { FullscreenIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BlockInstallCommandCopyButton } from "./block-intsall-command-copy-button";
import V0Button from "./v0-button";

const BlockToolbar = () => {
  const { block } = useParams();
  const { screenSize, setScreenSize } = useBlockContext();

  return (
    <div className="flex items-center gap-2">
      <BlockInstallCommandCopyButton block={block as string} />
      <V0Button url={(`/r/${block}.json`)} />
      <div className="border rounded-md flex items-center gap-1 p-1.5 h-9">
        {blockScreens.map(({ name, icon: Icon }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <Button
                key={name}
                variant={name === screenSize ? "secondary" : "ghost"}
                className="h-7 w-6"
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
        <TooltipTrigger>
          <Button asChild variant="outline" size="icon">
            <Link href={`/blocks/${block}/preview`} target="_blank">
              <FullscreenIcon />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open preview in new tab</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BlockToolbar;
