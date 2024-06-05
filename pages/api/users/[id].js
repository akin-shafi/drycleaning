// pages/api/users/[id].js
import User from "@/models/User";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const user = await User.findByPk(id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.status(200).json(user);
		} else if (req.method === "PUT") {
			const updatedUser = await User.update(req.body, {
				where: { id: id },
				returning: true,
			});
			if (updatedUser[0] === 0) {
				return res.status(404).json({ error: "User not found" });
			}
			const updatedData = await User.findByPk(id);
			res.status(200).json(updatedData);
		} else if (req.method === "DELETE") {
			const result = await User.destroy({
				where: { id: id },
			});
			if (result === 0) {
				return res.status(404).json({ error: "User not found" });
			}
			res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
