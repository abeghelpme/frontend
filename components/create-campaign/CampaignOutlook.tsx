import type { Campaign } from "@/interfaces/Campaign";
import { getDateFromString } from "@/lib/helpers/campaign";
import { useElementList, useShareCampaign } from "@/lib/hooks";
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
import { Button, ProgressBar } from "../ui";
import CampaignCarousel from "./CampaignCarousel";
import DonorSection from "./DonorSection";
import Heading from "./Heading";

type CampaignOutlookProps = {
	campaign: Campaign;
};

function CampaignOutlook({ campaign }: CampaignOutlookProps) {
	const { For: TagList } = useElementList();

	const { generateTweet, generateWhatsAppMessage, handleShareLink } =
		useShareCampaign();

	const fundraiserTarget =
		campaign.fundraiser === "INDIVIDUAL"
			? `${campaign.creator.firstName} ${campaign.creator.lastName}`
			: "BENEFICIARY";

	const campaignDeadline = getDateFromString(campaign.deadline);

	return (
		<main className="flex flex-col bg-cover px-6 pb-16 text-abeg-text max-lg:max-w-[480px] lg:flex-row-reverse lg:gap-5 lg:px-[100px]">
			<section>
				<CampaignCarousel
					images={campaign.images}
					classNames={{ base: "lg:hidden" }}
				/>

				<div className="space-y-7 px-2 py-3 max-lg:mt-9 lg:px-6 lg:py-8">
					<article>
						<div className="flex items-center justify-between">
							<p className="font-bold">₦ {campaign.goal}</p>
							<p className="text-xs font-medium">
								₦1,000,000 <span className="text-placeholder">remaining</span>
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
							className="w-full rounded-md bg-abeg-primary py-3 text-sm font-bold lg:rounded-lg lg:text-base"
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
									className="w-full rounded-md border-abeg-primary py-3 text-xs font-bold text-abeg-primary lg:rounded-lg lg:text-base"
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

							<figcaption>235,567 total donors</figcaption>
						</figure>

						<figure className="flex items-center gap-2 text-sm lg:text-base">
							<DummyAvatar className="size-8 shrink-0" />
							<figcaption>
								{fundraiserTarget} is in charge of this fundraiser.
							</figcaption>
						</figure>
					</article>

					<DonorSection className="mx-6 max-lg:hidden" />
				</div>
			</section>

			<section className="mt-2 w-full lg:max-w-[717px]">
				<CampaignCarousel
					images={campaign.images}
					classNames={{ base: "max-lg:hidden" }}
				/>

				<article className="lg:mt-16">
					<Heading
						as="h3"
						className="flex gap-4 border-b border-b-placeholder p-2"
					>
						Category:
						<span className="font-normal">{campaign.category.name}</span>
					</Heading>

					<Heading
						as="h3"
						className="mt-3 border-b border-b-placeholder p-2 lg:mt-6"
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

					<ul className="mt-4 grid grid-cols-2 gap-x-0 gap-y-6 text-sm font-medium lg:mt-6 lg:grid-cols-3 lg:text-xl">
						<TagList
							each={campaign.tags}
							render={(tag, index) => (
								<li key={`${tag}-${index}`} className="flex min-w-0">
									<p className="truncate">{tag}</p>
								</li>
							)}
						/>
					</ul>
				</article>

				<DonorSection className="mt-6 lg:hidden" />

				<article className="mt-8 flex items-start gap-4 lg:mt-12 lg:max-w-[717px]">
					<DummyAvatar className="size-12 lg:size-[82px]" />

					<div>
						<p className="flex flex-col lg:text-xl">
							{fundraiserTarget} is in charge of this fundraiser.
							<span className="mt-8">{campaign.country}</span>
						</p>

						<Button
							variant="primary"
							className="mt-6 w-full max-w-[512px] rounded-md bg-abeg-primary py-3 text-sm font-bold lg:mt-8 lg:py-4 lg:text-base"
						>
							Reach out
						</Button>
					</div>
				</article>
			</section>
		</main>
	);
}

export default CampaignOutlook;
