import { z } from "zod";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const signUpSchema = z.object({
  username: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

const createRoomSchema = z.object({
  slug: z.string().min(3).max(20),
});

export { signInSchema, signUpSchema, createRoomSchema };
