"use client";
import { getHighlightedCodeNodes } from "@/src/lib/shiki";
import { Loader2Icon } from "lucide-react";
import { useLayoutEffect, useState, type JSX } from "react";

export function CodeBlock({
  initial,
  code,
}: {
  initial?: JSX.Element;
  code: string;
}) {
  const [nodes, setNodes] = useState(initial);

  useLayoutEffect(() => {
    getHighlightedCodeNodes(code).then(setNodes);
  }, [code]);

  return (
    nodes ?? (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2Icon className="animate-spin h-8 w-8" />
      </div>
    )
  );
}
