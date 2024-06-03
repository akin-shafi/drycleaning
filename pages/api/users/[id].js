import { fetchUserById, updateUser, deleteUser } from "../../../lib/users";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const user = await fetchUserById(id);
			if (!user) {
				return res.status(404).json({ error: "user not found" });
			}
			return res.status(200).json(user);
		} else if (req.method === "PUT") {
			const user = req.body;
			const updatedUser = await updateUser(id, user);
			return res.status(200).json(updatedUser);
		} else if (req.method === "DELETE") {
			await deleteUser(id);
			return res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
