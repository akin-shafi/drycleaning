import { fetchAllSchedules, createSchedule } from "../../../lib/schedules";

export default async function handler(req, res) {
	try {
		if (req.method === "GET") {
			const schedules = await fetchAllSchedules();
			return res.status(200).json(schedules);
		} else if (req.method === "POST") {
			const service = req.body;
			const newService = await createSchedule(service);
			return res.status(201).json(newService);
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
