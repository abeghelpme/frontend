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
		<BaseLayout>
			<NextSeo
				title="Get started"
				description="Get started with Abeghelp.me and join the effortless way to raise funds and make a difference and empower your cause"
				canonical="https://www.abeghelp.me/get-started"
				openGraph={{
					url: "https://www.abeghelp.me/get-started",
					title: "Get Started",
					description:
						"Get started with Abeghelp.me and join the effortless way to raise funds and make a difference and empower your cause",
					images: [
						{
							url: "https://www.abeghelp.me/get-started",
							width: 800,
							height: 600,
							alt: "Get started image",
						},
					],
				}}
				twitter={{
					cardType: "summary_large_image",
				}}
			/>
			<Hero
				h1Tag="Be part of the change makers today!"
				pTag="Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me"
				button1={{ href: "/c/create", text: "Donate now", className: "px-10" }}
				imageSrc={campaignHero}
			/>
			<div className="flex flex-col justify-center gap-8 md:gap-20 py-10 md:py-20">
				<CampaignCategories
					className="px-5 md:px-20"
					allCampaignCategories={allCampaignCategories}
				/>
				<HowItWorks className="px-5 md:px-20" />
				<SuccessStories className="px-5 md:px-20" />
				<UrgentFundraisers featuredCampaigns={featuredCampaigns} />
				<FAQ className="px-5 md:px-20" />
			</div>
		</BaseLayout>
	);
};
export default Campaigns;

// import { SuccessStories } from "@/components/campaigns-page";
// import {
//   CampaignCategories,
//   FAQ,
//   Hero,
//   HowItWorks,
//   UrgentFundraisers,
// } from "@/components/common/landingPage";
// import type { ApiResponse } from "@/interfaces";
// import type { AllCampaignCategories, Campaign } from "@/interfaces/Campaign";
// import { BaseLayout } from "@/layouts";
// import { campaignHero } from "@/public/assets/images/landing-page";
// import type { GetStaticProps } from "next";
// import { NextSeo } from "next-seo";

// export const getStaticProps: GetStaticProps<{
//   featuredCampaigns: Campaign[];
//   allCampaignCategories: AllCampaignCategories[];
// }> = async () => {
//   try {
//     const res1 = await fetch(
//       "https://api.abeghelp.me/api/v1/campaign/categories"
//     );
//     const res2 = await fetch(
//       "https://api.abeghelp.me/api/v1/campaign/featured"
//     );
//     const data1: ApiResponse<AllCampaignCategories[]> = await res1.json();
//     const data2: ApiResponse<Campaign[]> = await res2.json();

//     if (data1.error || !data1.data || data2.error || !data2.data) {
//       return { notFound: true };
//     }

//     return {
//       props: {
//         featuredCampaigns: data2.data,
//         allCampaignCategories: data1.data,
//       },
//       revalidate: 24 * 60, // 24 hours
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return { notFound: true };
//   }
// };

// const Campaigns = ({
//   featuredCampaigns,
//   allCampaignCategories,
// }: {
//   featuredCampaigns: Campaign[];
//   allCampaignCategories: AllCampaignCategories[];
// }) => {
//   return (
//     <BaseLayout>
//       <NextSeo
//         title="Get started"
//         description="Get started with Abeghelp.me and join the effortless way to raise funds and make a difference and empower your cause"
//         canonical="https://www.abeghelp.me/get-started"
//         openGraph={{
//           url: "https://www.abeghelp.me/get-started",
//           title: "Get Started",
//           description:
//             "Get started with Abeghelp.me and join the effortless way to raise funds and make a difference and empower your cause",
//           images: [
//             {
//               url: "https://www.abeghelp.me/get-started",
//               width: 800,
//               height: 600,
//               alt: "Get started image",
//             },
//           ],
//         }}
//         twitter={{
//           cardType: "summary_large_image",
//         }}
//       />
//       <Hero
//         h1Tag="Be part of the change makers today!"
//         pTag="Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me"
//         button1={{ href: "/c/create", text: "Donate now" }}
//         imageSrc={campaignHero}
//       />
//       <div className="flex flex-col justify-center gap-8 md:gap-20 py-10 md:py-20">
//         <UrgentFundraisers featuredCampaigns={featuredCampaigns} />
//         <CampaignCategories
//           className="px-5 md:px-20"
//           allCampaignCategories={allCampaignCategories}
//         />
//         <HowItWorks className="px-5 md:px-20" />
//         <SuccessStories className="px-5 md:px-20" />
//         <FAQ className="px-5 md:px-20" />
//       </div>
//     </BaseLayout>
//   );
// };
// export default Campaigns;
