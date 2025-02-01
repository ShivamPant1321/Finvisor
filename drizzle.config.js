import { cwd } from "node:process";
import { config } from "dotenv";

// Load environment variables from .env file
config({ path: `${cwd()}/.env` });

export default {
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
};