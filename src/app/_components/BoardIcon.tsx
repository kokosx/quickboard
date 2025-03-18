import {
  Briefcase,
  Film,
  FlaskRound,
  Gamepad2,
  GraduationCap,
  Heart,
  PcCase,
  Plane,
  Trophy,
  Vote,
} from "lucide-react";

import { type ReactNode } from "react";

export const boardIcons: Record<string, ReactNode> = {
  Technology: <PcCase />,
  Politics: <Vote />,
  Sports: <Trophy />,
  Gaming: <Gamepad2 />,
  Science: <FlaskRound />,
  Entertainment: <Film />,
  Business: <Briefcase />,
  Health: <Heart />,
  Education: <GraduationCap />,
  Travel: <Plane />,
};
const BoardIcon = ({ name }: { name: string }) => {
  return boardIcons[name];
};

export default BoardIcon;
