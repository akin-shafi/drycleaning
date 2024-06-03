const pool = require("../db");
const bcrypt = require("bcryptjs");

async function fetchAllUsers() {
	const [rows] = await pool.query("SELECT * FROM users");
	return rows;
}

async function fetchUserById(id) {
	const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
	return rows[0];
}

async function createUser(user) {
	const [existingUsers] = await pool.query(
		"SELECT * FROM users WHERE email = ?",
		[user.email]
	);
	if (existingUsers.length > 0) {
		throw new Error("Email already exists");
	}

	// Hash the password before storing
	const hashedPassword = await bcrypt.hash(user.password, 10);

	const [result] = await pool.query(
		"INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)",
		[user.name, user.email, hashedPassword, user.image]
	);

	return { id: result.insertId, ...user, password: hashedPassword };
}

async function updateUser(id, user) {
	const [existingUsers] = await pool.query("SELECT * FROM users WHERE id = ?", [
		id,
	]);
	if (existingUsers.length === 0) {
		throw new Error("User not found");
	}

	// Hash the password before updating
	const hashedPassword = await bcrypt.hash(user.password, 10);

	await pool.query(
		"UPDATE users SET name = ?, email = ?, password = ?, image = ? WHERE id = ?",
		[user.name, user.email, hashedPassword, user.image, id]
	);

	return { id, ...user, password: hashedPassword };
}

async function deleteUser(id) {
	const [existingUsers] = await pool.query("SELECT * FROM users WHERE id = ?", [
		id,
	]);
	if (existingUsers.length === 0) {
		throw new Error("User not found");
	}

	await pool.query("DELETE FROM users WHERE id = ?", [id]);
}

module.exports = {
	fetchAllUsers,
	fetchUserById,
	createUser,
	updateUser,
	deleteUser,
};
