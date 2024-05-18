import Link from "next/link";

function Header() {
	return (
		<>
			<div className="header landing">
				<div class="container">
					<div class="row">
						<div class="col-xl-12">
							<div class="navigation">
								<nav class="navbar navbar-expand-lg navbar-light">
									<div class="brand-logo">
										<a href="index-2.html">
											<img
												src="../logo.png"
												alt=""
												width="90"
												class="logo-primary"
											/>
											<img
												src="images/logo.png"
												alt=""
												class="logo-white"
											/>
										</a>
									</div>
									<button
										class="navbar-toggler"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#navbarSupportedContent"
										aria-controls="navbarSupportedContent"
										aria-expanded="false"
										aria-label="Toggle navigation">
										<span class="navbar-toggler-icon"></span>
									</button>
									<div
										class="collapse navbar-collapse"
										id="navbarSupportedContent">
										<ul class="navbar-nav me-auto">
											<li class="nav-item dropdown">
												<Link
													class="nav-link"
													href="#home">
													Home
												</Link>
											</li>
											<li class="nav-item">
												<Link
													class="nav-link"
													href="#services">
													Services
												</Link>
											</li>
											<li class="nav-item">
												<Link
													class="nav-link"
													href="#about">
													About
												</Link>
											</li>
											<li class="nav-item">
												<a
													class="nav-link"
													href="#contact">
													Contact
												</a>
											</li>
										</ul>
									</div>
									<div class="signin-btn d-flex align-items-center">
										<div
											class="dark-light-toggle theme-switch"
											onclick="themeToggle()">
											<span class="dark">
												<i class="ri-moon-line"></i>
											</span>
											<span class="light">
												<i class="ri-sun-line"></i>
											</span>
										</div>

										{/* <button class="btn btn-brand me-2">
											Schedule a pickup
										</button> */}
										<Link
											class="btn btn-brand"
											href="/login">
											Login
										</Link>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
