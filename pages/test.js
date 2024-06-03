// pages/index.js
import LoginStatus from "../components/LoginStatus";

const HomePage = () => {
	return (
		<div className="text-muted">
			<h1>Home Page</h1>
			<LoginStatus />
		</div>
	);
};

export default HomePage;
