import type { Campaign } from "@/interfaces/Campaign";
import { cn } from "@/lib";
import { getDateFromString } from "@/lib/helpers/campaign";
import { useElementList, useShareCampaign } from "@/lib/hooks";
import { useSlot } from "@/lib/hooks/useSlot";
import {
	DonorIcon,
	DummyAvatar,
	MoneyIcon,
	whatsappIcon,
	xIcon,
} from "@/public/assets/icons/campaign";
import { format } from "date-fns";
import { FilesIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CustomDialog } from "../common";
import Heading from "../common/Heading";
import { Button, ProgressBar } from "../ui";
import CampaignCarousel from "./CampaignCarousel";
import DonorSection from "./DonorSection";

type CampaignOutlookProps = {
	children?: React.ReactNode;
	campaign: Campaign;
	excerpt: string;
};

type CampaignHeaderProps = {
	children: React.ReactNode;
	className?: string;
};

function CampaignOutlook(props: CampaignOutlookProps) {
	const { campaign, excerpt, children } = props;

	const [TagList] = useElementList();

	const HeaderSlot = useSlot(children, CampaignOutlook.Header);

	const { generateTweet, generateWhatsAppMessage, handleShareLink } =
		useShareCampaign();

	const fundraiserTarget =
		campaign.fundraiser === "INDIVIDUAL"
			? `${campaign.creator?.firstName} ${campaign.creator?.lastName}`
			: "BENEFICIARY";

	const campaignDeadline = getDateFromString(campaign.deadline);

	return (
		<main className="mx-auto flex max-w-[430px] flex-col items-center gap-2 pb-20 text-abeg-text">
			<section className="bg-abeg-primary bg-heroBg px-6 pb-14 pt-11 text-white">
				{HeaderSlot}

				<p className="mt-3 text-pretty">{excerpt}</p>

				<div className="mt-6 flex items-center justify-between">
					<figure className="flex items-center gap-3 text-[18px]">
						<DummyAvatar className="size-10" />

						<figcaption>{fundraiserTarget}</figcaption>
					</figure>

					<button className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-[18px] font-bold">
						Donate
					</button>
				</div>

				<CampaignCarousel
					images={campaign.images}
					classNames={{ base: "mt-8" }}
				/>
			</section>

			<div className="px-6">
				<section className="space-y-5 px-[18px] py-6">
					<article>
						<div className="flex items-center justify-between">
							<p className="font-bold">₦ {campaign.goal}</p>
							<p className="text-xs font-semibold">
								₦1,000,000{" "}
								<span className="font-medium text-placeholder">remaining</span>
							</p>
						</div>

						<ProgressBar
							value={70}
							className="progress-unfilled:h-1 progress-unfilled:rounded-lg progress-unfilled:bg-lightGreen progress-filled:rounded-lg progress-filled:bg-abeg-primary"
						/>
					</article>

					<article className="space-y-4">
						<Button
							variant="primary"
							className="w-full rounded-md bg-abeg-primary py-3 text-base font-bold lg:rounded-lg"
						>
							Donate to this campaign
						</Button>
						<CustomDialog
							classNames={{
								content: "gap-0 p-12 md:p-12 max-w-[500px]",
							}}
							trigger={
								<Button
									variant="secondary"
									className="w-full rounded-md border-abeg-primary py-3 text-base font-bold text-abeg-primary lg:rounded-lg"
								>
									Share this campaign
								</Button>
							}
						>
							<p className="text-center">
								Spread the word, share your campaign with friends, family, and
								the world. Every share brings us one step closer to making a
								difference
							</p>
							<div className="mt-6 flex w-full items-center justify-between rounded-lg bg-abeg-primary p-2 text-base text-white">
								<div className="flex w-full gap-1">
									<LinkIcon className="size-5" />
									<p>{campaign.url}</p>
								</div>
								<button
									className="flex shrink-0 gap-1 rounded-lg bg-white px-1 py-[5px] text-xs text-abeg-primary"
									onClick={handleShareLink(campaign.url)}
								>
									<FilesIcon className="size-4" />
									Copy link
								</button>
							</div>
							<div className="mt-6 flex w-full items-center justify-between gap-4 text-base">
								<hr className="my-1 basis-full border border-placeholder" />
								<p className="shrink-0">or share on</p>
								<hr className="my-1 basis-full border border-placeholder" />
							</div>
							<div className="mt-6 flex w-full items-center justify-between">
								<Link
									href={generateTweet(
										campaign.title,
										campaign.url,
										campaign.tags
									)}
									target="_blank"
									className="flex w-full items-center gap-2"
								>
									<Image src={xIcon as string} width={32} height={32} alt="" />
									Twitter (X)
								</Link>
								<Link
									href={generateWhatsAppMessage(campaign.title, campaign.url)}
									target="_blank"
									className="flex w-full items-center justify-end gap-2"
								>
									<Image
										src={whatsappIcon as string}
										width={32}
										height={32}
										alt=""
									/>
									Whatsapp
								</Link>
							</div>
						</CustomDialog>
					</article>
					<article className="space-y-7">
						<figure className="flex items-start gap-[10px] text-sm lg:text-base">
							<MoneyIcon className="mt-[5px] size-6 shrink-0" />
							<figcaption>
								Be the first to donate to this fundraiser, every penny donated
								will go a long way
							</figcaption>
						</figure>
						<figure className="flex items-center gap-[10px] text-sm lg:text-base">
							<DonorIcon className="shrink-0" />
							<figcaption>0 total donors</figcaption>
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
				<section className="mt-14 text-[18px]">
					<article>
						<Heading
							as="h3"
							className="flex gap-4 border-b border-b-placeholder p-2 text-xl"
						>
							Category:
							<span className="font-normal">{campaign.category?.name}</span>
						</Heading>
						<Heading
							as="h3"
							className="mt-3 border-b border-b-placeholder p-2 text-xl lg:mt-6"
						>
							Story
						</Heading>
						<div
							className="mt-6 min-h-16 text-justify lg:text-xl"
							dangerouslySetInnerHTML={{
								__html: campaign.storyHtml,
							}}
						/>
						<p className="mt-6 lg:mt-12 lg:text-2xl">
							Campaign closes on: {format(campaignDeadline, "dd-MM-yyyy")}.
						</p>
						<TagList
							className="mt-4 space-y-2 font-medium"
							each={campaign.tags}
							render={(tag, index) => (
								<li key={`${tag}-${index}`} className="flex min-w-0">
									<p className="truncate">{tag}</p>
								</li>
							)}
						/>
					</article>
					<article className="mt-12 flex items-start gap-6">
						<DummyAvatar className="size-[82px]" />
						<div>
							<p className="flex flex-col">
								{fundraiserTarget} is in charge of this fundraiser.
								<span className="mt-4">{campaign.country}</span>
							</p>
							<Button
								variant="primary"
								className="mt-8 w-full rounded-md bg-abeg-primary py-3 text-base font-bold lg:mt-8 lg:py-4 lg:text-base"
							>
								Reach out
							</Button>
						</div>
					</article>
				</section>
			</div>
		</main>
	);
}

CampaignOutlook.Header = function CampaignOutlookHeader(
	props: CampaignHeaderProps
) {
	const { children, className } = props;

	return <header className={cn("w-full", className)}>{children}</header>;
};

export default CampaignOutlook;
