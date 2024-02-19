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
		<section className="flex flex-col gap-4 md:gap-8 p-4 md:p-6 justify-center min-h-screen">
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
			<div className="flex flex-col gap-4 md:gap-8  px-4 py-8 md:p-8 text-abeg-text text-sm  md:text-base border-CampaignCardBorderWidth border-CampaignCardBorderColor rounded-xl text-opacity-80 bg-white">
				<div className="flex justify-between  items-center border-b-[0.5px] border-opacity-80 pb-4 border-b-CampaignCardBorderColor">
					<p className="text-lg font-semibold">Total donors so far</p>
					<p className="p-2 flex justify-center items-center gap-2 border-CampaignCardBorderWidth border-abeg-text text-sm text-abeg-text rounded-lg">
						Real time report
					</p>
				</div>
				<div className="flex gap-8 md:gap-16 flex-col md:flex-row ">
					<WorldMap countries={["Nigeria", "Mali"]} />
					<div className="flex flex-col gap-3 flex-1  ">
						<p className=" text-2xl md:text-4xl font-semibold">10.8K</p>
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
