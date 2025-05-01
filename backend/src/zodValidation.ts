import {z} from "zod";

export const usernameSchema  = z.string().min(3);
export const passwordSchema = z.string().min(3);