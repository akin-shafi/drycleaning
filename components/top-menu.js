import Link from "next/link";

function TopMenu() {
	return (
		<>
			<main className="page-content bg-light">
				<div className="top-header">
					<div className="header-bar d-flex justify-content-between">
						<div className="d-flex align-items-center">
							<Link
								href="#"
								className="logo-icon me-3">
								<img
									src="../images/logo-icon.png"
									height="30"
									className="small"
									alt=""
								/>
								<span className="big">
									<img
										src="../images/logo-dark.png"
										height="24"
										className="logo-light-mode"
										alt=""
									/>
									<img
										src="../images/logo-light.png"
										height="24"
										className="logo-dark-mode"
										alt=""
									/>
								</span>
							</Link>
							<Link
								id="close-sidebar"
								className="btn btn-icon btn-soft-light"
								href="#">
								<i className="ti ti-menu-2"></i>
							</Link>
						</div>

						<ul className="list-unstyled mb-0">
							<li className="list-inline-item mb-0">
								<Link
									href="#"
									data-bs-toggle="offcanvas"
									data-bs-target="#offcanvasRight"
									aria-controls="offcanvasRight">
									<div className="btn btn-icon btn-soft-light">
										<i className="ti ti-settings"></i>
									</div>
								</Link>
							</li>

							<li className="list-inline-item mb-0 ms-1">
								<div className="dropdown dropdown-primary">
									<button
										type="button"
										className="btn btn-icon btn-soft-light dropdown-toggle p-0"
										data-bs-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false">
										<i className="ti ti-bell"></i>
									</button>
									<span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
										<span className="visually-hidden">New alerts</span>
									</span>

									<div
										className="dropdown-menu dd-menu shadow rounded border-0 mt-3 p-0"
										style={{ height: "320px", width: "290px" }}>
										<div className="d-flex align-items-center justify-content-between p-3 border-bottom">
											<h6 className="mb-0 text-dark">Notifications</h6>
											<span className="badge bg-soft-danger rounded-pill">
												3
											</span>
										</div>
										<div className="p-3">
											<Link
												href="#!"
												className="dropdown-item features feature-primary key-feature p-0">
												<div className="d-flex align-items-center">
													<div className="icon text-center rounded-circle me-2">
														<i className="ti ti-shopping-cart"></i>
													</div>
													<div className="flex-1">
														<h6 className="mb-0 text-dark title">
															Order Complete
														</h6>
														<small className="text-muted">15 min ago</small>
													</div>
												</div>
											</Link>

											<Link
												href="#!"
												className="dropdown-item features feature-primary key-feature p-0 mt-3">
												<div className="d-flex align-items-center">
													<img
														src="../images/client/04.jpg"
														className="avatar avatar-md-sm rounded-circle border shadow me-2"
														alt=""
													/>
													<div className="flex-1">
														<h6 className="mb-0 text-dark title">
															<span className="fw-bold">Message</span> from Luis
														</h6>
														<small className="text-muted">1 hour ago</small>
													</div>
												</div>
											</Link>

											<Link
												href="#!"
												className="dropdown-item features feature-primary key-feature p-0 mt-3">
												<div className="d-flex align-items-center">
													<div className="icon text-center rounded-circle me-2">
														<i className="ti ti-currency-dollar"></i>
													</div>
													<div className="flex-1">
														<h6 className="mb-0 text-dark title">
															<span className="fw-bold">
																One Refund Request
															</span>
														</h6>
														<small className="text-muted">2 hour ago</small>
													</div>
												</div>
											</Link>

											<Link
												href="#!"
												className="dropdown-item features feature-primary key-feature p-0 mt-3">
												<div className="d-flex align-items-center">
													<div className="icon text-center rounded-circle me-2">
														<i className="ti ti-truck-delivery"></i>
													</div>
													<div className="flex-1">
														<h6 className="mb-0 text-dark title">
															Deliverd your Order
														</h6>
														<small className="text-muted">Yesterday</small>
													</div>
												</div>
											</Link>

											<Link
												href="#!"
												className="dropdown-item features feature-primary key-feature p-0 mt-3">
												<div className="d-flex align-items-center">
													<img
														src="../images/client/15.jpg"
														className="avatar avatar-md-sm rounded-circle border shadow me-2"
														alt=""
													/>
													<div className="flex-1">
														<h6 className="mb-0 text-dark title">
															<span className="fw-bold">Cally</span> started
															following you
														</h6>
														<small className="text-muted">2 days ago</small>
													</div>
												</div>
											</Link>
										</div>
									</div>
								</div>
							</li>

							<li className="list-inline-item mb-0 ms-1">
								<div className="dropdown dropdown-primary">
									<button
										type="button"
										className="btn btn-soft-light dropdown-toggle p-0"
										data-bs-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false">
										<img
											src="../images/client/05.jpg"
											className="avatar avatar-ex-small rounded"
											alt=""
										/>
									</button>
									<div
										className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3"
										style={{ minWidth: "200px" }}>
										<Link
											className="dropdown-item d-flex align-items-center text-dark pb-3"
											href="profile.html">
											<img
												src="../images/client/05.jpg"
												className="avatar avatar-md-sm rounded-circle border shadow"
												alt=""
											/>
											<div className="flex-1 ms-2">
												<span className="d-block">Cristina Julia</span>
												<small className="text-muted">UI / UX Designer</small>
											</div>
										</Link>
										<Link
											className="dropdown-item text-dark"
											href="index.html">
											<span className="mb-0 d-inline-block me-1">
												<i className="ti ti-home"></i>
											</span>
											Dashboard
										</Link>
										<Link
											className="dropdown-item text-dark"
											href="profile.html">
											<span className="mb-0 d-inline-block me-1">
												<i className="ti ti-settings"></i>
											</span>
											Profile
										</Link>
										<Link
											className="dropdown-item text-dark"
											href="email.html">
											<span className="mb-0 d-inline-block me-1">
												<i className="ti ti-mail"></i>
											</span>
											Email
										</Link>
										<div className="dropdown-divider border-top"></div>
										<Link
											className="dropdown-item text-dark"
											href="lock-screen.html">
											<span className="mb-0 d-inline-block me-1">
												<i className="ti ti-lock"></i>
											</span>
											Lockscreen
										</Link>
										<Link
											className="dropdown-item text-dark"
											href="login.html">
											<span className="mb-0 d-inline-block me-1">
												<i className="ti ti-logout"></i>
											</span>
											Logout
										</Link>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</>
	);
}

export default TopMenu;
