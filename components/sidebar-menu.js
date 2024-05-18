import Link from "next/link";

function SideBarMenu() {
	return (
		<>
			<nav
				id="sidebar"
				className="sidebar-wrapper sidebar-dark">
				<div className="sidebar-content text-white">
					<div className="sidebar-brand">
						<Link href="/dashboard/">
							<img
								src="../logo.png"
								width="100"
								className="logo-light-mode"
								alt=""
							/>
							<img
								src="../logo.png"
								width="100"
								className="logo-dark-mode"
								alt=""
							/>
							<span className="sidebar-colored">
								<img
									src="../logo.png"
									width="100"
									className="mt-4"
									alt=""
								/>
							</span>
						</Link>
					</div>

					<ul className="sidebar-menu">
						<li className="">
							<Link href="/dashboard/">
								<i className="ti ti-home me-2"></i>Dashboard
							</Link>
						</li>

						<li className="">
							<Link href="/customers/">
								<i className="ti ti-users me-2"></i>Customers
							</Link>
						</li>
						<li className="">
							<Link href="/schedules/">
								<i className="ti ti-motorbike me-2"></i>Scheduled Pickup
							</Link>
						</li>
						<li className="">
							<Link href="/messages/">
								<i className="ti ti-message me-2"></i>Messages
							</Link>
						</li>
						<li className="">
							<Link href="/users/">
								<i className="ti ti-user me-2"></i>Admins
							</Link>
						</li>
					</ul>
					{/* <!-- sidebar-menu  --> */}
				</div>
				{/* <!-- Sidebar Footer --> */}
				<ul className="sidebar-footer sidebar-menu mb-0">
					<li>
						<Link href="/">
							<i className="ti ti-logout me-2"></i> Log Out
							{/* <small className="text-muted fw-medium ms-1">Log Out</small> */}
						</Link>
					</li>
				</ul>
				{/* <!-- Sidebar Footer --> */}
			</nav>
		</>
	);
}

export default SideBarMenu;
