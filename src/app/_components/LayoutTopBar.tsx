import { Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { getSession } from "../../lib/auth";
import AuthDrawer from "./AuthDrawer";

const LayoutTopBar = async () => {
  const s = await getSession();
  const user = s?.user;
  console.log(user);
  return (
    <div className="container sticky top-0 z-10 mx-auto border-b bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="#" className="flex items-center gap-2 font-semibold">
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
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="hidden md:inline-block">Twitter</span>
            </Link>
            <div className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search Twitter"
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
            {user ? (
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            ) : (
              <AuthDrawer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutTopBar;
