import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

// Read the SSL certificate
const sslCert = fs.readFileSync(
	path.resolve(__dirname, "/eu-west-3-bundle.pem")
);

// Configure Sequelize with individual parameters
const sequelize = new Sequelize({
	host: "laundryservice.cns2u24k06ic.eu-west-3.rds.amazonaws.com",
	username: "superadmin",
	password: "superadmin123",
	database: "washmaster",
	port: 3306,
	dialect: "mysql", // or 'mysql' if you're using MySQL
	dialectOptions: {
		ssl: {
			ca: sslCert,
		},
	},
	logging: true, // Enable logging
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
