import { ReactNode } from "react"

const BlockPreviewLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-hidden">
      <div className="relative">{children}</div>
    </div>
  )
}

export default BlockPreviewLayout
