import React from "react";
import { Button } from "../../components/ui/button";

const TrendsForYou = () => {
  return (
    <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold">Trends for you</h2>
      <div className="grid gap-4">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Trending in Technology
          </div>
          <div className="font-medium">#WebDevelopment</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            5,128 Tweets
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Trending in Sports
          </div>
          <div className="font-medium">#Olympics2024</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            12,345 Tweets
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Trending in Music
          </div>
          <div className="font-medium">#NewAlbumRelease</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            8,765 Tweets
          </div>
        </div>
      </div>
      <Button variant="link" className="mt-2 text-sm text-blue-500">
        Show more
      </Button>
    </div>
  );
};

export default TrendsForYou;
