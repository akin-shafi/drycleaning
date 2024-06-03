import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import Menu from "../../components/Menu";
import Link from "next/link";
function CustomerById({ customer }) {
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
							<div
								className="card"
								style={{ width: "18rem" }}>
								<div className="card-body text-white">
									<h5 className="card-title">
										{customer.first_name} {customer.last_name}
									</h5>
									<p className="card-text">
										{customer.phone} {customer.email}
									</p>
									<p className="card-text">{customer.address}</p>
									<Link
										href="/customers"
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
export default CustomerById;

export async function getStaticProps(context) {
	const { params } = context;
	const response = await fetch(
		`${process.env.NEXT_APP_API_DB}/customers/${params.customerId}`
	);
	const data = await response.json();

	if (!data.id) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			customer: data,
		},
	};
}

export async function getStaticPaths() {
	// const response = await fetch(`${process.env.NEXT_APP_API}/customers`);
	// const data = await response.json();
	// const paths = data.map((customer) => {
	// 	return { params: { customerId: `${customer.id}` } }; // The 'id' here
	// });
	// return {
	// 	paths,
	// 	fallback: true,
	// };

	return {
		paths: [
			{
				params: { customerId: "1" },
			},
		],
		fallback: true,
	};
}
