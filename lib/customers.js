const pool = require("../db");

async function fetchAllCustomers() {
	const [rows] = await pool.query("SELECT * FROM customers");
	return rows;
}

async function fetchCustomerById(id) {
	const [rows] = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
	return rows[0];
}

async function createCustomer(customer) {
	const [existingCustomer] = await pool.query(
		"SELECT * FROM customers WHERE email = ?",
		[customer.email]
	);
	if (existingCustomer.length > 0) {
		throw new Error("Email already exists");
	}

	const [result] = await pool.query(
		"INSERT INTO customers (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)",
		[
			customer.first_name,
			customer.last_name,
			customer.email,
			customer.phone,
			customer.address,
		]
	);

	return { id: result.insertId, ...customer };
}

async function updateCustomer(id, customer) {
	const [existingCustomer] = await pool.query(
		"SELECT * FROM customers WHERE id = ?",
		[id]
	);
	if (existingCustomer.length === 0) {
		throw new Error("Customer not found");
	}

	await pool.query(
		"UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
		[
			customer.first_name,
			customer.last_name,
			customer.email,
			customer.phone,
			customer.address,
			id,
		]
	);

	return { id, ...customer };
}

async function deleteCustomer(id) {
	const [existingCustomer] = await pool.query(
		"SELECT * FROM customers WHERE id = ?",
		[id]
	);
	if (existingCustomer.length === 0) {
		throw new Error("Customer not found");
	}

	await pool.query("DELETE FROM customers WHERE id = ?", [id]);
}

module.exports = {
	fetchAllCustomers,
	fetchCustomerById,
	createCustomer,
	updateCustomer,
	deleteCustomer,
};
