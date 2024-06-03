import { fetchAllCustomers, createCustomer } from "../../../lib/customers";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
	// const session = await getSession({ req });
	// if (!session) {
	// 	res.status(401).json({ error: "Unauthorized" });
	// } else {
	// 	res.status(200).json({ message: "Success", session });
	// }
	try {
		if (req.method === "GET") {
			const customers = await fetchAllCustomers();
			return res.status(200).json(customers);
		} else if (req.method === "POST") {
			const customer = req.body;
			const newCustomer = await createCustomer(customer);
			return res.status(201).json(newCustomer);
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
