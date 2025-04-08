import { useState, useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";

type Props = {
  initialAvatar?: string | null;
  name: string;
  onSave?: (avatarUri: string | null) => void;
};

const AvatarEditor = ({ initialAvatar, name, onSave }: Props) => {
  // Initialize seed with initialAvatar if provided, otherwise random
  const [seed, setSeed] = useState<string>(
    () => initialAvatar ?? Math.random().toString(36).substring(2, 10),
  );

  // Track if we're in the avatar generation mode
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Generate avatar based on the current seed
  const generatedAvatar = useMemo(() => {
    return createAvatar(adventurer, {
      size: 128,
      seed: seed,
    }).toDataUri();
  }, [seed]);

  // Initialize avatarUri - if initialAvatar exists, use the generated avatar
  const [avatarUri, setAvatarUri] = useState<string | null>(
    initialAvatar ? generatedAvatar : null,
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setSeed(Math.random().toString(36).substring(2, 10));
  };

  const handleCancel = () => {
    setIsGenerating(false);
    // Restore the previous avatar state
    setSeed(initialAvatar ?? Math.random().toString(36).substring(2, 10));
    setAvatarUri(initialAvatar ? generatedAvatar : null);
  };

  const handleSave = () => {
    setAvatarUri(generatedAvatar);
    setIsGenerating(false);
    if (onSave) onSave(seed);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-20 w-20">
        {avatarUri || (isGenerating && generatedAvatar) ? (
          <AvatarImage
            src={isGenerating ? generatedAvatar : avatarUri!}
            alt={name}
          />
        ) : null}
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={handleGenerate}>
          {isGenerating
            ? "Generate New"
            : avatarUri
              ? "Change Avatar"
              : "Generate Avatar"}
        </Button>

        {isGenerating && (
          <>
            <Button type="button" variant="default" onClick={handleSave}>
              Save
            </Button>
            <Button type="button" variant="destructive" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}

        {!isGenerating && avatarUri && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setAvatarUri(null);
              if (onSave) onSave(null);
            }}
          >
            Remove Avatar
          </Button>
        )}
      </div>
    </div>
  );
};

export default AvatarEditor;
