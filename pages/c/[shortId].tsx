import { CampaignOutlook, Heading } from "@/components/create-campaign";
import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib/helpers/campaign";
import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from "next";
import { NextSeo } from "next-seo";

export const getStaticPaths = (async () => {
	const { data, error } = await callApi<Campaign[]>(
		"/campaign/all?limit=100&isPublished=true&status=Approved"
	);

	if (error || !data.data) {
		return {
			paths: [],
			fallback: "blocking",
		};
	}

	const paths = data.data.map((campaign) => ({
		params: { shortId: campaign.url.split("/c/")[1] },
	}));

	return {
		paths,
		fallback: "blocking",
	};
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
	const { shortId } = context.params as { shortId: string };

	const { data, error } = await callApi<Campaign>(`/campaign/one/${shortId}`);

	if (error || !data.data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { campaign: data.data },
		revalidate: 15 * 60, // 15 minutes in seconds
	};
}) satisfies GetStaticProps<{ campaign: Campaign }>;

type CampaignViewProps = InferGetStaticPropsType<typeof getStaticProps>;

function CampaignView({ campaign }: CampaignViewProps) {
	// Take the first 200 characters of the campaign story
	const first200Chars = campaign.story.substring(0, 200);

	// Find the last punctuation mark within the first 200 characters
	const lastPunctuationIndex = Math.max(
		first200Chars.lastIndexOf("."),
		first200Chars.lastIndexOf("!"),
		first200Chars.lastIndexOf("?")
	);

	// If a punctuation mark is found, use the substring from the start of the story to the last punctuation mark as the excerpt
	// If no punctuation mark is found, use the first 200 characters as the excerpt
	const excerpt =
		lastPunctuationIndex !== -1
			? first200Chars.substring(0, lastPunctuationIndex + 1)
			: first200Chars;

	return (
		<>
			<NextSeo
				title={campaign.title}
				description={excerpt}
				canonical={campaign.url}
				openGraph={{
					url: campaign.url,
					title: campaign.title,
					description: excerpt,
					...(campaign.images.length > 0 && {
						images: campaign.images.map((image) => {
							return {
								url: image?.secureUrl,
								width: 800,
								height: 600,
								alt: campaign.title,
							};
						}),
					}),
				}}
				twitter={{
					cardType: "summary_large_image",
				}}
			/>

			<div className="mt-8 flex flex-col items-center gap-2 lg:mt-12 lg:gap-7">
				<header className="w-full px-6 max-lg:max-w-[480px] lg:px-[100px]">
					<Heading as="h1" className="text-xl lg:text-[32px]">
						{`${campaign.title[0].toUpperCase()}${campaign.title.slice(1)}`}
					</Heading>
				</header>

				<CampaignOutlook campaign={campaign} />
			</div>
		</>
	);
}

export default CampaignView;
