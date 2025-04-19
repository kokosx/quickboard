import { z } from "zod";

const usernameSchema = z.string().min(3).max(15);

export const signupSchema = z
  .object({
    email: z.string().min(5).email(),
    password: z.string().min(3),
    passwordConfirmation: z.string(),
    name: usernameSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["password"],
  });

export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const editUserSchema = z.object({
  name: usernameSchema,
  bio: z.string().max(150).default(""),
  avatar: z.string().nullable(),
});

export const getUserInfoSchema = z.object({
  userId: z.string(),
});
