import { Sequelize } from "sequelize";
import dotenv from "dotenv";
const { config } = dotenv;

config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
    retry: {
      max: 5,
      backoffBase: 1000,
      backoffExponent: 1.1,
    },
    logging: console.log, // Add logging to see SQL queries
  }
);

export default sequelize;
