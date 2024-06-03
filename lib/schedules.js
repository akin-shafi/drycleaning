const pool = require("../db");

async function fetchAllSchedules() {
	const [rows] = await pool.query("SELECT * FROM schedules");
	return rows;
}

async function fetchScheduleById(id) {
	const [rows] = await pool.query("SELECT * FROM schedules WHERE id = ?", [id]);
	return rows[0];
}

async function createSchedule(schedule) {
	const [existingSchedule] = await pool.query(
		"SELECT * FROM schedules WHERE phone = ?",
		[schedule.phone]
	);
	if (existingSchedule.length > 0) {
		throw new Error("phone already exists");
	}

	const [result] = await pool.query(
		"INSERT INTO schedules (name, phone, address, pickup_date, delivery_date) VALUES (?, ?, ?, ?, ?)",
		[
			schedule.name,
			schedule.phone,
			schedule.address,
			schedule.pickup_date,
			schedule.delivery_date,
		]
	);

	return { id: result.insertId, ...schedule };
}

async function updateSchedule(id, schedule) {
	const [existingSchedule] = await pool.query(
		"SELECT * FROM schedules WHERE id = ?",
		[id]
	);
	if (existingSchedule.length === 0) {
		throw new Error("schedule not found");
	}

	await pool.query(
		"UPDATE schedules SET name = ?, phone = ?, address = ?, pickup_date = ?, delivery_date = ? WHERE id = ?",
		[
			schedule.name,
			schedule.phone,
			schedule.address,
			schedule.pickup_date,
			schedule.delivery_date,
			id,
		]
	);

	return { id, ...schedule };
}

async function deleteSchedule(id) {
	const [existingSchedule] = await pool.query(
		"SELECT * FROM schedules WHERE id = ?",
		[id]
	);
	if (existingSchedule.length === 0) {
		throw new Error("schedule not found");
	}

	await pool.query("DELETE FROM schedules WHERE id = ?", [id]);
}

module.exports = {
	fetchAllSchedules,
	fetchScheduleById,
	createSchedule,
	updateSchedule,
	deleteSchedule,
};
