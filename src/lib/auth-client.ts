import { createAuthClient } from "better-auth/react";
import { env } from "../env";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL, // the base url of your auth server
  plugins: [
    inferAdditionalFields({
      user: {
        bio: {
          type: "string",
          defaultValue: "",
        },
      },
    }),
  ],
});

export type User = (typeof authClient.$Infer.Session)["user"];
