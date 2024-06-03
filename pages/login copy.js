import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, getCsrfToken } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function Login({ csrfToken }) {
	const router = useRouter();
	const { message } = router.query;

	const handleSignInWithGit = async (e) => {
		e.preventDefault();
		await signIn("github", { callbackUrl: "/dashboard" });
	};

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// try {
		// 	const response = await fetch("/api/login", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(formData),
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error("Network response was not ok");
		// 	}

		// 	const result = await response.json();
		// 	console.log("Login successful:", result);
		// 	// Handle successful login here, such as redirecting to a dashboard
		// } catch (error) {
		// 	console.error("Error during login:", error);
		// 	// Handle the error appropriately in your UI
		// }
	};
	return (
		<>
			<section className="py-3 py-md-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
							<div className="rounded-3 shadow-sm">
								<div className="card-body p-1">
									<div className="text-center mb-3">
										<Link href="/login">
											<Image
												src="/images/logo.png"
												alt="Logo"
												width={175}
												height={120}
											/>
										</Link>
									</div>
									<div className="my-4">
										<div className="">
											{message === "timeout" && (
												<div
													className="alert alert-light"
													style={{ color: "red" }}>
													You have been timed out due to inactivity. Please log
													in again.
												</div>
											)}
											<div className="d-flex justify-content-center ">
												<button
													className="btn btn-outline-light"
													onClick={handleSignInWithGit}>
													Sign in with GitHub
												</button>
											</div>
										</div>
									</div>
									<h2 className="text-center text-muted">Login</h2>
									<h2 className="fs-6 fw-normal text-center text-secondary mb-4">
										Fill in your details correctly login
									</h2>

									<form
										method="post"
										className=""
										action="/api/auth/callback/credentials">
										<input
											name="csrfToken"
											type="hidden"
											defaultValue={csrfToken}
										/>
										<div className="mb-3">
											<div className="form-floating mb-3">
												<input
													type="email"
													className="form-control"
													name="email"
													id="email"
													placeholder="name@example.com"
													value={formData.email}
													onChange={handleChange}
													required
												/>
												<label
													htmlFor="email"
													className="form-label">
													Email
												</label>
											</div>
										</div>
										<div className="mb-3">
											<div className="form-floating mb-3">
												<input
													type="password"
													className="form-control"
													name="password"
													id="password"
													placeholder="Password"
													value={formData.password}
													onChange={handleChange}
													required
												/>
												<label
													htmlFor="password"
													className="form-label">
													Password
												</label>
											</div>
										</div>
										<div className="mb-3">
											<div className="d-flex gap-2 justify-content-between">
												<div className="form-check">
													<input
														className="form-check-input"
														type="checkbox"
														name="rememberMe"
														id="rememberMe"
														checked={formData.rememberMe}
														onChange={handleChange}
													/>
													<label
														className="form-check-label text-secondary"
														htmlFor="rememberMe">
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
										<div className="mb-3">
											<div className="d-grid my-3">
												<button
													className="btn btn-brand btn-lg"
													type="submit">
													Log in
												</button>
											</div>
										</div>

										<div className="mb-3">
											<p className="m-0 text-secondary text-center">
												Don't have an account ?{" "}
												<Link
													href="/signup"
													className="link-brand text-decoration-none">
													Sign up
												</Link>
											</p>
										</div>
										<div className="mt-3 d-flex justify-content-center">
											<Link
												href="/"
												className="btn btn-outline-brand">
												Go to Site
											</Link>
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

export async function getServerSideProps(context) {
	const csrfToken = await getCsrfToken(context);
	return {
		props: {
			csrfToken: csrfToken || null, // Return null if csrfToken is undefined
		},
	};
}
