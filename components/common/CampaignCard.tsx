noimport type { Campaign } from "@/interfaces/Campaign";
import { cn } from "@/lib";
import { useDragScroll } from "@/lib/hooks";
import type { AsProp } from "@/lib/type-helpers";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, ProgressBar } from "../ui";
import Heading from "./Heading";
import SingleCampaignProgress from "./SingleCampaignProgress";
import { DonorIcon } from "./campaign-icons";
import { BankIcon, ClockIcon, EyeIcon, LocationIcon } from "./dashboardIcons";

type CampaignCardProps = {
	classNames?: { base?: string; header?: string; image?: string };

	cardType?: "overview" | "regular";

	cardDetails: Campaign;
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
	status: string;
};

type CardListProps = {
	listType: "horizontal" | "grid";

	classNames?: {
		base?: string;
		card?: CampaignCardProps["classNames"];
	};
	cardDetailsArray: Array<CampaignCardProps["cardDetails"]>;
};

export const generateDummyCardData = (count = 5) =>
	Array<TransformedDetails>(count).fill({
		imageSrc: "/assets/images/dashboard/dummyCardImg.svg",
		title: "Bringing Dental Care to Underserved Communities",
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

export function CampaignCard(props: CampaignCardProps) {
	const { cardDetails, cardType = "regular", classNames, as } = props;

	const transformedDetails = {
		id: cardDetails._id,
		category: cardDetails.category ? cardDetails.category.name : "Unknown",
		status: cardDetails.status,
		goal: cardDetails.goal,
		amountRaised: cardDetails.amountRaised,
		commentCount: 0,
		donorCount: 0,
		imageSrc: cardDetails.images?.[0]?.secureUrl ?? "assets/images/shared/logo.svg",
		daysLeft: 0,
		location: "Not Provided",
		name: cardDetails.creator
			? cardDetails.fundraiser === "INDIVIDUAL"
				? `${cardDetails.creator.firstName} ${cardDetails.creator.lastName}`
				: "Beneficiary"
			: "Unknown",
		title: cardDetails.title,
	} satisfies TransformedDetails;

	const donationProgress = Math.floor(
		(transformedDetails.amountRaised / transformedDetails.goal) * 100
	);

	return (
		<Card
			as={as}
			className={cn(
				"flex w-full flex-col justify-between gap-2",
				classNames?.base
			)}
		>
			<Card.Header
				className={cn(
					"relative rounded-md [-webkit-user-drag:none]",
					classNames?.header
				)}
				draggable={false}
				asChild
			>
				<Link href={`/c/${cardDetails.url.split("/c/")[1]}`} draggable={false}>
					<Image
						src={transformedDetails.imageSrc}
						className={cn(
							"size-full rounded-md object-cover",
							classNames?.image
						)}
						width={383}
						height={263}
						draggable={false}
						alt="Campaigns Image"
					/>

					<div className="absolute inset-0 flex select-none flex-col items-start justify-between p-6 text-xs text-white">
						<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
							<LocationIcon />
							<figcaption>{transformedDetails.location}</figcaption>
						</figure>

						<div className="flex w-full justify-between">
							{cardType === "regular" && (
								<figure className="mr-auto flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
									<DonorIcon stroke="light" className="size-4" />
									<figcaption>
										{transformedDetails.donorCount} total donors
									</figcaption>
								</figure>
							)}

							<figure className="ml-auto flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
								<ClockIcon />
								<figcaption>{transformedDetails.daysLeft} days left</figcaption>
							</figure>
						</div>
					</div>
				</Link>
			</Card.Header>

			{cardType === "regular" && (
				<Card.Content className="">
					<Heading
						as="h4"
						className="flex max-w-[30ch text-base font-bold lg:text-base"
					>
						{transformedDetails.title}
					</Heading>
					<p className="mt-1 text-sm font-medium">
						By: {transformedDetails.name} - {transformedDetails.category}
					</p>
				</Card.Content>
			)}

			{cardType === "regular" ? (
				<Card.Footer className="flex flex-col gap-2">
					<SingleCampaignProgress
						amountRaised={transformedDetails.amountRaised}
						goal={transformedDetails.goal}
					/>
				</Card.Footer>
			) : (
				<Card.Footer>
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
										<figcaption>
											{transformedDetails.donorCount} total donors
										</figcaption>
									</figure>
									<figure className="flex items-center gap-1">
										<figcaption>
											{transformedDetails.commentCount} comments
										</figcaption>
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
				</Card.Footer>
			)}
		</Card>
	);
}

export function CampaignCardList(props: CardListProps) {
	const { cardDetailsArray, listType, classNames } = props;

	const { dragScrollProps, dragContainerClasses, dragItemClasses } =
		useDragScroll<HTMLUListElement>();

	if (cardDetailsArray.length === 0) {
		return null;
	}

	const semanticClasses = {
		cardList: {
			horizontal: dragContainerClasses,
			grid: "grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 w-full",
		},

		card: {
			base: {
				horizontal: cn(
					"max-w-[370px] shrink-0 lg:max-w-[396px]",
					dragItemClasses
				),
				grid: "",
			},

			header: {
				horizontal: "aspect-[383/263] md:aspect-[396/263] max-h-[263px]",
				grid: "aspect-[380/345] max-h-[345px] md:aspect-[403/375] md:max-h-[375px]",
			},
		},
	};

	return (
		<ul
			{...(listType === "horizontal" && dragScrollProps)}
			className={cn(
				"gap-6 lg:gap-8",
				semanticClasses.cardList[listType],
				classNames?.base
			)}
		>
			{cardDetailsArray.map((detail) => (
				<CampaignCard
					key={detail._id}
					as="li"
					cardDetails={detail}
					classNames={{
						base: cn(
							semanticClasses.card.base[listType],
							classNames?.card?.base
						),
						header: cn(
							semanticClasses.card.header[listType],
							classNames?.card?.header
						),
						image: classNames?.card?.image,
					}}
				/>
			))}
		</ul>
	);
}
