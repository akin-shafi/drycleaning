import { useState, useEffect } from "react";
import Menu from "../../components/sidebar-menu";
import TopMenu from "../../components/top-menu";
import Link from "next/link";
import { Modal, Button, Form } from "react-bootstrap";

function UserList({ users }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(users);

	const [isModalOpen, setModalOpen] = useState(false);
	const handleOpenModal = () => {
		setFirstName("");
		setLastName("");
		setUserEmail("");
		setUserPhone("");
		setUserAddress("");
		setModalOpen(true);
	};
	const handleCloseModal = () => setModalOpen(false);

	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const [userPhone, setUserPhone] = useState("");
	const [userAddress, setUserAddress] = useState("");

	const handleAddUser = async (event) => {
		event.preventDefault();
		const response = await fetch("/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email: userEmail,
			}),
		});

		if (response.ok) {
			setModalOpen(false);
			// Optionally reset form or refresh data
			setFirstName("");
			setUserEmail("");
			// Refresh users list if needed
		} else {
			alert("Failed to add user");
		}
	};
	const handleCloseEditUser = () => setShowModal(false);
	const handleEditUser = (user) => {
		setSelectedUser(user);
		setFirstName(user.first_name);
		setLastName(user.last_name);
		setUserEmail(user.email);
		setUserPhone(user.phone);
		setUserAddress(user.address);
		setShowModal(true);
	};

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		// Add logic to handle updating user data
		console.log(
			"Updating user:",
			selectedUser.id,
			firstName,
			lastName,
			userEmail,
			userPhone,
			userAddress
		);
		setShowModal(false);
	};

	const handleDeleteUser = (userId) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			// Here, simulate the deletion logic
			const updatedUsers = filteredUsers.filter((user) => user.id !== userId);
			setFilteredUsers(updatedUsers);
			// Typically, here you would also send a request to the backend to delete the user
			console.log("user deleted:", userId);
		}
	};

	useEffect(() => {
		setFilteredUsers(
			users.filter(
				(user) =>
					user.first_name.toLowerCase().includes(search.toLowerCase()) ||
					user.last_name.toLowerCase().includes(search.toLowerCase()) ||
					user.email.toLowerCase().includes(search.toLowerCase()) ||
					user.phone.includes(search) ||
					user.address.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search, users]);

	// Get current users
	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Calculate total pages for pagination
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				<TopMenu />
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							<div className="d-flex justify-content-end m-2">
								<button
									className="btn btn-sm btn-brand"
									onClick={handleOpenModal}>
									<i className="ti ti-plus me-2"></i> Add user
								</button>
							</div>
							<div className="card ">
								<div className="d-flex justify-content-between">
									<h5 className="mb-0 text-white p-4">
										users ({filteredUsers.length})
									</h5>
									<div className=" p-4">
										<input
											type="text"
											className="form-control"
											placeholder="Search users..."
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
												{/* <th>Address</th> */}
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{currentUsers.map((user, index) => (
												<tr key={user.id}>
													<td>{indexOfFirstUser + index + 1}</td>
													<td>
														<Link
															className="link-brand"
															href={`users/${user.id}`}
															passHref>
															{user.first_name} {user.last_name}
														</Link>
													</td>
													<td>{user.email}</td>
													<td>{user.phone}</td>
													{/* <td>{user.address}</td> */}
													<td>
														<div className="btn-group">
															<button
																className="btn btn-sm btn-outline-warning"
																onClick={() => handleEditUser(user)}>
																<i className="ti ti-edit"></i>
															</button>
															<button
																className="btn btn-sm btn-danger ml-2"
																onClick={() => handleDeleteUser(user.id)}>
																<i className="ti ti-trash"></i>
															</button>
														</div>
													</td>
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

			<Modal
				className="text-white"
				size=""
				show={isModalOpen}
				onHide={() => setModalOpen(false)}
				backdrop="static">
				<Modal.Header closeButton={false}>
					<Modal.Title id="main-modal-title">Add new user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						onSubmit={handleAddUser}
						className="row">
						<div className="col-6 form-group mb-2">
							<label className="control-label">First Name:</label>
							<input
								className="form-control"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="Enter name"
							/>
						</div>
						<div className="col-6 form-group mb-2">
							<label className="control-label">Last Name:</label>
							<input
								className="form-control"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Enter name"
							/>
						</div>
						<div className="col-6 form-group mb-2">
							<label className="control-label">Email:</label>
							<input
								className="form-control"
								type="email"
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
								placeholder="Enter email"
							/>
						</div>
						<div className="col-6 form-group mb-2">
							<label className="control-label">Phone:</label>
							<input
								className="form-control"
								type="tel"
								value={userPhone}
								onChange={(e) => setUserPhone(e.target.value)}
								placeholder="Enter phone"
							/>
						</div>
						<div className="col-12 form-group mb-2">
							<label className="control-label">Address:</label>
							<input
								className="form-control"
								type="text"
								value={userAddress}
								onChange={(e) => setUserAddress(e.target.value)}
								placeholder="Enter address"
							/>
						</div>

						<div className="mt-2 d-flex justify-content-center">
							<button
								type="button"
								className="btn btn-secondary me-4"
								onClick={handleCloseModal}>
								cancel
							</button>

							<button
								type="submit"
								className="btn btn-brand ">
								Add
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
			{/* Edit user */}
			<Modal
				className="text-white"
				show={showModal}
				backdrop="static"
				onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleUpdateUser}>
						<Form.Group controlId="formFirstName">
							<Form.Label>First Name:</Form.Label>
							<Form.Control
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formLastName">
							<Form.Label>Last Name:</Form.Label>
							<Form.Control
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formPhone">
							<Form.Label>Phone:</Form.Label>
							<Form.Control
								type="tel"
								value={userPhone}
								onChange={(e) => setUserPhone(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formAddress">
							<Form.Label>Address:</Form.Label>
							<Form.Control
								type="text"
								value={userAddress}
								onChange={(e) => setUserAddress(e.target.value)}
							/>
						</Form.Group>
						<div className="mt-4 d-flex justify-content-center">
							<button
								type="button"
								variant="primary"
								className="btn btn-secondary  me-3"
								onClick={handleCloseEditUser}>
								Cancel
							</button>
							<button
								variant="primary"
								className="btn btn-brand"
								type="submit">
								Save
							</button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default UserList;

export async function getServerSideProps() {
	let api = process.env.NEXT_APP_API_LOCAL;

	const response = await fetch(`${api}/users`);
	const data = await response.json();

	// console.log(data);
	return {
		props: {
			users: data,
		},
	};
}
