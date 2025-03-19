import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().min(5).email(),
    password: z.string().min(3),
    passwordConfirmation: z.string(),
    name: z.string().min(3).max(15),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["password"],
  });

export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});
