import type { Campaign } from "@/interfaces/Campaign";
import { cn, getDaysLeft } from "@/lib";
import { useDragScroll } from "@/lib/hooks";
import type { AsProp } from "@/lib/type-helpers";
import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "../ui";
import Heading from "./Heading";
import SingleCampaignProgress from "./SingleCampaignProgress";
import { DonorIcon } from "./campaign-icons";
import { BankIcon, ClockIcon, EyeIcon, LocationIcon } from "./dashboardIcons";
import { getStatusIconInfo } from "./dashboardIcons/Star";

type CampaignCardProps = {
	classNames?: { base?: string; header?: string; image?: string };

	cardType?: "overview" | "regular";

	withStatusCaption?: boolean;

	cardDetails: Campaign | undefined;
} & AsProp;

type TransformedDetails = {
	id?: string;
	imageSrc: string;
	title: string;
	location: string;
	name: string;
	goal: number;
	amountRaised: number;
	donorCount: number;
	commentCount: number;
	daysLeft: number;
	category: string;
	status: Campaign["status"];
};

type CardListProps = {
	listType: "horizontal" | "grid" | "vertical";

	classNames?: {
		base?: string;
		card?: CampaignCardProps["classNames"];
	};
	cardDetailsArray: Array<CampaignCardProps["cardDetails"]> | undefined;
} & Pick<CampaignCardProps, "withStatusCaption">;

export const generateDummyCardData = (count = 5) =>
	Array<TransformedDetails>(count).fill({
		imageSrc: "/assets/images/dashboard/dummyCardImg.svg",
		title: "Bringing Dental Care to Undeserved Communities",
		location: "Lagos, Nigeria",
		name: "Locs Designer",
		goal: 3000000,
		amountRaised: 2000000,
		donorCount: 235567,
		commentCount: 235567,
		daysLeft: 20,
		category: "Health and Wellness",
		status: "In Review",
	});

export const dummyCardData = generateDummyCardData();

const transformCardData = (
	cardDetails: NonNullable<CampaignCardProps["cardDetails"]>
): TransformedDetails => ({
	id: cardDetails._id,
	category: cardDetails.category ? cardDetails.category.name : "Unknown",
	status: cardDetails.status,
	goal: cardDetails.goal,
	amountRaised: cardDetails.amountRaised,
	commentCount: 0,
	donorCount: 0,
	imageSrc: cardDetails.images[0]?.secureUrl ?? "/assets/images/shared/logo.svg",
	daysLeft: getDaysLeft(cardDetails.deadline),
	location: cardDetails?.country ?? "Not Provided",
	name:
		cardDetails.creator && cardDetails.fundraiser === "INDIVIDUAL"
			? `${cardDetails.creator.firstName} ${cardDetails.creator.lastName}`
			: cardDetails.creator && cardDetails.fundraiser === "BENEFICIARY"
			  ? "Beneficiary"
			  : "Unknown",
	title: cardDetails.title,
});

