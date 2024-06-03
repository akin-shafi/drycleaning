import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import Menu from "../../components/Menu";
// import TopMenu from "../../components/top-menu";
import Link from "next/link";
function UserById({ user }) {
	const router = useRouter();

	if (router.isFallback) {
		return <h1 className="text-white"> Loading... </h1>;
	}

	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				{/* <TopMenu /> */}
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							<div
								className="card"
								style={{ width: "18rem" }}>
								<div className="card-body text-white">
									<h5 className="card-title">{user.name}</h5>
									<p className="card-text">
										{user.phone} {user.email}
									</p>

									<Link
										href="/users"
										className="btn btn-md btn-brand">
										<i className="ti ti-arrow-left me-2"></i> Go Back
									</Link>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
export default UserById;

export async function getStaticProps(context) {
	const { params } = context;
	const response = await fetch(
		`${process.env.NEXT_APP_API_DB}/users/${params.userId}`
	);
	const data = await response.json();

	if (!data.id) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			user: data,
		},
	};
}

export async function getStaticPaths() {
	// const response = await fetch(`${process.env.NEXT_APP_API}/users`);
	// const data = await response.json();
	// const paths = data.map((user) => {
	// 	return { params: { userId: `${user.id}` } }; // The 'id' here
	// });
	// return {
	// 	paths,
	// 	fallback: true,
	// };

	return {
		paths: [
			{
				params: { userId: "1" },
			},
		],
		fallback: true,
	};
}
