"use client";

import {
  BlockFile,
  BlockScreenSize,
  BlockScreenSizeUnion,
} from "@/scripts/types";
import { useParams } from "next/navigation";
import registry from "../../../registry.json";
import { createContext, ReactNode, useContext, useState } from "react";

const BlockContext = createContext<{
  activeFile: { path: string; target?: string };
  screenSize: BlockScreenSizeUnion;
  selectFile: (file: BlockFile) => void;
  setScreenSize: (screenSize: BlockScreenSize) => void;
}>({
  activeFile: { path: "" },
  screenSize: "desktop",
  selectFile: () => {},
  setScreenSize: () => {},
});

export const BlockProvider = ({ children }: { children: ReactNode }) => {
  const { block } = useParams();
  const blockDetails = registry.items.find((item) => item.name === block);

  if (!blockDetails) {
    throw new Error("Block not found");
  }

  const { files } = blockDetails as { files: BlockFile[] };
  const [activeFile, setActiveFile] = useState<BlockFile>({
    path: files[0].path.replace(`registry/default/blocks/${block}/`, ""),
    target: files[0].target,
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
