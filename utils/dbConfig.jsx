import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { config } from "dotenv"; // Import dotenv

// Load environment variables from .env file
// Using process.cwd() directly instead of calling unimported cwd function
config({ path: `${process.cwd()}/.env` });

const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

const sql = neon(dbUrl);

export const db = drizzle(sql, { schema });