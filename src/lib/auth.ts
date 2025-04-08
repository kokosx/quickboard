import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {
    additionalFields: {
      bio: {
        type: "string",
        defaultValue: "",
      },
    },
  },
});

export const getSession = async () => {
  return await getInnerSession(await headers());
};

export const getInnerSession = async (headers: ReadonlyHeaders) => {
  "use cache";
  return await auth.api.getSession({
    headers, // you need to pass the headers object.
  });
};
