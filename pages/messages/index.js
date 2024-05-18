import { useState, useEffect } from "react";
import Menu from "../../components/sidebar-menu";
import TopMenu from "../../components/top-menu";
import Link from "next/link";
// import { TabContent } from "react-bootstrap";
import { useRouter } from "next/router";

function MessageList({ messages }) {
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();
	const [messagesPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [filteredMessages, setFilteredMessages] = useState(messages);

	useEffect(() => {
		setFilteredMessages(
			messages.filter(
				(message) =>
					message.name.toLowerCase().includes(search.toLowerCase()) ||
					message.email.toLowerCase().includes(search.toLowerCase()) ||
					message.phone.includes(search) ||
					message.subject.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search, messages]);

	// Get current messages
	const indexOfLastMessage = currentPage * messagesPerPage;
	const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
	const currentMessages = filteredMessages.slice(
		indexOfFirstMessage,
		indexOfLastMessage
	);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Calculate total pages for pagination
	const pageNumbers = [];
	for (
		let i = 1;
		i <= Math.ceil(filteredMessages.length / messagesPerPage);
		i++
	) {
		pageNumbers.push(i);
	}

	const fetchSubject = async () => {
		const response = await fetch(
			`http://localhost:4000/messages?subject=Correction`
		);
		const data = await response.json();
		setFilteredMessages(data);
		router.push("/messages?category=Correction", undefined, { shallow: true });
	};

	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				<TopMenu />
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							<button
								className="btn btn-sm btn-brand mb-4"
								onClick={fetchSubject}>
								Correction
							</button>
							<div className="card ">
								<div className="d-flex justify-content-between">
									<h5 className="mb-0 text-white p-4">
										Messages ({filteredMessages.length})
									</h5>
									<div className=" p-4">
										<input
											type="text"
											className="form-control"
											placeholder="Search messages..."
											value={search}
											onChange={(e) => {
												setSearch(e.target.value);
												setCurrentPage(1); // Reset to first page on search
											}}
										/>
									</div>
								</div>
								<div className="table-responsive p-4">
									<table className="table">
										<thead>
											<tr>
												<th>SN</th>
												<th>Name</th>
												<th>Email</th>
												<th>Phone</th>
												<th>Subject</th>
											</tr>
										</thead>
										<tbody>
											{currentMessages.map((message, index) => (
												<tr key={message.id}>
													<td>{indexOfFirstMessage + index + 1}</td>
													<td>
														<Link
															className="link-brand"
															href={`messages/${message.id}`}
															passHref>
															{message.name}
														</Link>
													</td>
													<td>{message.email}</td>
													<td>{message.phone}</td>
													<td>{message.subject}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<nav className="p-3 d-flex justify-content-center">
									<ul className="pagination">
										{pageNumbers.map((number) => (
											<li
												key={number}
												className={`page-item ${
													currentPage === number ? "active" : ""
												}`}>
												<a
													onClick={() => paginate(number)}
													className="page-link">
													{number}
												</a>
											</li>
										))}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

export default MessageList;

export async function getServerSideProps(context) {
	const { query } = context;
	const { subject } = query;
	const queryString = subject ? `messages=Correction` : "";

	let api = process.env.NEXT_APP_API_LOCAL;

	const response = await fetch(`${api}/messages?${queryString}`);
	const data = await response.json();

	// console.log(data);
	return {
		props: {
			messages: data,
		},
	};
}
