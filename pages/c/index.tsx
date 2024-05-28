import { DonationStatsPanel } from "@/components/campaign-analytics";
import { Heading } from "@/components/common";
import { CampaignCardList } from "@/components/common/CampaignCard";
import { SummaryCard } from "@/components/dashboard";
import { Tabs } from "@/components/ui";
import { DateRangePicker } from "@/components/ui/date-picker";
import { AuthenticatedUserLayout } from "@/layouts";
import { useCampaignStore } from "@/store";
import { AlignJustifyIcon, Grid3x3Icon } from "lucide-react";

const dummy = [
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

const DashboardCampaigns = () => {
	const campaignsFromDb = useCampaignStore((state) => state.campaigns);

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

			<Tabs.Root defaultValue="grid" className="mb-[95px] mt-[15px] space-y-8">
				<div className="flex flex-col justify-between max-md:gap-6 md:flex-row md:items-center">
					<Heading as="h2" className="text-2xl font-[800]">
						My Campaigns
					</Heading>

					<div className="flex justify-between gap-2">
						<Tabs.List className="items-stretch p-0">
							<Tabs.Trigger
								value="grid"
								className="group/trigger flex items-center gap-1 rounded-l-md p-2 data-[state=inactive]:border data-[state=inactive]:border-borderPrimary data-[state=active]:bg-abeg-primary data-[state=inactive]:bg-white data-[state=active]:font-extrabold data-[state=active]:text-white"
							>
								<Grid3x3Icon className="size-5 font-normal" />
								<p>Grid</p>
							</Tabs.Trigger>

							<Tabs.Trigger
								value="list"
								className="flex items-center gap-1 rounded-r-md border p-2 data-[state=active]:border-abeg-primary data-[state=active]:bg-abeg-primary data-[state=inactive]:bg-white data-[state=active]:font-extrabold data-[state=active]:text-white"
							>
								<AlignJustifyIcon className="size-5 font-normal" />
								<p>List</p>
							</Tabs.Trigger>
						</Tabs.List>

						<button className="px-6 py-2 font-medium italic">See All</button>
					</div>
				</div>

				<Tabs.Content value="grid">
					<CampaignCardList
						cardDetailsArray={campaignsFromDb}
						listType="grid"
					/>
				</Tabs.Content>

				<Tabs.Content value="list">
					<CampaignCardList
						cardDetailsArray={campaignsFromDb}
						listType="vertical"
					/>
				</Tabs.Content>
			</Tabs.Root>
		</AuthenticatedUserLayout>
	);
};

export default DashboardCampaigns;

DashboardCampaigns.protect = true;
