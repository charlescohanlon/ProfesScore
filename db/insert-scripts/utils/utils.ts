import Mysql from "mysql";
import "dotenv";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export function createDBCon(): Mysql.Connection {
  return Mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: (process.env.DB_PASS as string).substring(1),
    database: "professcore",
    port: 3306,
  });
}
