import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import MessageComponent from "@/components/MessageComponent";

function Login() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const message = searchParams.get("message");
	const [error, setError] = useState("");

	const { data: session, status: sessionStatus } = useSession();

	useEffect(() => {
		if (sessionStatus === "authenticated") {
			router.push("/dashboard");
		}
	}, [sessionStatus, router]);

	const isValidEmail = (email) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		if (!isValidEmail(email)) {
			setError("Email is invalid");
			return;
		}

		if (!password || password.length < 8) {
			setError("Password is invalid");
			return;
		}

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (res?.error) {
			setError("Invalid email or password");
			if (res?.url) router.replace("/dashboard");
		} else {
			setError("");
		}
	};

	if (sessionStatus === "loading") {
		return <h1>Loading...</h1>;
	}

	return (
		// Your form markup remains the same

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
										<MessageComponent message={message} />
									</div>
								</div>
								<h2 className="text-center text-muted">Login</h2>
								<h2 className="fs-6 fw-normal text-center text-secondary mb-4">
									Fill in your details correctly login
								</h2>

								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<div className="text-muted">Email</div>
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
									<div className="mb-3">
										<div className="text-muted">Password</div>
										<div className="form-floating mb-3">
											<input
												type="password"
												className="form-control"
												name="password"
												id="password"
												placeholder="Password"
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
											<p className="text-danger mb-4">{error && error}</p>
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
									<div className="d-flex justify-content-center ">
										<button
											className="btn btn-outline-light me-3"
											onClick={() => {
												signIn("github");
											}}>
											Login in with GitHub
										</button>

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
	);
}

export default Login;
