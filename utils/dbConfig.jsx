import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { cwd } from "node:process";
import { config } from "dotenv"; // Import dotenv

// Load environment variables from .env file
config({ path: `${cwd()}/.env` });

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

export const db = drizzle(sql, { schema });