import { DonationStatsPanel } from "@/components/campaign-analytics";
import { CampaignCardList } from "@/components/common/CampaignCard";
import { SummaryCard } from "@/components/dashboard";
import { DateRangePicker } from "@/components/ui/date-picker";
import type { Campaign } from "@/interfaces/Campaign";
import { AuthenticatedUserLayout } from "@/layouts";
import { useCampaignStore } from "@/store";
import { useReducer } from "react";

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

	const initialState = {
		original: campaignsFromDb,
		filtered: campaignsFromDb,
		state: "all",
	};

	const [campaigns, dispatch] = useReducer(reducer, initialState);

	const handleApproved = () => {
		dispatch({ status: "Approved" });
	};

	const handleInReview = () => {
		dispatch({ status: "In Review" });
	};

	const handleAll = () => {
		dispatch({ status: "all" });
	};

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
				<div className="hidden md:flex justify-between items-center">
					<h1 className="text-2xl font-extrabold capitalize text-white">
						summary
					</h1>
					{/* <div className="flex items-center justify-between gap-8 rounded-lg border border-headerDivider bg-white p-3 py-2 lg:w-fit">
					<Button
						onClick={() => handleAll()}
						variant="regular"
						className={`flex items-center gap-2 ${
							campaigns.state === "all" && "font-semibold text-abeg-primary"
						}`}
					>
						<MegaphoneIcon
							fill={campaigns.state === "all" ? "#008080" : "none"}
							stroke={campaigns.state !== "all"}
						/>
						All Campaigns
					</Button>
					<Button
						variant="regular"
						onClick={() => handleApproved()}
						className={`flex items-center gap-2 ${
							campaigns.state === "completed" &&
							"font-semibold text-abeg-primary"
						}`}
					>
						<Star
							fill={campaigns.state === "completed"}
							stroke={campaigns.state === "completed"}
						/>
						Goals Reached
					</Button>
					<Button
						variant="regular"
						onClick={() => handleInReview()}
						className={`flex items-center gap-2 ${
							campaigns.state === "incomplete" &&
							"font-semibold text-abeg-primary"
						}`}
					>
						<SlashedStar
							fill={campaigns.state === "incomplete"}
							stroke={campaigns.state === "incomplete"}
						/>
						Unreached
					</Button>
					<Button
						variant="regular"
						className={`flex items-center gap-2 ${
							campaigns.state === "closed" && "font-semibold text-abeg-primary"
						}`}
					>
						<Closed />
						Closed
					</Button>
					<Button
						variant="regular"
						className={`flex items-center gap-2 ${
							campaigns.state === "draft" && "font-semibold text-abeg-primary"
						}`}
					>
						<Drafts
							fill={campaigns.state === "draft"}
							stroke={campaigns.state === "draft"}
						/>
						Drafts
					</Button>
				</div> */}

					<DateRangePicker />
				</div>
				<div className="space-y-4">
					<div className="flex flex-col gap-4 md:flex-row md:flex-wrap lg:flex-nowrap">
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
			<section>
				<CampaignCardList
					cardDetailsArray={campaigns.filtered}
					listType="grid"
				/>
			</section>
		</AuthenticatedUserLayout>
	);
};

export default DashboardCampaigns;
DashboardCampaigns.protect = true;
