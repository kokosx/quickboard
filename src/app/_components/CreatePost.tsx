import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const CreatePost = () => {
  return (
    <div className="flex gap-4 border-b pb-4 dark:border-gray-800">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Input
          className="mb-2 border-none bg-transparent p-0 text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 dark:placeholder:text-gray-400"
          placeholder="What's happening?"
        />
        <div className="flex justify-between">
          <div className="-ml-2 flex">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-blue-500"
            >
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
                className="h-5 w-5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="sr-only">Add Image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-blue-500"
            >
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
                className="h-5 w-5"
              >
                <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                <path d="M8 9a2 2 0 1 1 4 0c0 1.5-.5 2-2 3" />
                <path d="M10 15h.01" />
              </svg>
              <span className="sr-only">Add Poll</span>
            </Button>
          </div>
          <Button className="rounded-full bg-blue-500 px-4 font-medium text-white hover:bg-blue-600">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