export function CampaignCard(props: CampaignCardProps) {
	const { cardDetails, cardType = "regular", withStatusCaption, classNames, as } = props;

	if (!cardDetails) {
		return null;
	}

	const transformedDetails = transformCardData(cardDetails);

	const shortId = cardDetails.url ? cardDetails.url.split("/c/")[1] : null;

	const StatusInfo = getStatusIconInfo(transformedDetails.status);

	return (
		<Card as={as} className={cn("flex w-full flex-col justify-between gap-5", classNames?.base)}>
			<Card.Header
				className={cn("relative rounded-md [-webkit-user-drag:none]", classNames?.header)}
				draggable={false}
				asChild
			>
				<div className="flex max-h-[236px] md:max-h-[250px]">
					<Link href={`/c/${shortId}`} className="basis-full">
						<Image
							src={transformedDetails.imageSrc}
							className={cn("size-full rounded-md object-cover", classNames?.image)}
							width={383}
							height={236}
							alt="Campaigns Image"
						/>

						<div className="absolute inset-0 flex select-none flex-col items-start justify-between p-6 text-xs text-white">
							<div className="flex w-full justify-between">
								<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
									<LocationIcon />
									<figcaption>{transformedDetails.location}</figcaption>
								</figure>

								{withStatusCaption && (
									<figure
										className={cn(
											"ml-auto flex items-center gap-1 rounded-md p-2 backdrop-blur-md",
											StatusInfo.bgColor
										)}
									>
										<StatusInfo.Icon />
										<figcaption>{transformedDetails.status}</figcaption>
									</figure>
								)}
							</div>

							<div className="flex w-full justify-between">
								{cardType === "regular" && (
									<figure className="mr-auto flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
										<DonorIcon stroke="light" className="size-4" />
										<figcaption>{transformedDetails.donorCount} total donors</figcaption>
									</figure>
								)}

								<figure className="ml-auto flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
									<ClockIcon />
									<figcaption>{transformedDetails.daysLeft} days left</figcaption>
								</figure>
							</div>
						</div>
					</Link>
				</div>
			</Card.Header>

			{cardType === "regular" && (
				<Card.Content>
					<Heading as="h4" className="flex text-base font-bold lg:text-base">
						{transformedDetails.title}
					</Heading>
					<p className="mt-1 text-sm font-medium">
						By: {transformedDetails.name} - {transformedDetails.category}
					</p>
				</Card.Content>
			)}

			<Card.Footer>
				{cardType === "regular" ? (
					<SingleCampaignProgress
						amountRaised={transformedDetails.amountRaised}
						goal={transformedDetails.goal}
					/>
				) : (
					<div className="space-y-4 md:space-y-5">
						<Heading as="h4" className="hidden font-bold md:block md:text-2xl">
							{transformedDetails.title}
						</Heading>

						<article className="flex flex-col justify-between gap-4 md:flex-row md:gap-6">
							<div className="flex-1 space-y-4 text-sm">
								<SingleCampaignProgress
									amountRaised={transformedDetails.amountRaised}
									goal={transformedDetails.goal}
								/>

								<div className="flex items-center justify-between gap-7">
									<figure className="flex items-center gap-1">
										<DonorIcon stroke="dark" className="size-4 lg:size-5" />
										<figcaption>{transformedDetails.donorCount} total donors</figcaption>
									</figure>
									<figure className="flex items-center gap-1">
										<figcaption>{transformedDetails.commentCount} comments</figcaption>
									</figure>
								</div>
							</div>

							<div className="flex justify-between gap-4 text-sm md:w-fit md:flex-col">
								<Button variant="secondary" className="flex items-center gap-2">
									<BankIcon />
									<p>Set up account</p>
								</Button>

								<Button variant="primary" asChild>
									<Link
										href={{
											pathname: "/c/preview",
											query: { id: transformedDetails.id },
										}}
										className="flex items-center gap-2"
									>
										<EyeIcon />
										<p>View campaign</p>
									</Link>
								</Button>
							</div>
						</article>
					</div>
				)}
			</Card.Footer>
		</Card>
	);
}

export function CampaignCardList(props: CardListProps) {
	const { cardDetailsArray, listType, withStatusCaption, classNames } = props;

	const { dragScrollProps, dragContainerClasses, dragItemClasses } =
		useDragScroll<HTMLUListElement>();

	if (!Array.isArray(cardDetailsArray) || cardDetailsArray.length === 0) {
		return null;
	}

	const semanticClasses = {
		cardList: {
			horizontal: dragContainerClasses,
			// grid: "grid grid-cols-[repeat(auto-fill,minmax(min(100%,402px),1fr))]",
			grid: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 w-full",
			vertical: "flex flex-col w-full",
		},

		card: {
			base: {
				horizontal: cn("max-w-[370px] shrink-0 md:max-w-[396px]", dragItemClasses),
				grid: "w-[clamp(300px,100%,403px)]",
				vertical: "max-w-[403px]",
			},

			header: {
				horizontal: "aspect-[383/263] md:aspect-[396/263] max-h-[263px]",
				grid: "max-h-[236px] h-full md:max-h-[250px]",
				vertical: "max-h-[236px] h-full md:max-h-[250px]",
			},
		},
	};

	return (
		<ul
			{...(listType === "horizontal" && dragScrollProps)}
			className={cn("gap-6 lg:gap-8", semanticClasses.cardList[listType], classNames?.base)}
		>
			{cardDetailsArray.map((detail) => (
				<CampaignCard
					key={detail?._id}
					as="li"
					cardDetails={detail}
					withStatusCaption={withStatusCaption}
					classNames={{
						base: cn(semanticClasses.card.base[listType], classNames?.card?.base),
						header: cn(semanticClasses.card.header[listType], classNames?.card?.header),
						image: classNames?.card?.image,
					}}
				/>
			))}
		</ul>
	);
}
