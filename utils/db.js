import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "mysql", // or 'mysql' or any other dialect you're using
	logging: true, // Disable logging
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

const connect = async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connected successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

const syncDatabase = async () => {
	try {
		await sequelize.sync({ alter: true }); // or any other sync options you need
		console.log("Database synchronized successfully.");
	} catch (error) {
		console.error("Error synchronizing the database:", error);
	}
};

export { sequelize, connect, syncDatabase };
export default sequelize;
