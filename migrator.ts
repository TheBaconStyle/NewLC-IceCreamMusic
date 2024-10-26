import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { db } from "./db";

migrate(db, {
  migrationsFolder: path.join(__dirname, "migrations"),
});
