import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGO_URL = process.env.MONGO_URL as string;
export const PORT = process.env.PORT as string;