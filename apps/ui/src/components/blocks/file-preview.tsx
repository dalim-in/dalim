import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CodeBlocks } from "@/src/components/code-block"
import { useCopyToClipboard } from "@/src/hooks/use-copy"
import { removeBlockPrefixFromPath } from "@/src/lib/blocks"
import { getFileContent } from "@/src/lib/file"
import { Button } from "@dalim/core/ui/button"
import { CheckIcon, CopyIcon, FileIcon } from "lucide-react"

import { useBlockContext } from "./block-provider"

export function FilePreview() {
  const [code, setCode] = useState<string>("")
  const { activeFile } = useBlockContext() 
  const { block } = useParams()  
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  useEffect(() => {
    const filePath = activeFile.path.startsWith("registry/")
      ? activeFile.path
      : `registry/default/blocks/${block}/${activeFile.path}`
    getFileContent(filePath).then((code) => setCode(code))
  }, [activeFile, block])

  return (
    <div className="grid w-full h-full border-t md:border-t-0">
      {/* Top bar with file name and copy button */}
      <div className="bg-sidebar flex h-14 shrink-0 items-center justify-between gap-2 border-b pr-4 pl-6">
        <div className="flex items-center gap-2">
          <FileIcon className="h-4 w-4" />
          {removeBlockPrefixFromPath(activeFile.target || activeFile.path)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => copyToClipboard(code)}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>

      {/* Content with scroll and proper width */}
      <div className="w-full h-full max-w-full overflow-hidden">
        <CodeBlocks code={code} lang="html" />
      </div>
    </div>
  )
}
