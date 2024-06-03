import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import Menu from "../../components/Menu";
import Link from "next/link";
function MessageById({ message }) {
	const router = useRouter();

	if (router.isFallback) {
		return <h1 className="text-white"> Loading... </h1>;
	}

	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							<Link
								href="/messages"
								className="btn btn-md btn-brand mb-4">
								<i className="ti ti-arrow-left me-2"></i> Go Back
							</Link>

							<div className="card">
								<div className="card-body text-white">
									<div className="row ">
										<div className="col-12 d-flex justify-content-around">
											<div>
												<div>Name</div>
												<div>{message.name}</div>
											</div>

											<div>
												<div>Phone</div>
												<div>{message.phone}</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="card mt-4">
								<div className="card-body text-white">
									<h6>Subject: {message.subject}</h6>
									<h6>Body:</h6>
									<p>{message.body}</p>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
export default MessageById;

export async function getStaticProps(context) {
	const { params } = context;
	const response = await fetch(
		`${process.env.NEXT_APP_API_DB}/messages/${params.messageId}`
	);
	const data = await response.json();

	if (!data.id) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			message: data,
		},
	};
}

export async function getStaticPaths() {
	// const response = await fetch(`${process.env.NEXT_APP_API}/messages`);
	// const data = await response.json();
	// const paths = data.map((message) => {
	// 	return { params: { messageId: `${message.id}` } }; // The 'id' here
	// });
	// return {
	// 	paths,
	// 	fallback: true,
	// };

	return {
		paths: [
			{
				params: { messageId: "1" },
			},
		],
		fallback: true,
	};
}
