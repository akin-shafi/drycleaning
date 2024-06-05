import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../utils/db.js";

class User extends Model {
	// Add methods if needed
}

User.init(
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
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: "User",
		hooks: {
			beforeCreate: async (user) => {
				if (user.password) {
					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
			beforeUpdate: async (user) => {
				if (user.changed("password")) {
					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
		},
		timestamps: true,
	}
);

export default User;
