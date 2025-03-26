import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useAddSearchParam = (paramName: string, defaultValue: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the current sort value from URL or default to "newest"
  const currentSort = searchParams.get(paramName) ?? defaultValue;

  // Handle sort change
  const handleSortChange = (newValue: string) => {
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams);

    // Set the sort parameter
    params.set("sort", newValue);

    // Update the URL with the new query parameter
    router.push(`${pathname}?${params.toString()}`);

    // The page will automatically refetch data with the new URL
  };

  return { currentSort, handleSortChange };
};
