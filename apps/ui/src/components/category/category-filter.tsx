"use client";

import { blockCategories } from "@/registry/default/blocks";
import { Label } from "@dalim/core/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@dalim/core/ui/select"; 
import { useParams, useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = () => {
  const { category = "all" } = useParams<{ category: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelect = (value: string) => {
    if (value === "all") {
      router.push(`/blocks?${searchParams.toString()}`);
      return;
    }

    router.push(`/blocks/categories/${value}?${searchParams.toString()}`);
  };

  return (
    <div>
      <Label>Category</Label>
      <Select value={category} onValueChange={handleSelect}>
        <SelectTrigger className="mt-2 w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="all">
              <div className="flex items-center gap-3">  
                <span>All</span>
              </div>
            </SelectItem>
            {blockCategories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                <div className="flex items-center gap-3"> 
                  <span className="capitalize">{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
