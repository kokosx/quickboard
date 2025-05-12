import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { getSession } from "../../../lib/auth";
import AuthDrawer from "../user/AuthDrawer";
import UserDropdown from "../user/UserDropdown";

const LayoutTopBar = async () => {
  const s = await getSession();
  const user = s?.user;
  return (
    <div className="container sticky top-0 z-10 mx-auto border-b bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-blue-500"
              >
                {/* Board outline */}
                <rect x="3" y="3" width="18" height="18" rx="2" />

                {/* Board sections/cards */}
                <rect x="6" y="6" width="5" height="4" rx="1" />
                <rect x="13" y="6" width="5" height="4" rx="1" />
                <rect x="6" y="14" width="5" height="4" rx="1" />
                <rect x="13" y="14" width="5" height="4" rx="1" />

                {/* Quick indicator - lightning bolt */}
                <path d="M12 3v2" />
                <path d="M12 19v2" />
              </svg>
              <span className="hidden md:inline-block">QuickBoard</span>
            </Link>
            <div className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search QuickBoard"
                  className="w-64 rounded-full bg-gray-100 pl-8 dark:bg-gray-800"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            {user ? <UserDropdown /> : <AuthDrawer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutTopBar;
