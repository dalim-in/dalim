import { ReactNode } from "react";

const BlockPreviewLayout = ({ children }: { children: ReactNode }) => {
  return <div className="block-preview-wrapper -mx-6">
    {children}
    </div>;
};

export default BlockPreviewLayout;
