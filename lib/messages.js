const pool = require("../db");

async function fetchAllMessages() {
	const [rows] = await pool.query("SELECT * FROM messages");
	return rows;
}

async function fetchMessageById(id) {
	const [rows] = await pool.query("SELECT * FROM messages WHERE id = ?", [id]);
	return rows[0];
}

async function fetchMessagesBySubject(subject) {
	const [rows] = await pool.query("SELECT * FROM messages WHERE subject = ?", [
		subject,
	]);
	return rows;
}

async function createMessage(message) {
	const [existingMessage] = await pool.query(
		"SELECT * FROM messages WHERE name = ?",
		[message.name]
	);
	if (existingMessage.length > 0) {
		throw new Error("name already exists");
	}

	const [result] = await pool.query(
		"INSERT INTO messages (name, email, phone, subject, body) VALUES (?, ?, ?, ?, ?)",
		[message.name, message.email, message.phone, message.subject, message.body]
	);

	return { id: result.insertId, ...message };
}

async function updateMessage(id, message) {
	const [existingMessage] = await pool.query(
		"SELECT * FROM messages WHERE id = ?",
		[id]
	);
	if (existingMessage.length === 0) {
		throw new Error("message not found");
	}

	await pool.query(
		"UPDATE messages SET name = ?, email = ?, phone = ?, subject = ?, body = ? WHERE id = ?",
		[
			message.name,
			message.email,
			message.phone,
			message.subject,
			message.body,
			id,
		]
	);

	return { id, ...message };
}

async function deleteMessage(id) {
	const [existingMessage] = await pool.query(
		"SELECT * FROM messages WHERE id = ?",
		[id]
	);
	if (existingMessage.length === 0) {
		throw new Error("message not found");
	}

	await pool.query("DELETE FROM messages WHERE id = ?", [id]);
}

module.exports = {
	fetchAllMessages,
	fetchMessageById,
	fetchMessagesBySubject,
	createMessage,
	updateMessage,
	deleteMessage,
};
