"use client";

import { type Board } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BoardIcon from "./BoardIcon";

import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { XIcon } from "lucide-react";

type Props = {
  boards: Board[];
};

const BoardNavigation = ({ boards }: Props) => {
  const router = useRouter();

  return (
    <Select onValueChange={(e) => router.push(e == "/" ? "/" : `/board/${e}`)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a board to browse" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="/">
          <div
            onMouseOver={() => {
              router.prefetch(`/`);
            }}
            className="flex items-center gap-x-2"
          >
            All
          </div>
        </SelectItem>
        {boards.map((board) => (
          <SelectItem key={board.id} value={board.id}>
            <div
              onMouseOver={() => {
                router.prefetch(`/board/${board.id}`);
              }}
              className="flex items-center gap-x-2"
            >
              {board.name} <BoardIcon name={board.name} />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BoardNavigation;
