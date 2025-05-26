"use client";

import { Button } from "@dalim/core/ui/button";
import { Label } from "@dalim/core/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@dalim/core/ui/tooltip";
import { cn } from "@dalim/core/lib/utils";
import { Grid2X2, Grid3X3, Square } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const columns = [
  {
    icon: Square,
    label: "1 column",
    value: 1,
  },
  {
    icon: Grid2X2,
    label: "2 columns",
    value: 2,
  },
  {
    icon: Grid3X3,
    label: "3 columns",
    value: 3,
  },
];

const ColumnsFilter = () => {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const router = useRouter();
  const columnsPerRow = +(searchParams.get("columns") ?? 2);

  const handleColumnsChange = (columnsPerRow: number) => {
    const searchParams = new URLSearchParams(searchParamsString);
    searchParams.set("columns", columnsPerRow.toString());
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="hidden sm:block">
      <Label className="block">Columns</Label>
      <div className="mt-3 flex items-end gap-2">
        {columns.map((column) => (
          <Tooltip key={column.value}>
            <TooltipTrigger
              asChild
              className={cn({
                "hidden md:inline-flex": column.value === 3,
              })}
            >
              <Button
                variant={columnsPerRow === column.value ? "default" : "outline"}
                size="icon"
                onClick={() => handleColumnsChange(column.value)}
              >
                <column.icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{column.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ColumnsFilter;
