import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import Menu from "../../components/sidebar-menu";
import TopMenu from "../../components/top-menu";
import Link from "next/link";
function ScheduleById({ schedule }) {
	const router = useRouter();

	if (router.isFallback) {
		return <h1 className="text-white"> Loading... </h1>;
	}

	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				<TopMenu />
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							<Link
								href="/schedules"
								className="btn btn-md btn-brand mb-4">
								<i className="ti ti-arrow-left me-2"></i> Go Back
							</Link>

							<div className="card">
								<div className="card-body text-white">
									<div className="row ">
										<div className="col-9 d-flex justify-content-around">
											<div>
												<div>Name</div>
												<div>{schedule.name}</div>
											</div>

											<div>
												<div>Phone</div>
												<div>{schedule.phone}</div>
											</div>

											<div>
												<div>Address</div>
												<div>{schedule.address}</div>
											</div>

											<div>
												<div>Pick-Up-date</div>
												<div>{schedule.pickup_date}</div>
											</div>
											<div>
												<div>Delivery-date</div>
												<div>{schedule.delivery_date}</div>
											</div>
										</div>
										<div className="col-3 d-flex justify-content-end align-items-center">
											<div className="bg-secondary btn">Pending</div>
										</div>
									</div>
								</div>
							</div>

							<div className="card mt-4">
								<div className="card-body text-white">
									<p>
										<h6>Messages</h6>
										<ul>
											<li>
												White Button-Up Shirt: Calvin Klein, Medium, Cotton,
												with faint stains.
											</li>
											<li>
												Dark Wash Jeans: Levi's, 32/32, Denim, moderately faded.
											</li>
											<li>
												Patterned Dress: Zara, Small, Polyester, with small
												stains on hem.
											</li>
											<li>
												Athletic Shorts: Nike, Large, Synthetic blend, heavily
												used with sweat stains.
											</li>
											<li>
												Cashmere Sweater: Ralph Lauren, Medium, Cashmere wool,
												with mild pilling.
											</li>
											<li>
												Silk Scarf: Hermès, Silk, with minor makeup stains.
											</li>
											<li>
												Cotton Pajamas: Target, Large, Cotton, with
												discoloration.
											</li>
											<li>
												Wool Coat: Burberry, 40R, Wool blend, with dust and lint
												buildup.
											</li>
										</ul>
									</p>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
export default ScheduleById;

export async function getStaticProps(context) {
	const { params } = context;
	const response = await fetch(
		`${process.env.NEXT_APP_API_LOCAL}/schedules/${params.scheduleId}`
	);
	const data = await response.json();

	if (!data.id) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			schedule: data,
		},
	};
}

export async function getStaticPaths() {
	// const response = await fetch(`${process.env.NEXT_APP_API}/schedules`);
	// const data = await response.json();
	// const paths = data.map((schedule) => {
	// 	return { params: { scheduleId: `${schedule.id}` } }; // The 'id' here
	// });
	// return {
	// 	paths,
	// 	fallback: true,
	// };

	return {
		paths: [
			{
				params: { scheduleId: "1" },
			},
		],
		fallback: true,
	};
}
