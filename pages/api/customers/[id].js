import {
	fetchCustomerById,
	updateCustomer,
	deleteCustomer,
} from "../../../lib/customers";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const customer = await fetchCustomerById(id);
			if (!customer) {
				return res.status(404).json({ error: "Customer not found" });
			}
			return res.status(200).json(customer);
		} else if (req.method === "PUT") {
			const customer = req.body;
			const updatedCustomer = await updateCustomer(id, customer);
			return res.status(200).json(updatedCustomer);
		} else if (req.method === "DELETE") {
			await deleteCustomer(id);
			return res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
