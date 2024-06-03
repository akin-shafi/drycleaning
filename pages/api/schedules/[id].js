import {
	fetchScheduleById,
	updateSchedule,
	deleteSchedule,
} from "../../../lib/schedules";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const schedule = await fetchScheduleById(id);
			if (!schedule) {
				return res.status(404).json({ error: "schedule not found" });
			}
			return res.status(200).json(schedule);
		} else if (req.method === "PUT") {
			const schedule = req.body;
			const updatedSchedule = await updateSchedule(id, schedule);
			return res.status(200).json(updatedSchedule);
		} else if (req.method === "DELETE") {
			await deleteSchedule(id);
			return res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
