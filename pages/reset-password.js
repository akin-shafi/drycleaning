import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
export default function ResetPassword() {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [showSection, setShowSection] = useState(false);
	const router = useRouter();
	const { token } = router.query;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			setMessage("Passwords do not match");
			return;
		}
		try {
			const response = await axios.post("/api/reset-password", {
				token,
				newPassword,
			});
			setMessage(response.data.message);
			setShowSection(true);
		} catch (error) {
			setMessage(error.response.data.message);
		}
	};

	return (
		<>
			<section className="py-3 py-md-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-7 col-xxl-6">
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
									{!showSection && (
										<section>
											<h2 className="text-center text-white">
												Enter a New Password
											</h2>

											<form onSubmit={handleSubmit}>
												<div className="row gy-2 overflow-hidden">
													<div className="col-12">
														<div class="text-white">Enter password</div>
														<div className="form-floating mb-3">
															<input
																type="password"
																className="form-control"
																id="newPassword"
																value={newPassword}
																onChange={(e) => setNewPassword(e.target.value)}
																required
															/>
															<label
																htmlFor="password"
																className="form-label">
																password
															</label>
														</div>
													</div>

													<div className="col-12">
														<div class="text-white">Confirm password</div>
														<div className="form-floating mb-3">
															<input
																type="password"
																className="form-control"
																id="newPassword"
																value={confirmPassword}
																onChange={(e) =>
																	setConfirmPassword(e.target.value)
																}
																required
															/>
															<label
																htmlFor="password"
																className="form-label">
																Confirm password
															</label>
														</div>
													</div>

													<div className="col-12">
														<div className="d-grid my-3">
															<button
																className="btn btn-brand btn-lg"
																type="submit">
																Reset Password
															</button>
														</div>
													</div>
												</div>
											</form>
											{message && (
												<p className="text-danger fs-18">{message}</p>
											)}

											<div className="col-12">
												<p className="m-0 text-secondary text-center">
													Back to{" "}
													<Link
														href="/forget-password"
														className="link-brand text-decoration-none">
														forget Password
													</Link>
												</p>
											</div>
										</section>
									)}
									{showSection && (
										<section className="section2">
											<h2 className="text-center text-white mb-4 fs-36">
												Password Reset successful
											</h2>
											<div className="text-muted fs-24">
												You can now login with your new password
											</div>
											<div className="my-3 text-center">
												<Link
													href="/login"
													className="btn btn-brand">
													Go to Login
												</Link>
											</div>
										</section>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
