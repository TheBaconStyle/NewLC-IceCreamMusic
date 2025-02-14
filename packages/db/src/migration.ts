import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { db } from "./index";

migrate(db, {
  migrationsFolder: path.join(__dirname, "migrations"),
});
