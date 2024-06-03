import {
	fetchMessageById,
	updateMessage,
	deleteMessage,
} from "../../../lib/messages";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const messages = await fetchMessageById(id);
			if (!messages) {
				return res.status(404).json({ error: "messages not found" });
			}
			return res.status(200).json(messages);
		} else if (req.method === "PUT") {
			const messages = req.body;
			const updatedMessage = await updateMessage(id, messages);
			return res.status(200).json(updatedMessage);
		} else if (req.method === "DELETE") {
			await deleteMessage(id);
			return res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
