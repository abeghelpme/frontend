import { DonorSection, Heading } from "@/components/create-campaign";
import CampaignCarousel from "@/components/create-campaign/CampaignCarousel";
import { Button, ProgressBar } from "@/components/ui";
import type { Campaign } from "@/interfaces/Campaign";
import { callApi, getDateFromString } from "@/lib/helpers/campaign";
import { useCopyToClipboard, useElementList } from "@/lib/hooks";
import {
	DonorIcon,
	DummyAvatar,
	MoneyIcon,
} from "@/public/assets/icons/campaign";
import { format } from "date-fns";
import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from "next";
import { toast } from "sonner";

export const getStaticPaths = (async () => {
	// const { data, error } = await callBackendApi<Campaign[]>(
	// 	`/campaign/all?limit=100&status=published` // remove published to test in development
	// );
	const { data, error } = await callApi<Campaign[]>("/campaign/all?limit=100");

	if (error || !data.data) {
		return {
			paths: [],
			fallback: "blocking",
		};
	}

	const campaignData = data.data.filter(
		(campaign) => campaign.status !== "Draft"
	);

	const paths = campaignData.map((campaign) => ({
		params: { shortId: campaign.url.split("/c/")[1] },
	}));

	return {
		paths,
		fallback: "blocking",
	};
}) satisfies GetStaticPaths;

export const getStaticProps = async function (context) {
	const { shortId } = context.params as { shortId: string };

	const { data, error } = await callApi<Campaign>(`/campaign/one/${shortId}`);

	if (error || !data.data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { campaign: data.data },
	};
} satisfies GetStaticProps<{ campaign: Campaign }>;

function CampaignView({
	campaign,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { copyToClipboard } = useCopyToClipboard();
	const { For: TagList } = useElementList();

	const fundraiserTarget =
		campaign.fundraiser === "INDIVIDUAL"
			? `${campaign?.creator?.firstName} ${campaign?.creator?.lastName}`
			: "BENEFICIARY";

	const campaignDeadline = getDateFromString(campaign.deadline);

	const handleShareLink = () => {
		copyToClipboard(campaign.url);

		toast.success("Campaign link copied to clipboard!", {
			duration: 1500,
		});
	};

	return (
		<div className="mt-8 flex flex-col items-center gap-2 lg:mt-12 lg:gap-7">
			<header className="w-full px-6 max-lg:max-w-[480px] lg:px-[100px]">
				<Heading as="h1" className="text-xl lg:text-[32px]">
					{`${campaign.title[0].toUpperCase()}${campaign.title.slice(1)}`}
				</Heading>
			</header>

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

							<Button
								variant="secondary"
								className="w-full rounded-md border-abeg-primary py-3 text-sm font-bold text-abeg-primary lg:rounded-lg lg:text-base"
								onClick={handleShareLink}
							>
								Share this campaign
							</Button>
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
							className="mt-6 min-h-16 lg:text-xl"
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
										#<p className="truncate">{tag}</p>
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
		</div>
	);
}

export default CampaignView;
