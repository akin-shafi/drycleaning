// models/schedule.js
import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db.js"; // Ensure this path is correct

class Service extends Model {}

Service.init(
	{
		heading: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		file: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Service",
		timestamps: false, // Disable timestamps
	}
);

export default Service;