import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import env from "@/env";

import * as authSchemas from "./schemas/auth-schema";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
const db = drizzle(pool, {
  logger: true,
  schema: {
    ...authSchemas,
  },
});

export default db;
