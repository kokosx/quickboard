import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  amount: number;
};

const PostsLoading = ({ amount }: Props) => {
  return Array(amount)
    .fill(0)
    .map((_, i) => <Skeleton key={i} className="h-28 w-full" />);
};

export default PostsLoading;
