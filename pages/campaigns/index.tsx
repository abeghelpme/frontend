import { SuccessStories } from "@/components/campaigns-page";
import {
	CampaignCategories,
	FAQ,
	Hero,
	HowItWorks,
	UrgentFundraisers,
} from "@/components/common/landingPage";
import type { Campaign } from "@/interfaces/Campaign";
import { BaseLayout } from "@/layouts";
import { callApi } from "@/lib/helpers/campaign";
import { campaignHero } from "@/public/assets/images/landing-page";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps = (async () => {
	const { data, error } = await callApi<Campaign[]>("/campaign/featured");

	if (error || !data.data) {
		return { notFound: true };
	}

	return {
		props: { featuredCampaigns: data.data },
		revalidate: 60, // 60 seconds
	};
}) satisfies GetStaticProps<{ featuredCampaigns: Campaign[] }>;

const Campaigns = ({
	featuredCampaigns,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<BaseLayout>
			<Hero
				h1Tag="Be part of the change makers today!"
				pTag="Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me"
				button1={{ href: "/c/create", text: "Donate now" }}
				imageSrc={campaignHero}
			/>
			<div className="flex flex-col justify-center gap-8 md:gap-20 md:py-20">
				<CampaignCategories className="px-5 md:px-20" />
				<HowItWorks className="px-5 md:px-20" />
				<SuccessStories className="px-5 md:px-20" />
				<UrgentFundraisers featuredCampaigns={featuredCampaigns} />
				<FAQ className="px-5 md:px-20" />
			</div>
		</BaseLayout>
	);
};
export default Campaigns;
