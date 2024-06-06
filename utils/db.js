// utils/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "mysql",
});

// Synchronize the models with the database
sequelize
	.sync({ alter: true }) // Use `alter` cautiously, ideally in development only
	.then(() => {
		console.log("Database synced!");
	})
	.catch((error) => {
		console.error("Failed to sync database:", error);
	});

export default sequelize;
