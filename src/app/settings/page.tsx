import React from "react";
import { getSession } from "../../lib/auth";
import UserSettingsForm from "../_components/user/UserSettingsForm";

const page = async () => {
  const s = await getSession();
  const user = s!.user;
  return <UserSettingsForm user={user} />;
};

export default page;
