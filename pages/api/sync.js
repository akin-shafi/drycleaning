import { syncDatabase } from "@/utils/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			await syncDatabase();
			res.status(200).json({ message: "Database synchronized successfully" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
