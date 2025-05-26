// block-provider.tsx
"use client";

import {
  BlockFile,
  BlockScreenSize,
  BlockScreenSizeUnion,
} from "@/scripts/types";
import registry from "../../../registry.json";
import { createContext, ReactNode, useContext, useState } from "react";

const BlockContext = createContext<{
  activeFile: { path: string; target?: string };
  screenSize: BlockScreenSizeUnion;
  selectFile: (file: BlockFile) => void;
  setScreenSize: (screenSize: BlockScreenSize) => void;
} | null>(null);

export const BlockProvider = ({
  block,
  children,
}: {
  block: string;
  children: ReactNode;
}) => {
  const blockDetails = registry.items.find((item) => item.name === block);
  if (!blockDetails) {
    throw new Error(`Block '${block}' not found`);
  }

  const { files } = blockDetails;
  const [activeFile, setActiveFile] = useState<BlockFile>({
    path: files[0].path.replace(`registry/default/blocks/${block}/`, ""),
     
  });
  const [screenSize, setScreenSize] = useState<BlockScreenSizeUnion>("desktop");

  return (
    <BlockContext.Provider
      value={{
        activeFile,
        screenSize,
        setScreenSize,
        selectFile: setActiveFile,
      }}
    >
      {children}
    </BlockContext.Provider>
  );
};

export const useBlockContext = () => {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error("useBlockContext must be used within a BlockProvider.");
  }
  return context;
};

