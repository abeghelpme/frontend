import {
	DummyAvatar,
	MoneyIcon,
	ShareIcon,
} from "@/components/common/campaign-icons";
import type { Campaign } from "@/interfaces/Campaign";
import { cn, getDaysLeft } from "@/lib";
import { getDateFromString } from "@/lib/helpers/campaign";
import { useElementList } from "@/lib/hooks";
import { useSlot } from "@/lib/hooks/useSlot";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { Heading, SingleCampaignProgress } from "../common";
import { FAQ, UrgentFundraisers } from "../common/landingPage";
import { Button } from "../ui";
import CampaignCarousel from "./CampaignCarousel";
import DonationFlowDialog from "./DonationFlowDialog";
import DonorSection from "./DonorSection";
import ShareCampaignDialog from "./ShareCampaignDialog";

type CampaignOutlookProps = {
	children?: React.ReactNode;
	campaign: Campaign;
	featuredCampaigns: Campaign[];
	excerpt: string;
	campaignId: string;
};

type CampaignHeaderProps = {
	children: React.ReactNode;
	className?: string;
};

function CampaignOutlook(props: CampaignOutlookProps) {
	const { campaign, featuredCampaigns, excerpt, children, campaignId } = props;

	const [TagList] = useElementList();

	const [hideExcessStory, setHideExcessStory] = useState(true);

	const HeaderSlot = useSlot(children, CampaignOutlook.Header);

	const fundraiserTarget =
		`${campaign.creator?.firstName} ${campaign.creator?.lastName}` ||
		"Beneficiary";

	const campaignDeadline = getDateFromString(campaign.deadline);

	return (
		<main className="flex flex-col pb-20 text-abeg-text">
			<section className="relative px-6 pb-14 pt-11 text-white md:px-[80px]">
				<Image
					src="/assets/images/shared/hero-background.svg"
					className="z-[-1] object-cover"
					priority={true}
					alt=""
					fill
				/>

				{HeaderSlot}

				<p className="mt-3 text-pretty text-base md:text-lg">{excerpt}</p>

				<article className="relative mt-6 flex flex-wrap items-center gap-2 max-lg:justify-between lg:gap-9">
					<figure className="flex items-center gap-3 ">
						{campaign?.creator?.photo && (
							<Image
								src={campaign.creator.photo}
								alt="image"
								width={200}
								height={200}
								className="size-10 rounded-full"
							/>
						)}
						{!campaign?.creator?.photo && <DummyAvatar className="size-10" />}

						<figcaption className="text-lg">{fundraiserTarget}</figcaption>
					</figure>

					<DonationFlowDialog
						campaignId={campaignId}
						trigger={
							<button className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-lg font-bold">
								Donate
							</button>
						}
					/>

					<ShareCampaignDialog
						campaign={campaign}
						trigger={
							/* Using absolute on the button to prevent it from forcing unneeded flex wrap for the tags */
							<button className="absolute right-0 rounded-full border border-white bg-abeg-text/40 p-2 active:scale-[1.03] max-lg:hidden">
								<ShareIcon />
							</button>
						}
					/>
				</article>

				<CampaignCarousel
					images={campaign.images}
					classNames={{ base: "mt-8" }}
					captionContent={{
						location: campaign.country,
						donorCount: 0,
						daysLeft: getDaysLeft(campaign.deadline),
					}}
				/>

				<article className="relative mt-6 flex items-center">
					<TagList
						className="flex flex-wrap gap-5 max-lg:pr-[42px]"
						each={campaign.tags}
						render={(tag, index) => (
							<li
								key={`${tag}-${index}`}
								className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-base font-bold md:text-lg "
							>
								<p>{tag}</p>
							</li>
						)}
					/>

					<ShareCampaignDialog
						campaign={campaign}
						trigger={
							/* Using absolute on the button to prevent it from forcing unneeded flex wrap for the tags */
							<button className="absolute right-0 rounded-full border border-white bg-abeg-text/40 p-2 active:scale-[1.03] lg:hidden">
								<ShareIcon />
							</button>
						}
					/>
				</article>
			</section>

			<div className="mt-14 flex flex-col self-center px-6 max-lg:max-w-[450px] max-lg:items-center lg:flex-row-reverse lg:gap-5 lg:px-[80px]">
				<section className="mt-2 space-y-5 self-start px-[18px] py-6 lg:sticky lg:top-0 lg:min-w-[383px] lg:max-w-[505px]">
					<SingleCampaignProgress
						amountRaised={campaign.amountRaised}
						goal={campaign.goal}
						style2
					/>

					<article className="space-y-4">
						<DonationFlowDialog
							campaignId={campaignId}
							trigger={
								<Button
									variant="primary"
									className="w-full rounded-md bg-abeg-primary py-3 text-base font-bold lg:rounded-lg"
								>
									Donate to this campaign
								</Button>
							}
						/>

						<ShareCampaignDialog
							campaign={campaign}
							trigger={
								<Button
									variant="secondary"
									className="w-full rounded-md border-abeg-primary py-3 text-base font-bold text-abeg-primary lg:rounded-lg"
								>
									Share this campaign
								</Button>
							}
						/>
					</article>

					<article className="space-y-7">
						<figure className="flex items-start gap-2.5 text-sm lg:text-base">
							<MoneyIcon className="mt-[5px] size-6 shrink-0" />
							<figcaption>
								Be among the first to donate to this fundraiser, every penny
								donated will go a long way
							</figcaption>
						</figure>

						<figure className="flex items-center gap-2 text-sm lg:text-base">
							<DummyAvatar className="size-8 shrink-0" />
							<figcaption>
								{fundraiserTarget} is in charge of this fundraiser.
							</figcaption>
						</figure>
					</article>

					<DonorSection className="px-[19px]" />
				</section>

				<section className="max-w-[714px] text-2xl">
					<article>
						<Heading
							as="h3"
							className="flex gap-4 border-b border-b-placeholder p-2 text-base md:text-lg"
						>
							Category:
							<span className="font-normal">{campaign.category?.name}</span>
						</Heading>
						<Heading
							as="h3"
							className="mt-3 border-b border-b-placeholder p-2 text-base md:text-lg lg:mt-6"
						>
							Story
						</Heading>

						<div
							className={cn(
								"mt-6 min-h-16 text-justify text-base md:text-lg",
								hideExcessStory && "line-clamp-[10]"
							)}
							dangerouslySetInnerHTML={{
								__html: campaign.storyHtml,
							}}
						/>

						<Button
							onClick={() => setHideExcessStory((prev) => !prev)}
							variant="secondary"
							className="ml-auto mt-2 shrink-0 rounded-md border-abeg-primary py-2 text-base font-medium text-abeg-primary lg:rounded-lg"
						>
							{hideExcessStory ? "Read more" : "Read less"}
						</Button>

						<p className="mt-8 text-base md:text-xl lg:mt-12">
							Campaign closes on: {format(campaignDeadline, "dd-MM-yyyy")}.
						</p>

						<TagList
							className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4 font-medium lg:grid-cols-3 lg:gap-y-6"
							each={campaign.tags}
							render={(tag, index) => (
								<li
									key={`${tag}-${index}`}
									className="flex min-w-0 text-base md:text-lg"
								>
									<p className="truncate">{tag}</p>
								</li>
							)}
						/>
					</article>

					<article className="mt-12 flex items-start gap-6">
						<DummyAvatar className="size-[82px]" />

						<div>
							<p className="flex flex-col text-base md:text-lg">
								{fundraiserTarget} is in charge of this fundraiser.
								<span className="mt-4 text-base md:text-lg">
									{campaign.country}
								</span>
							</p>
							<Button
								variant="primary"
								className="mt-8 w-full rounded-md bg-abeg-primary py-3 text-base font-bold lg:mt-8 lg:py-4"
							>
								Reach out
							</Button>
						</div>
					</article>
				</section>
			</div>

			<UrgentFundraisers
				featuredCampaigns={featuredCampaigns}
				className="mt-[72px] lg:mt-[120px]"
			/>

			<FAQ className="mt-[72px] w-full px-6 lg:mt-[120px] lg:px-[80px]" />
		</main>
	);
}

function CampaignOutlookHeader(props: CampaignHeaderProps) {
	const { children, className } = props;

	return <header className={cn("w-full", className)}>{children}</header>;
}

CampaignOutlook.Header = CampaignOutlookHeader;
CampaignOutlookHeader.slot = Symbol.for("header");

export default CampaignOutlook;
