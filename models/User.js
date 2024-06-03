// models/User.js
import { DataTypes } from "sequelize";
import sequelize from "@/utils/db";

const User = sequelize.define(
	"User",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: true,
	}
);

export default User;
