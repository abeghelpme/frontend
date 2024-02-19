import {
	Card,
	SingleCountryDonor,
	WorldMap,
} from "@/components/campaign-analytics";

type Dummy = { title: string; amount: string; analytics: string };
const CampaignAnalytics = () => {
	const dummy: Dummy[] = [
		{
			title: "funds withdrawn",
			amount: "#283,000,098",
			analytics: "+3.6 in 4days",
		},
		{
			title: "funds withdrawn",
			amount: "#283,000,098",
			analytics: "+3.6 in 4days",
		},
		{
			title: "campaigns",
			amount: "23",
			analytics: "+0.006 in 4days",
		},
	];
	return (
		<section className="flex min-h-screen flex-col justify-center gap-4 p-4 md:gap-8 md:p-6">
			<div className="flex flex-col gap-4 md:flex-row">
				{dummy.map((data, id) => {
					return (
						<Card
							key={id}
							title={data.title}
							amount={data.amount}
							analytics={data.analytics}
						/>
					);
				})}
			</div>
			<div className="flex flex-col gap-4 rounded-xl  border-CampaignCardBorderWidth border-placeholder bg-white px-4 py-8  text-sm text-abeg-text text-opacity-80 md:gap-8 md:p-8 md:text-base">
				<div className="flex items-center  justify-between border-b-[0.5px] border-b-placeholder border-opacity-80 pb-4">
					<p className="text-lg font-semibold">Total donors so far</p>
					<p className="flex items-center justify-center gap-2 rounded-lg border-CampaignCardBorderWidth border-abeg-text p-2 text-sm text-abeg-text">
						Real time report
					</p>
				</div>
				<div className="flex flex-col gap-8 md:flex-row md:gap-16 ">
					<WorldMap countries={["Nigeria", "Mali"]} />
					<div className="flex flex-1 flex-col gap-3  ">
						<p className=" text-2xl font-semibold md:text-4xl">10.8K</p>
						<div className="flex flex-col gap-2">
							<SingleCountryDonor countryName="Nigeria" progress={70} />
							<SingleCountryDonor countryName="Ghana" progress={49} />
							<SingleCountryDonor countryName="Liberia" progress={30} />
							<SingleCountryDonor countryName="Cameroon" progress={17} />
							<SingleCountryDonor countryName="Gambia" progress={7} />
							<SingleCountryDonor countryName="Mali" progress={33} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CampaignAnalytics;
CampaignAnalytics.protect = true;
