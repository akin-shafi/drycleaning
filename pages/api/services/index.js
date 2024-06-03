import { fetchAllServices, createServices } from "../../../lib/services";

export default async function handler(req, res) {
	try {
		if (req.method === "GET") {
			const services = await fetchAllServices();
			return res.status(200).json(services);
		} else if (req.method === "POST") {
			const service = req.body;
			const newService = await createServices(service);
			return res.status(201).json(newService);
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
