import {
	fetchServiceById,
	updateService,
	deleteService,
} from "../../../lib/services";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const service = await fetchServiceById(id);
			if (!service) {
				return res.status(404).json({ error: "Service not found" });
			}
			return res.status(200).json(service);
		} else if (req.method === "PUT") {
			const service = req.body;
			const updatedService = await updateService(id, service);
			return res.status(200).json(updatedService);
		} else if (req.method === "DELETE") {
			await deleteService(id);
			return res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
