// utils/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "mysql",
});

// Synchronize the models with the database
sequelize.sync();

export default sequelize;
