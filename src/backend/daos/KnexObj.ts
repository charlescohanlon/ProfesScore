import { Knex } from "knex";

class KnexObj {
  private static instance: Knex;

  static getInstance() {
    if (!this.instance) {
      this.instance = require("knex")({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        },
        pool: { min: 0, max: 10 },
      });
    }
    return this.instance;
  }
}

const knex = KnexObj.getInstance();

export default knex;
