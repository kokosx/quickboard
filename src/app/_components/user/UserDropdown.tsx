"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookmarkIcon,
  LogOutIcon,
  Settings,
  User2,
  UserIcon,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { authClient } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { revalidateAction } from "../../../server/actions/revalidate";
import Link from "next/link";

const UserDropdown = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          router.push("/");
          await revalidateAction("/", "layout");
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Profile <User2 />
        </DropdownMenuItem>

        <Link href="/settings">
          <DropdownMenuItem>
            Settings <Settings />
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          Bookmarks <BookmarkIcon />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}>
          Log out <LogOutIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
