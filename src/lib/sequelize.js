import { Sequelize } from "sequelize";
import "oracledb";

const sequelize = new Sequelize(
  process.env.ORACLE_DATABASE,
  process.env.ORACLE_USER,
  process.env.ORACLE_PASSWORD,
  {
    host: process.env.ORACLE_HOST,
    port: process.env.ORACLE_PORT,
    dialect: "oracle",
  },
);

export default sequelize;
