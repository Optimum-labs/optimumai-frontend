import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "path";
import { config } from "dotenv";

// Load .env.local as override (Next.js convention)
config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
