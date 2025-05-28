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
        <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
      </ResizablePanelGroup>
    </div>
  )
}

const BlockPreviewHome = ({ block }: BlockPreviewProps) => {
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
          <div className="h-[700px] w-full overflow-auto border">
            <iframe
              src={`/blocks/${block}/preview`}
              height="100%"
              width="100%"
              title={`Preview of ${block}`}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
      </ResizablePanelGroup>
    </div>
  )
}

export { BlockPreview, BlockPreviewHome }
