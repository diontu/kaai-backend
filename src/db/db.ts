import { drizzle } from "drizzle-orm/mysql2";

// Initialize the Drizzle connection once
const db = drizzle(process.env.DATABASE_URL!);

export default db;
