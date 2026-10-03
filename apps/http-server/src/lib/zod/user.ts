import { z } from "zod";

const signInSchema = z.object({
  email: z.email().min(1).max(255),
  password: z.string().min(6).max(255),
});

const signUpSchema = z.object({
  email: z.email().min(1).max(255),
  password: z.string().min(6).max(255),
});

export { signInSchema, signUpSchema };
