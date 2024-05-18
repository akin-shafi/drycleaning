import Link from "next/link";

function Login() {
	return (
		<>
			<section className="py-3 py-md-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
							<div className="rounded-3 shadow-sm">
								<div className="card-body p-3 p-md-4 p-xl-5">
									<div className="text-center mb-3">
										<Link href="/login">
											<img
												src="../logo.png"
												alt="BootstrapBrain Logo"
												width="175"
											/>
										</Link>
									</div>
									<h2 className="text-center text-light">Login</h2>
									<h2 className="fs-6 fw-normal text-center text-secondary mb-4">
										Fill in your details correctly login
									</h2>
									<form action="">
										<div className="row gy-2 overflow-hidden">
											<div className="col-12">
												<div className="form-floating mb-3">
													<input
														type="email"
														className="form-control"
														name="email"
														id="email"
														placeholder="name@example.com"
														required
													/>
													<label
														for="email"
														className="form-label">
														Email
													</label>
												</div>
											</div>
											<div className="col-12">
												<div className="form-floating mb-3">
													<input
														type="password"
														className="form-control"
														name="password"
														id="password"
														value=""
														placeholder="Password"
														required
													/>
													<label
														for="password"
														className="form-label">
														Password
													</label>
												</div>
											</div>
											<div className="col-12">
												<div className="d-flex gap-2 justify-content-between">
													<div className="form-check">
														<input
															className="form-check-input"
															type="checkbox"
															value=""
															name="rememberMe"
															id="rememberMe"
														/>
														<label
															className="form-check-label text-secondary"
															for="rememberMe">
															Keep me logged in
														</label>
													</div>
													<Link
														href="/forget-password"
														className="link-brand text-decoration-none">
														Forgot password?
													</Link>
												</div>
											</div>
											<div className="col-12">
												<div className="d-grid my-3">
													<button
														className="btn btn-brand btn-lg"
														type="submit">
														Log in
													</button>
												</div>
											</div>
											<div className="col-12">
												<p className="m-0 text-secondary text-center">
													Don't have an account?
													<Link
														href="/signup"
														className="link-brand text-decoration-none">
														Sign up
													</Link>
												</p>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Login;
