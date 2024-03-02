import type { ApiResponse } from "@/interfaces";
import { callApi } from "@/lib";
import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from "next";

interface Creator {
	_id: string;
	firstName: string;
	lastName: string;
}

interface Category {
	isDeleted: boolean;
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

interface Image {
	secureUrl: string;
	blurHash: string;
	_id: string;
}

interface Campaign {
	_id: string;
	creator: Creator;
	status: string;
	category: Category;
	country: string;
	createdAt: string;
	featured: boolean;
	flaggedReasons: string[];
	images: Image[];
	isFlagged: boolean;
	tags: string[];
	updatedAt: string;
	deadline: string;
	fundraiser: string;
	goal: number;
	title: string;
	story: string;
	storyHtml: string;
	url: string;
}

export const getStaticPaths = (async () => {
	const { data, error } = await callApi<ApiResponse<Campaign[]>>(
		`/campaign/all?limit=100&status=published` // remove published to test in development
	);

	if (error || !data?.data) {
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
	const { shortId } = context?.params as { shortId: string };

	const { data, error } = await callApi<ApiResponse<Campaign>>(
		`/campaign/one/${shortId}`
	);

	if (error || !data?.data) {
		return {
			notFound: true,
		};
	}

	return { props: { campaign: data.data } };
}) satisfies GetStaticProps<{
	campaign: Campaign;
}>;

const GetOneCampaign = ({
	campaign,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	console.log(campaign);
	return <div>hello</div>;
};

export default GetOneCampaign;
