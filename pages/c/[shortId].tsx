import { Heading } from "@/components/create-campaign";
import { CampaignOutlook } from "@/components/create-campaign";
import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib/helpers/campaign";
import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from "next";

export const getStaticPaths = (async () => {
	const { data, error } = await callApi<Campaign[]>(
		"/campaign/all?limit=100&isPublished=true"
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

	console.log(data?.data);

	if (error || !data.data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { campaign: data.data },
	};
}) satisfies GetStaticProps<{ campaign: Campaign }>;

type CampaignViewProps = InferGetStaticPropsType<typeof getStaticProps>;

function CampaignView({ campaign }: CampaignViewProps) {
	return (
		<div className="mt-8 flex flex-col items-center gap-2 lg:mt-12 lg:gap-7">
			<header className="w-full px-6 max-lg:max-w-[480px] lg:px-[100px]">
				<Heading as="h1" className="text-xl lg:text-[32px]">
					{`${campaign.title[0].toUpperCase()}${campaign.title.slice(1)}`}
				</Heading>
			</header>

			<CampaignOutlook campaign={campaign} />
		</div>
	);
}

export default CampaignOutlook;
