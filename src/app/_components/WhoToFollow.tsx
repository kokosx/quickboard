import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const WhoToFollow = () => {
  return (
    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold">Who to follow</h2>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="@user"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @johndoe
              </div>
            </div>
          </div>
          <Button className="rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Follow
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="@user"
              />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Alice Smith</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @alicesmith
              </div>
            </div>
          </div>
          <Button className="rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Follow
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="@user"
              />
              <AvatarFallback>RJ</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Robert Johnson</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @robertjohnson
              </div>
            </div>
          </div>
          <Button className="rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Follow
          </Button>
        </div>
      </div>
      <Button variant="link" className="mt-2 text-sm text-blue-500">
        Show more
      </Button>
    </div>
  );
};

export default WhoToFollow;
