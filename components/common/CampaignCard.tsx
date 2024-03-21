import { cn } from "@/lib";
import { useDragScroll, useElementList } from "@/lib/hooks";
import type { AsProp } from "@/lib/type-helpers";
import Image from "next/image";
import { Card, ProgressBar } from "../ui";
import Heading from "./Heading";
import { DonorIcon2 } from "./campaign-icons";
import { ClockIcon, LocationIcon } from "./dashboardIcons";

type CardProps = AsProp & {
	classNames?: { base?: string; header?: string };
	listType: "horizontal" | "grid";
	cardDetails: {
		imageSrc: string;
		title: string;
		location: string;
		name: string;
		goal: string;
		amountRaised: string;
		donorCount: string;
		daysLeft: string;
		category: string;
		status: string;
	};
};

export type CardListProps = {
	classNames?: {
		base?: string;
		card?: CardProps["classNames"];
	};
	listType: "horizontal" | "grid";
	cardDetailList: Array<CardProps["cardDetails"]>;
};

export const dummyCardData = Array<CardProps["cardDetails"]>(5).fill({
	imageSrc: "/assets/images/dashboard/dummyCardImg.svg",
	title: "Bringing Dental Care to Underserved Communities",
	location: "Lagos, Nigeria",
	name: "Locs Designer",
	goal: "₦1,000,000",
	amountRaised: "₦2,000,000",
	donorCount: "235,567",
	daysLeft: "20",
	category: "Health and Wellness",
	status: "Incomplete",
});

export function CampaignCard(props: CardProps) {
	const { as = "li", cardDetails, classNames, listType } = props;

	const donationProgress = Math.floor(
		(Number(cardDetails.amountRaised) / Number(cardDetails.goal)) * 100
	);

	return (
		<Card
			as={as}
			className={cn(
				"w-full shrink-0 space-y-[25px]",
				listType === "horizontal" && "max-lg:max-w-[383px] lg:max-w-[396px]",
				classNames?.base
			)}
		>
			<Card.Header className={cn("relative rounded-md", classNames?.header)}>
				<Image
					src={cardDetails.imageSrc}
					className="size-full rounded-md"
					width={383}
					height={263}
					draggable={false}
					alt="Campaigns Image"
				/>

				<div className="absolute inset-0 flex select-none flex-col items-start justify-between p-[25px] text-xs text-white">
					<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
						<LocationIcon />
						<figcaption>{cardDetails.location}</figcaption>
					</figure>

					<div className="flex w-full justify-between">
						<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
							<DonorIcon2 className="size-4" />
							<figcaption> {cardDetails.donorCount} total donors</figcaption>
						</figure>

						<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
							<ClockIcon />
							<figcaption>{cardDetails.daysLeft} days left</figcaption>
						</figure>
					</div>
				</div>
			</Card.Header>

			<Card.Content>
				<Heading
					as="h4"
					className="max-w-[30ch] text-base font-bold lg:text-base"
				>
					{cardDetails.title}
				</Heading>

				<p className="mt-2 text-sm font-medium">
					By: {cardDetails.name} - {cardDetails.category}
				</p>
			</Card.Content>

			<Card.Footer className="flex flex-col gap-2">
				<ProgressBar
					value={!Number.isNaN(donationProgress) ? donationProgress : 70}
					className="progress-unfilled:h-1 progress-unfilled:rounded-lg progress-unfilled:bg-lightGreen progress-filled:rounded-lg progress-filled:bg-abeg-primary"
				/>

				<p className="text-xs font-medium text-abeg-primary">
					{cardDetails.amountRaised} raised
				</p>
			</Card.Footer>
		</Card>
	);
}

export function CampaignCardList(props: CardListProps) {
	const { cardDetailList, listType, classNames } = props;

	const [CardList] = useElementList();

	const dragScrollProps = useDragScroll<HTMLUListElement>();

	const semanticClasses = {
		horizontal:
			"flex cursor-grab overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		grid: "grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4",
	};

	return (
		<CardList
			{...(listType === "horizontal" && dragScrollProps)}
			className={cn(
				"w-full gap-4",
				classNames?.base,
				semanticClasses[listType]
			)}
			each={cardDetailList}
			render={(detail, index) => (
				<CampaignCard
					key={index}
					cardDetails={detail}
					listType={listType}
					classNames={{
						base: classNames?.card?.base,
						header: classNames?.card?.header,
					}}
				/>
			)}
		/>
	);
}
