import { url, signIn } from "next-auth";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const session = await getSession();
			if (session) {
				return res.json(session);
			} else {
				// If no session exists, try to log in
				await signIn("credentials", {
					email: req.body.email,
					password: req.body.password,
					callbackUrl: "/",
				});
				const newSession = await getSession();
				return res.json(newSession);
			}
		} catch (error) {
			console.error("Error fetching session:", error);
			return res.status(500).json({ error: "Failed to fetch session" });
		}
	} else {
		return res.status(405).json({ error: "Method not allowed" });
	}
}

export async function getSession() {
	try {
		const apiUrl = url("/api/auth/session");
		const response = await fetch(apiUrl, {
			method: "GET",
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error("Failed to fetch session");
		}
		const session = await response.json();
		// Ensure session data is in expected format
		if (!session || typeof session !== "object") {
			throw new Error("Session data is not in expected format");
		}
		return session;
	} catch (error) {
		console.error("Error fetching session:", error);
		return null;
	}
}
