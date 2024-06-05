import User from "@/models/User";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const users = await User.findAll();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	// handle other methods similarly
	if (req.method === "POST") {
		try {
			const newUser = await User.create(req.body);
			res.status(201).json(newUser);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
