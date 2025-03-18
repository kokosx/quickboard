//NOT IN USE

import { Bell, Bookmark, Home, Mail, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const _LayoutSideBar = () => {
  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] md:block">
      <nav className="grid gap-2 text-sm font-medium">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <Mail className="h-5 w-5" />
          <span>Messages</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <Bookmark className="h-5 w-5" />
          <span>Bookmarks</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
      </nav>
    </aside>
  );
};

export default _LayoutSideBar;
