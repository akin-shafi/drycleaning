import { fetchAllUsers, createUser } from "../../../lib/users";

export default async function handler(req, res) {
	try {
		if (req.method === "GET") {
			const users = await fetchAllUsers();
			return res.status(200).json(users);
		} else if (req.method === "POST") {
			const user = req.body;
			const newUser = await createUser(user);
			return res.status(201).json(newUser);
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
