import { blockList, categorizedBlocks } from "@/registry/default/blocks";
import { Badge } from "@dalim/core/ui/badge";
import { Button } from "@dalim/core/ui/button";
import {
  BLOCK_SCREENSHOT_HEIGHT,
  BLOCK_SCREENSHOT_WIDTH,
  getBlockScreenshot
} from "@/src/lib/blocks"; 
import { cn } from "@dalim/core/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 
import PreviewListFilter from "./preview-list-filter";
import { ResultsNotFound } from "./results-not-found";

interface BlockPreviewListProps {
  category?: string;
  columns?: string;
  q?: string;
}

const BlockPreviewList = ({ category, columns, q }: BlockPreviewListProps) => {
  const blocks = category ? categorizedBlocks[category] : blockList;
  const columnsPerRow = +(columns ?? 2);
  const query = q ?? "";

  const filteredBlocks = blocks.filter((block) => {
    const blockTitle = block.title.toLowerCase();

    return (
      blockTitle.includes(query) || block.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="">
      <PreviewListFilter />
      <div className="mt-4"> 
        <div className="pt-3">
          {filteredBlocks.length ? (
            <div
              className={cn("grid gap-6", {
                "md:grid-cols-1": columnsPerRow === 1,
                "md:grid-cols-2": columnsPerRow === 2,
                "md:grid-cols-2 lg:grid-cols-3 gap-8": columnsPerRow === 3,
              })}
            >
              {filteredBlocks.map((block) => (
                <div className="border p-2 rounded-3xl" key={block.title}>
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex pt-3 px-3 items-center gap-3">
                      <h2
                        className={cn("text-2xl font-bold", {
                          "text-xl": columnsPerRow === 3,
                        })}
                      >
                        {block.title}
                      </h2>
                      <Button
                        className={cn("h-7 w-8", {
                          "h-5 w-6": columnsPerRow === 3,
                        })}
                        variant="secondary"
                      >
                        <Link href={`/blocks/${block.name}`}>
                          <ExternalLinkIcon />
                        </Link>
                      </Button>
                    </div>
                    <Badge variant="secondary">{block.category}</Badge>
                  </div>

                  <Link className="group" href={`/blocks/${block.name}`}>
                    <div className="mt-3 w-full rounded-lg border overflow-hidden aspect-video">
                      <Image
                        height={BLOCK_SCREENSHOT_HEIGHT}
                        width={BLOCK_SCREENSHOT_WIDTH}
                        src={getBlockScreenshot(block.name)}
                        alt={block.title}
                        className="h-full w-full object-cover group-hover:scale-90 transition-transform"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <ResultsNotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockPreviewList;
