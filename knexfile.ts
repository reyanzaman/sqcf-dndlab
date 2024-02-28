import type { Knex } from "knex";
require("dotenv").config({ paath: '.env.development' });

const config: Knex.Config = {
  client: "pg",
  connection: process.env.Database_URL,
  migrations: {
    extension: "ts",
  },
};

export default config;