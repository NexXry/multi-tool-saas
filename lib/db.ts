import {
  mysqlTable,
  serial,
  text,
  varchar,
  datetime,
  int,
} from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);
