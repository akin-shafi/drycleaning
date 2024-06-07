// // models/index.js
// import Sequelize from "sequelize";
// import config from "../config/config.json"; // Update with your config specifics
// import User from "./User";
// import Customer from "./Customer";
// import Schedule from "./Schedule"; // Import the Schedule model
// import Message from "./Message"; // Import the Message model

// const sequelize = new Sequelize(
// 	config.database,
// 	config.username,
// 	config.password,
// 	config
// );

// const models = {
// 	User: User.init(sequelize, Sequelize),
// 	Customer: Customer.init(sequelize, Sequelize),
// 	Schedule: Schedule.init(sequelize, Sequelize),
// 	Message: Message.init(sequelize, Sequelize),
// 	// Add other models here
// };

// Object.keys(models).forEach((modelName) => {
// 	if (models[modelName].associate) {
// 		models[modelName].associate(models);
// 	}
// });

// export { sequelize };
// export default models;

"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
