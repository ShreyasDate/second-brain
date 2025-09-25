import { z } from "zod";

export const emailSchema = z.string().email({ message: "Invalid email address" });
export const passwordSchema = z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password too long" });
export const nameSchema = z
    .string()
    .trim()
    .min(1, { message: "Name cannot be empty" })
    .max(50, { message: "Name too long" });