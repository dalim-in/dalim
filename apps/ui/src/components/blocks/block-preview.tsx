"use client"

import { useEffect, useRef } from "react"
import { blockScreens } from "@/src/lib/blocks"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@dalim/core/ui/resizable"
import { ImperativePanelHandle } from "react-resizable-panels"

import { useBlockContext } from "./block-provider" 

interface BlockPreviewProps {
  block: string // Make this dynamic instead of hardcoded
}

const BlockPreview = ({ block }: BlockPreviewProps) => {
  const resizablePanelRef = useRef<ImperativePanelHandle>(null)
  const { screenSize: selectedScreenSize } = useBlockContext()
  const blockScreen = blockScreens.find(
    ({ name }) => name === selectedScreenSize
  )

  useEffect(() => {
    if (resizablePanelRef.current && blockScreen?.size) {
      resizablePanelRef.current.resize(blockScreen.size)
    }
  }, [selectedScreenSize, blockScreen?.size])

  return (
    <div>
     
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel 
          ref={resizablePanelRef} 
          defaultSize={blockScreen?.size || 100} 
          minSize={30}
        >
          <div className="h-[700px] w-full overflow-auto rounded-lg border">
            <iframe
              src={`/blocks/${block}/preview`}
              height="100%"
              width="100%"
              title={`Preview of ${block}`}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="w-0" />
        <ResizablePanel defaultSize={0} className="pr-1.5" />
      </ResizablePanelGroup>
    </div>
  )
}


export default BlockPreview
