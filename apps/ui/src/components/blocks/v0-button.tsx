"use client";

import { Button } from "@dalim/core/ui/button"; 
import { Tooltip, TooltipContent, TooltipTrigger } from "@dalim/core/ui/tooltip";

const V0Button = ({ url }: { url: string }) => {
  const v0Url = `https://v0.dev/chat/api/open?url=${url}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="font-mono text-xs"
          asChild
        >
          <a href={v0Url} target="_blank" rel="noopener noreferrer">
            V0
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open in v0</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default V0Button;
