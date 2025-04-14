import {
  Avatar as _Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useMemo } from "react";

type Props = {
  name?: string;
  image?: string | null;
};

const UserAvatar = ({ name, image }: Props) => {
  const generatedAvatar = useMemo(() => {
    return createAvatar(adventurer, {
      size: 128,
      seed: image ?? "",
    }).toDataUri();
  }, [image]);

  return (
    <_Avatar className="h-14 w-14">
      {image ? (
        <AvatarImage src={generatedAvatar} />
      ) : (
        <AvatarFallback>{(name ?? "U").charAt(0).toUpperCase()}</AvatarFallback>
      )}
    </_Avatar>
  );
};

export default UserAvatar;
