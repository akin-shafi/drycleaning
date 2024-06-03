import { customersData } from "../../data/customersData";

export default function handler(req, res) {
	if (req.method === "GET") {
		res.status(200).json(customersData);
	} else if (req.method === "POST") {
		const customer = req.body;
		const newCustomer = {
			id: customersData.length + 1,
			first_name: customer.first_name,
			last_name: customer.last_name,
			email: customer.email,
			phone: customer.phone,
			address: customer.address,
		};
		customersData.push(newCustomer);
		res.status(201).json(newCustomer);
	} else if (req.method === "PUT") {
		const customer = req.body;
		const index = customersData.findIndex(
			(customer) => customer.id === Number(req.query.id)
		);
		customersData[index] = customer;
		res.status(200).json(customersData[index]);
	} else if (req.method === "DELETE") {
		const index = customersData.findIndex(
			(customer) => customer.id === Number(req.query.id)
		);
		customersData.splice(index, 1);
	}
}
