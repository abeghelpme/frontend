import { DonationStatsPanel } from "@/components/campaign-analytics";
import { Heading } from "@/components/common";
import { CampaignCardList } from "@/components/common/CampaignCard";
import { SummaryCard } from "@/components/dashboard";
import { DateRangePicker } from "@/components/ui/date-picker";
import type { Campaign } from "@/interfaces/Campaign";
import { AuthenticatedUserLayout } from "@/layouts";
import { useCampaignStore } from "@/store";

const reducer = (
	campaigns: {
		original: Campaign[];
		filtered: Campaign[];
		state: string;
	},
	action: { status: string }
) => {
	switch (action.status) {
		case "In Review":
			return {
				...campaigns,
				filtered: campaigns.original.filter((c) => c.status === "In Review"),
				state: "inReview",
			};
		case "Approved":
			return {
				...campaigns,
				filtered: campaigns.original.filter((c) => c.status === "Approved"),
				state: "approved",
			};
		case "all":
			return {
				...campaigns,
				filtered: campaigns.original,
				state: "all",
			};
		default:
			return campaigns;
	}
};

const DashboardCampaigns = () => {
	const campaignsFromDb = useCampaignStore((state) => state.campaigns);

	type Dummy = { title: string; amount: string; analytics: string };

	const dummy: Dummy[] = [
		{
			title: "funds raised",
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
			<section className="space-y-8">
				<div className="flex flex-col justify-between md:flex-row md:items-center">
					<h1 className="text-2xl font-extrabold max-md:ml-2 md:text-white">
						Summary
					</h1>

					<DateRangePicker />
				</div>

				<div className="space-y-4">
					<div className="flex flex-col gap-4 md:flex-row ">
						{dummy.map((data, id) => {
							return (
								<SummaryCard
									key={id}
									title={data.title}
									figure={data.amount}
									result={data.analytics}
								/>
							);
						})}
					</div>
					<DonationStatsPanel />
				</div>
			</section>

			<section className="mb-[95px] mt-[15px] space-y-8">
				<div>
					<Heading as="h2" className="text-2xl font-[800]">
						My Campaigns
					</Heading>
				</div>

				<CampaignCardList cardDetailsArray={campaignsFromDb} listType="grid" />
			</section>
		</AuthenticatedUserLayout>
	);
};

export default DashboardCampaigns;

DashboardCampaigns.protect = true;
