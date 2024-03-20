import {
	DonorIcon,
	DonorIcon2,
	DummyAvatar,
	MoneyIcon,
	ShareIcon,
	whatsappIcon,
	xIcon,
} from "@/components/common/campaign-icons";
import type { Campaign } from "@/interfaces/Campaign";
import { cn } from "@/lib";
import { getDateFromString } from "@/lib/helpers/campaign";
import { useDragScroll, useElementList, useShareCampaign } from "@/lib/hooks";
import { useSlot } from "@/lib/hooks/useSlot";
import { format } from "date-fns";
import { FilesIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ClockIcon, CustomDialog, LocationIcon } from "../common";
import Heading from "../common/Heading";
import { Button, ProgressBar } from "../ui";
import Card from "../ui/card";
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

	const [CardList] = useElementList();

	const dragScrollProps = useDragScroll<HTMLUListElement>();

	const HeaderSlot = useSlot(children, CampaignOutlook.Header);

	const { generateTweet, generateWhatsAppMessage, handleShareLink } =
		useShareCampaign();

	const fundraiserTarget =
		campaign.fundraiser === "INDIVIDUAL"
			? `${campaign.creator?.firstName} ${campaign.creator?.lastName}`
			: "BENEFICIARY";

	const campaignDeadline = getDateFromString(campaign.deadline);

	return (
		<main className="flex w-full flex-col items-center pb-20 text-abeg-text">
			<section className="bg-abeg-primary bg-heroBg px-[clamp(24px,7.1vw,100px)] pb-14 pt-11 text-white ">
				{HeaderSlot}

				<p className="mt-3 text-pretty lg:text-xl">{excerpt}</p>

				<div className="mt-6 flex items-center justify-between">
					<figure className="flex items-center gap-3 text-xl">
						<DummyAvatar className="size-10" />

						<figcaption>{fundraiserTarget}</figcaption>
					</figure>

					<button className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-xl font-bold">
						Donate
					</button>
				</div>

				<CampaignCarousel
					images={campaign.images}
					classNames={{ base: "mt-8" }}
				/>

				<div className="relative mt-6">
					<TagList
						className="flex flex-wrap gap-5"
						each={campaign.tags}
						render={(tag, index) => (
							<li
								key={`${tag}-${index}`}
								className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-xl font-bold "
							>
								<p>{tag}</p>
							</li>
						)}
					/>

					<button className="absolute right-0 top-0 rounded-full border border-white bg-abeg-text/40 p-2 active:scale-[1.03]">
						<ShareIcon />
					</button>
				</div>
			</section>

			<div className="flex flex-col px-[clamp(24px,7.1vw,100px)] max-lg:items-center lg:flex-row-reverse lg:gap-5">
				<section className="mt-16 max-w-[385px] space-y-5 px-[18px] py-6 lg:max-w-[505px]">
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
						<figure className="flex items-start gap-2.5 text-sm lg:text-base">
							<MoneyIcon className="mt-[5px] size-6 shrink-0" />
							<figcaption>
								Be the first to donate to this fundraiser, every penny donated
								will go a long way
							</figcaption>
						</figure>
						<figure className="flex items-center gap-2.5 text-sm lg:text-base">
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

				<section className="mt-14 text-xl lg:max-w-[714px]">
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
							className="mt-6 min-h-16 text-justify text-[18px] lg:text-xl"
							dangerouslySetInnerHTML={{
								__html: campaign.storyHtml,
							}}
						/>
						<p className="mt-6 lg:mt-12 lg:text-2xl">
							Campaign closes on: {format(campaignDeadline, "dd-MM-yyyy")}.
						</p>

						<TagList
							className="mt-4 font-medium max-lg:space-y-2 lg:grid lg:grid-cols-3 lg:gap-x-2 lg:gap-y-6 lg:text-2xl"
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

			<section className="mt-[72px] w-full pl-[clamp(24px,7.1vw,100px)]">
				<header className="lg:flex lg:flex-row lg:items-center lg:justify-between">
					<div className="space-y-2.5">
						<Heading as="h3" className="text-xl font-normal">
							Donate Today
						</Heading>

						<Heading as="h3" className="text-4xl lg:text-[42px]">
							Urgent Fundraiser
						</Heading>

						<p className="text-xl lg:text-2xl">
							Join our community of change makers and make an impact today
						</p>
					</div>

					<Button className="mt-4 border border-placeholder font-extrabold text-placeholder">
						<Link href="/explore">Explore campaigns</Link>
					</Button>
				</header>

				<CardList
					{...dragScrollProps}
					className="mt-[2.4rem] flex w-full cursor-grab gap-4 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
					each={[...Array(4).keys()]}
					render={(item) => (
						<Card
							key={item}
							as="li"
							className="w-full max-w-[383px] shrink-0 space-y-[25px] lg:max-w-[396px]"
						>
							<Card.Header
								className="h-[263px] rounded-md"
								style={{
									backgroundImage: `url(/assets/images/dashboard/dashboardImage.png)`,
								}}
							>
								<article className="flex size-full select-none flex-col items-start justify-between p-[25px] text-xs text-white">
									<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
										<LocationIcon />
										<figcaption>Lagos, Nigeria</figcaption>
									</figure>

									<div className="flex w-full justify-between">
										<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
											<DonorIcon2 className="size-4" />
											<figcaption> 235,567 total donors</figcaption>
										</figure>

										<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
											<ClockIcon />
											<figcaption>20 days left</figcaption>
										</figure>
									</div>
								</article>
							</Card.Header>

							<Card.Content>
								<Heading
									as="h4"
									className="w-[80%] text-base font-bold lg:text-base"
								>
									Bringing Dental Care to Underserved Communities
								</Heading>

								<p className="mt-2 text-sm font-medium">
									By: {fundraiserTarget} - {campaign.category?.name}
								</p>
							</Card.Content>

							<Card.Footer className="flex flex-col gap-2">
								<ProgressBar
									value={70}
									className="progress-unfilled:h-1 progress-unfilled:rounded-lg progress-unfilled:bg-lightGreen progress-filled:rounded-lg progress-filled:bg-abeg-primary"
								/>

								<p className="text-xs font-medium text-abeg-primary">
									₦2,000,000 raised
								</p>
							</Card.Footer>
						</Card>
					)}
				/>
			</section>
		</main>
	);
}

function CampaignOutlookHeader(props: CampaignHeaderProps) {
	const { children, className } = props;

	return <header className={cn("w-full", className)}>{children}</header>;
}
CampaignOutlookHeader.slot = "header";

CampaignOutlook.Header = CampaignOutlookHeader;

export default CampaignOutlook;
