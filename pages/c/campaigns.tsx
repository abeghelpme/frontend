import {
	ClockIcon,
	Closed,
	Drafts,
	LocationIcon,
	MegaphoneIcon,
	SlashedStar,
	Star,
} from "@/components/common";
import { Button, ProgressBar } from "@/components/ui";
import { AuthenticatedUserLayout } from "@/layouts";
import dashboardImage from "@/public/assets/images/dashboard/dashboardImage.png";
import Image, { type StaticImageData } from "next/image";
import { useReducer } from "react";

type CampaignData = {
	image: StaticImageData;
	title: string;
	name: string;
	profession: string;
	amountRaised: string;
	status: string;
};

// const campaignsData: CampaignData[] = new Array(12).fill({
// 	image: dashboardImage,
// 	title: 'Bringing Dental Care to Undeserved Communities',
// 	name: 'Locs Designer',
// 	profession: 'Health and Wellness',
// 	amountRaised: '$2,000,000'
// });

const Campaigns = () => {
	const campaignData: CampaignData[] = [
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "completed",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "completed",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "incomplete",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "completed",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "incomplete",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "incomplete",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "completed",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "completed",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			profession: "Health and Wellness",
			amountRaised: "$2,000,000",
			status: "incomplete",
		},
	];

	const reducer = (
		campaigns: {
			original: CampaignData[];
			filtered: CampaignData[];
			state: string;
		},
		action: { status: string }
	) => {
		switch (action.status) {
			case "incomplete":
				return {
					...campaigns,
					filtered: campaigns.original.filter((c) => c.status === "incomplete"),
					state: "incomplete",
				};
			case "completed":
				return {
					...campaigns,
					filtered: campaigns.original.filter((c) => c.status === "completed"),
					state: "completed",
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

	const initialState = {
		original: campaignData,
		filtered: campaignData,
		state: "all",
	};

	const [campaigns, dispatch] = useReducer(reducer, initialState);

	const handleCompleted = () => {
		dispatch({ status: "completed" });
	};

	const handleUnCompleted = () => {
		dispatch({ status: "incomplete" });
	};

	const handleAll = () => {
		dispatch({ status: "all" });
	};

	return (
		<AuthenticatedUserLayout isDashboard>
			<div className="mb-8 space-y-6 hidden md:block">
				<h1 className="uppercase text-2xl font-extrabold text-white">
					your campaigns
				</h1>
				<div className="border border-headerDivider bg-white p-3 py-2 rounded-lg flex items-center gap-8 justify-between lg:w-fit">
					<Button
						onClick={() => handleAll()}
						variant="regular"
						className={`flex items-center gap-2 ${
							campaigns.state === "all" && "text-abeg-primary font-semibold"
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
						onClick={() => handleCompleted()}
						className={`flex items-center gap-2 ${
							campaigns.state === "completed" &&
							"text-abeg-primary font-semibold"
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
						onClick={() => handleUnCompleted()}
						className={`flex items-center gap-2 ${
							campaigns.state === "incomplete" &&
							"text-abeg-primary font-semibold"
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
							campaigns.state === "closed" && "text-abeg-primary font-semibold"
						}`}
					>
						<Closed
						// fill
						// stroke
						/>
						Closed
					</Button>
					<Button
						variant="regular"
						className={`flex items-center gap-2 ${
							campaigns.state === "draft" && "text-abeg-primary font-semibold"
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
			<section className="grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
				{campaigns.filtered.map((item: CampaignData, index: number) => (
					<div key={index} className=" mb-5 md:mb-0">
						<div className="text-white relative">
							<Image
								src={dashboardImage}
								alt="Campaigns Image"
								className="w-full rounded-md"
							/>
							<div className="space-x-1 absolute top-4 left-4 text-xs xl:text-sm flex items-center p-2 backdrop-blur-md rounded-md">
								<LocationIcon />
								<span className="">Lagos, Nigeria</span>
							</div>
							<div className="space-x-1 absolute bottom-4 right-4 text-xs xl:text-sm flex items-center p-2 backdrop-blur-md rounded-md">
								<ClockIcon />
								<span className="">20 days left</span>
							</div>
							<div className="space-x-1 absolute bottom-4 left-4 text-xs xl:text-sm flex items-center p-2 backdrop-blur-md rounded-md">
								<span className="">235,567 total donors</span>
							</div>
						</div>
						<h3 className="xl:pr-10 text-md font-semibold text-base xl:text-lg mt-6 mb-2">
							{item.title}
						</h3>
						<p className="text-sm mb-6">
							By: {item.name} - {item.profession}
						</p>
						<ProgressBar value={70} />

						<p className="pt-2 text-sm">{item.amountRaised} raised</p>
					</div>
				))}
			</section>
		</AuthenticatedUserLayout>
	);
};
export default Campaigns;
// Campaigns.protect = true;
