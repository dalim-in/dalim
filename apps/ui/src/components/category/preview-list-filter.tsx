import React from "react";
import ColumnsFilter from "./columns-filter";
import PreviewListSearch from "./preview-list-search";
import CategoryFilter from "./category-filter";

const PreviewListFilter = () => {
  return (
    <div className="flex items-end justify-between">
      <div className="flex items-end gap-2">
        <CategoryFilter />
        <PreviewListSearch />
      </div>
      <ColumnsFilter />
    </div>
  );
};

export default PreviewListFilter;
