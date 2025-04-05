"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddSearchParam } from "../../lib/hooks/useAddSearchParam";

const PostSorting = () => {
  const { currentSort, handleSortChange } = useAddSearchParam("sort", "newest");

  return (
    <Select onValueChange={handleSortChange} defaultValue={currentSort}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Browse by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="most-popular">
          <div>Popularity</div>
        </SelectItem>
        <SelectItem value="newest">
          <div>Newest</div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PostSorting;
