import { Sequelize } from "sequelize";

const db = new Sequelize("upload_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

export default db;
