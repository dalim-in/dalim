"use client"

import { useCopyToClipboard } from "@/src/hooks/use-copy"
import { UI_URL } from "@dalim/auth"
import { Button } from "@dalim/core/ui/button"
import { Check, Terminal } from "lucide-react"

export const BlockInstallCommandCopyButton = ({ block }: { block: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  const installCommand = `npx shadcn add ${`${UI_URL}/r/${block}.json`}`

  return (
    <Button
      size={"sm"}
      variant="outline"
      className="font-mono text-xs max-w-72 shadow-none"
      onClick={() => copyToClipboard(installCommand)}
    >
      {isCopied ? <Check className="text-green-500" /> : <Terminal />}
      <p className="overflow-hidden">
      {installCommand}
      </p>
    </Button>
  )
}
