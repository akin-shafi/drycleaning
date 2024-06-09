// utils/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "mysql", // or 'mysql' or any other dialect you're using
	logging: false, // Disable logging
});

const connect = async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connected successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

export { sequelize, connect };
export default sequelize;
