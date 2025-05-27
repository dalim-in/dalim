"use client";

import { getFileTree } from "@/src/lib/blocks";
import { BlockFile } from "@/scripts/types";
import { FileTree } from "./file-tree";
import { FilePreview } from "./file-preview";

const FileExplorer = ({ files }: { files: BlockFile[] }) => {
  const fileTree = getFileTree(files);

  return (
    <div className="border h-[800px] w-[300px] md:w-full flex flex-col md:flex-row rounded-lg overflow-hidden">
      <div className="w-full md:w-72 pb-6 shrink-0 bg-sidebar md:border-r">
        <div className="w-full h-14 flex items-center pl-4 pr-2 border-b">
          <b className="font-semibold uppercase text-sm tracking-wide">
            Explorer
          </b>
        </div>
        <FileTree files={fileTree} />
      </div>
      <FilePreview />
    </div>
  );
};

export default FileExplorer;
