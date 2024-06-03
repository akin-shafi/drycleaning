const pool = require("../db");

async function fetchAllServices() {
	const [rows] = await pool.query("SELECT * FROM services");
	return rows;
}

async function fetchServiceById(id) {
	const [rows] = await pool.query("SELECT * FROM services WHERE id = ?", [id]);
	return rows[0];
}

async function createService(service) {
	const [existingService] = await pool.query(
		"SELECT * FROM services WHERE heading = ?",
		[service.heading]
	);
	if (existingService.length > 0) {
		throw new Error("Heading already exists");
	}

	const [result] = await pool.query(
		"INSERT INTO services (heading, text, file) VALUES (?, ?, ?, ?, ?)",
		[
			service.heading,
			service.text,
			service.file,
		]
	);

	return { id: result.insertId, ...service };
}

async function updateService(id, service) {
	const [existingService] = await pool.query(
		"SELECT * FROM services WHERE id = ?",
		[id]
	);
	if (existingService.length === 0) {
		throw new Error("service not found");
	}

	await pool.query(
		"UPDATE services SET heading = ?, text = ?, file = ? WHERE id = ?",
		[
			service.heading,
			service.text,
			service.file,
			id,
		]
	);

	return { id, ...service };
}

async function deleteService(id) {
	const [existingService] = await pool.query(
		"SELECT * FROM services WHERE id = ?",
		[id]
	);
	if (existingService.length === 0) {
		throw new Error("Service not found");
	}

	await pool.query("DELETE FROM services WHERE id = ?", [id]);
}

module.exports = {
	fetchAllServices,
	fetchServiceById,
	createService,
	updateService,
	deleteService,
};
