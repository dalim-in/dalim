"use client";

import { useCopyToClipboard } from "@/src/hooks/use-copy"; 
import { Check, Terminal } from "lucide-react";
import { Button } from "@dalim/core/ui/button";

export const BlockInstallCommandCopyButton = ({ block }: { block: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const installCommand = `npx shadcn add ${(`/r/${block}.json`)}`;

  return (
    <Button
      variant="outline"
      className="font-mono text-xs shadow-none"
      onClick={() => copyToClipboard(installCommand)}
    >
      {isCopied ? <Check className="text-green-500" /> : <Terminal />}
      {installCommand}
    </Button>
  );
};
