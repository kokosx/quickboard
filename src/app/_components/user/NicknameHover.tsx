import { CalendarIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { type PostOutput } from "../../../server/api/trpc";
import { months } from "../../../lib/utils";

type Props = PostOutput["getNewest"][number]["createdByUser"];

export function NicknameHover({ bio, createdAt, id, image, name }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger href={`/user/${id}`}>
        <Button className="m-0 p-0" variant="link">
          {name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <UserAvatar image={image} name={name} />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-sm">{!bio || bio == "" ? "No bio yet" : bio}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {months[createdAt.getMonth()]} {createdAt.getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
