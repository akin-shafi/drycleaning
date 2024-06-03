import Link from "next/link";
import Image from "next/image";
function ForgetPassword() {
	return (
		<>
			<section className="py-3 py-md-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
							<div className="rounded-3 shadow-sm">
								<div className="card-body p-3 p-md-4 p-xl-5">
									<div className="text-center mb-3">
										<Link href="/forget-password">
											<Image
												src="/images/logo.png"
												alt="Logo"
												width={175}
												height={120}
											/>
										</Link>
									</div>
									<h2 className="text-center text-white">Reset Password</h2>

									<form action="#!">
										<div className="row gy-2 overflow-hidden">
											<div className="col-12">
												<div class="text-white">
													Enter email to reset password
												</div>
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
														htmlFor="email"
														className="form-label">
														Email
													</label>
												</div>
											</div>

											<div className="col-12">
												<div className="d-grid my-3">
													<button
														className="btn btn-brand btn-lg"
														type="submit">
														Continue
													</button>
												</div>
											</div>
											<div className="col-12">
												<p className="m-0 text-secondary text-center">
													Already have an account?
													<Link
														href="/login"
														className="link-brand text-decoration-none">
														Login
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

export default ForgetPassword;
