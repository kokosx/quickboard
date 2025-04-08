"use client";

import { type User } from "better-auth";
import { createContext, useContext, type ReactNode } from "react";

const userContext = createContext<User | undefined>(undefined);

type Props = {
  children: ReactNode;
  user: User | undefined;
};

export const useUser = () => {
  const user = useContext(userContext);
  return user;
};

const UserProvider = ({ children, user }: Props) => {
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserProvider;
