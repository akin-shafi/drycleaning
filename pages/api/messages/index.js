import {
	fetchAllMessages,
	fetchMessagesBySubject,
	createMessage,
} from "../../../lib/messages";

export default async function handler(req, res) {
	const { subject } = req.query;
	console.log(req.query);
	try {
		if (req.method === "GET") {
			if (subject) {
				// Fetch messages by subject
				const messages = await fetchMessagesBySubject(subject);
				if (!messages || messages.length === 0) {
					return res.status(404).json({ error: "No messages found" });
				}
				return res.status(200).json(messages);
			} else {
				// Fetch all messages
				const messages = await fetchAllMessages();
				return res.status(200).json(messages);
			}
		} else if (req.method === "POST") {
			const message = req.body;
			const newMessage = await createMessage(message);
			return res.status(201).json(newMessage);
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
