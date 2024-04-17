import { SuccessStories } from "@/components/campaigns-page";
import {
	CampaignCategories,
	FAQ,
	Hero,
	HowItWorks,
	UrgentFundraisers,
} from "@/components/common/landingPage";
import type { ApiResponse } from "@/interfaces";
import type { AllCampaignCategories, Campaign } from "@/interfaces/Campaign";
import { BaseLayout } from "@/layouts";
import { callApi } from "@/lib";
import { campaignHero } from "@/public/assets/images/landing-page";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";

export const getStaticProps = (async () => {
	const [featuredCampaigns, allCampaignCategories] = await Promise.all([
		callApi<ApiResponse<Campaign[]>>("/campaign/featured"),
		callApi<ApiResponse<AllCampaignCategories[]>>("/campaign/categories"),
	]);

	if (
		featuredCampaigns.error ||
		!featuredCampaigns.data?.data ||
		allCampaignCategories.error ||
		!allCampaignCategories.data?.data
	) {
		return { notFound: true };
	}
	return {
		props: {
			featuredCampaigns: featuredCampaigns.data.data,
			allCampaignCategories: allCampaignCategories.data.data,
		},
		revalidate: 24 * 60, // 24 hours
	};
}) satisfies GetStaticProps<{
	featuredCampaigns: Campaign[];
	allCampaignCategories: AllCampaignCategories[];
}>;

const Campaigns = ({
	featuredCampaigns,
	allCampaignCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo
				canonical="https://www.abeghelp.me/explore"
				openGraph={{
					url: "https://www.abeghelp.me/explore",
					title: "Explore campaign categories",
					description:
						"Browse through different campaign categories to find the one that resonates with you.",
					images: [
						{
							url: "https://static.abeghelp.me/assets/explore.png",
							width: 800,
							height: 600,
						},
					],
				}}
				twitter={{
					cardType: "summary_large_image",
				}}
			/>
			<BaseLayout>
				<Hero
					h1Tag="Be part of the change makers today!"
					pTag="Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me"
					// button1={{ href: '/c/create', text: 'Donate now', className: 'px-10' }}
					imageSrc={campaignHero}
				/>
				<div className="flex flex-col justify-center gap-8 md:gap-20 py-10 md:py-20">
					<CampaignCategories
						className="px-5 md:px-20"
						allCampaignCategories={allCampaignCategories}
					/>
					<HowItWorks className="px-5 md:px-20" />
					<SuccessStories className="px-5 md:px-20 py-10 md:py-0" />
					<UrgentFundraisers featuredCampaigns={featuredCampaigns} />
					<FAQ className="px-5 md:px-20" />
				</div>
			</BaseLayout>
		</>
	);
};
export default Campaigns;
