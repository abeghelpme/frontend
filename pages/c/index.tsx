import {
	Closed,
	Drafts,
	MegaphoneIcon,
	SlashedStar,
	Star,
} from "@/components/common";
import { CampaignCardList } from "@/components/common/CampaignCard";
import { Button } from "@/components/ui";
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
	const campaignsFromDb = useCampaignStore((state) =>
		state.campaigns.filter((campaign) => campaign.status !== "Draft")
	);

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

	return (
		<AuthenticatedUserLayout isDashboard>
			<div className="mb-8 hidden space-y-6 md:block">
				<h1 className="text-2xl font-extrabold uppercase text-white">
					your campaigns
				</h1>
				<div className="flex items-center justify-between gap-8 rounded-lg border border-headerDivider bg-white p-3 py-2 lg:w-fit">
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
				</div>
			</div>
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
