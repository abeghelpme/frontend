import {
	Card,
	DonationStatsPanel,
	DonationTable,
	TopDonators,
} from "@/components/campaign-analytics";
import MapDisplay from "@/components/campaign-analytics/MapDisplay";
import { AuthenticatedUserLayout } from "@/layouts";

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
		<AuthenticatedUserLayout isDashboard>
			<section className="flex flex-col gap-4 md:flex-row md:flex-wrap lg:flex-nowrap">
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
			</section>

			<MapDisplay />
			<div className="flex flex-col lg:flex-row gap-6">
				<DonationTable />
				<TopDonators />
			</div>
			<DonationStatsPanel />
		</AuthenticatedUserLayout>
	);
};

export default CampaignAnalytics;
// CampaignAnalytics.protect = true;
