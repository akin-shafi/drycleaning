// components/LoginStatus.js
import { useEffect, useState } from "react";
import { getSession } from "../utils/auth";

const LoginStatus = () => {
	const [session, setSession] = useState(null);

	useEffect(() => {
		async function fetchSession() {
			const sessionData = await getSession();
			setSession(sessionData);
		}

		fetchSession();
	}, []);

	if (!session) {
		return <div>User is not logged in</div>;
	}

	return <div>Welcome, {session.user.name}!</div>;
};

export default LoginStatus;
