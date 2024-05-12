import { CampaignCardList } from "@/components/common/CampaignCard";
import { FAQ } from "@/components/common/landingPage";
import { Button } from "@/components/ui";
import type { ApiResponse } from "@/interfaces";
import type { Campaign } from "@/interfaces/Campaign";
import { BaseLayout } from "@/layouts";
import { callApi } from "@/lib";
import {
	heroCircle,
	heroHalfMoon,
	searchIcon,
} from "@/public/assets/images/campaign-category";
import {
	howItWorkHero,
	howItWorksSplash,
} from "@/public/assets/images/how-it-works";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const howItWorksData = [
	{
		title: "Create an account",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis, purus a efficitur congue, arcu sem semper enim, sit amet iaculis neque purus in dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam quis lectus ac nibh porttitor tincidunt sed ac augue. Nunc viverra sed nisl eget scelerisque. Quisque finibu faucibus elementum. Donec scelerisque lectus id orci tempus sagittis ut in dolor.",
	},
	{
		title: "Start a Campaign",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis, purus a efficitur congue, arcu sem semper enim, sit amet iaculis neque purus in dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam quis lectus ac nibh porttitor tincidunt sed ac augue. Nunc viverra sed nisl eget scelerisque. Quisque finibu faucibus elementum. Donec scelerisque lectus id orci tempus sagittis ut in dolor.",
	},
	{
		title: "Get your dreams funded!",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis, purus a efficitur congue, arcu sem semper enim, sit amet iaculis neque purus in dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam quis lectus ac nibh porttitor tincidunt sed ac augue. Nunc viverra sed nisl eget scelerisque. Quisque finibu faucibus elementum. Donec scelerisque lectus id orci tempus sagittis ut in dolor.",
	},
];

export const getStaticProps = (async () => {
	const featuredCampaigns = await callApi<ApiResponse<Campaign[]>>(
		"/campaign/featured?limit=6"
	);
	if (featuredCampaigns.error || !featuredCampaigns.data?.data) {
		return { notFound: true };
	}
	return {
		props: {
			featuredCampaigns: featuredCampaigns.data.data,
		},
		revalidate: 24 * 60, // 24 hours
	};
}) satisfies GetStaticProps<{
	featuredCampaigns: Campaign[];
}>;

const HowItWorks = ({
	featuredCampaigns,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter();
	return (
		<BaseLayout>
			<div className="relative flex justify-center overflow-hidden bg-cover bg-center px-5 md:px-20 pt-20 pb-48 md:pb-56">
				<Image
					src="/assets/images/landing-page/background.png"
					className="z-[-1] object-cover object-center"
					fetchPriority="high"
					priority={true}
					alt=""
					fill
				/>
				<div className="w-full lg:mx-12 xl:mx-32">
					<Image
						src={howItWorkHero}
						fetchPriority="high"
						priority={true}
						alt=""
						width={300}
						height={300}
						className="w-full aspect-video object-cover h-72 md:h-96 rounded-lg"
					/>
				</div>
				<Image
					src={heroHalfMoon}
					alt="hero svg icon"
					fetchPriority="high"
					priority={true}
					width={90}
					height={90}
					className="absolute top-4 left-2 md:left-16 md:top-16 md:-translate-y-0 md:translate-x-0 lg:left-40 lg:top-32"
				/>

				<Image
					src={heroCircle}
					alt="hero svg icon"
					fetchPriority="high"
					priority={true}
					width={150}
					height={150}
					className="md: absolute right-[-4rem] top-60 md:right-0 md:top-[25rem] "
				/>
				<div className="absolute top-[21.5rem] md:top-[27.5rem] text-white flex flex-col gap-2 max-w-96 md:max-w-[600px] text-center px-5">
					<h3 className="text-4xl  md:text-5xl font-extrabold">How It Works</h3>
					<p className="font-medium text-base md:text-xl">
						Join the effortless way to fundraise and make a difference and
						empower your cause with Abeghelp.me
					</p>
				</div>
			</div>
			<section className="py-16 flex flex-col gap-14 md:gap-16">
				<div className="flex flex-col-reverse md:flex-row gap-8 md:gap-16 lg:gap-24 px-5 md:px-20 ">
					<FAQ className="w-full px-0 py-0 md:px-0 md:py-0" />
					<div className="md:relative w-full">
						<div className="flex flex-col gap-8 md:gap-12 md:sticky md:top-5 ">
							{howItWorksData.map((data, id) => {
								return (
									<div className="flex flex-col gap-3" key={id}>
										<h5 className="text-xl md:text-2xl font-bold">
											{id + 1}. {data.title}
										</h5>
										<p className="text-justify text-base md:text-lg">
											{data.text}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<Image
					src={howItWorksSplash}
					alt="how it works splash image"
					width={200}
					height={200}
					className="aspect-video w-full object-cover h-72 md:h-96"
				/>
				<div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24 px-5 md:px-20 lg:px-32">
					<div className="flex flex-col gap-5 bg-abeg-primary w-full p-8 text-white text-center justify-center">
						<p className="text-xl md:text-2xl font-extralight leading-normal">
							“Abeghelp.me is one of those platforms that gives you space to
							share your dreams, not just with people who know you, love you,
							and support you, but with even more.”
						</p>
						<div>
							<p className="text-2xl md:text-3xl">- John Doe</p>
							<p className="text-xs">beneficiary of the abeghelpme platform</p>
						</div>
					</div>
					<div className="flex flex-col gap-6  w-full">
						<h5 className="text-2xl md:text-3xl font-bold ">
							Ready to start a Campaign?
						</h5>
						<p className="text-base md:text-lg leading-loose">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<Button className="border border-neutral-400 text-placeholder text-center font-bold text-base">
							<Link href="/">Create a Campaign</Link>
						</Button>
					</div>
				</div>
				<div className="flex flex-col gap-2 md:gap-4 px-5 md:px-20">
					<p className=" text-base md:text-xl font-medium text-placeholder md:w-3/6">
						Donate today
					</p>
					<h1 className="text-2xl font-bold md:text-3xl md:w-full">
						Explore Campaigns
					</h1>
					<p className="text-base md:text-xl  font-medium text-placeholder md:w-3/6">
						Join the effortless way to fund-raise and make a difference and
						empower your cause with Abeghelp.me
					</p>
					<CampaignCardList
						classNames={{ base: "mt-5 md:mt-10" }}
						cardDetailsArray={featuredCampaigns}
						listType="grid"
					/>
					<Button
						className="bg-abeg-primary text-white mt-10 md:w-1/2 lg:w-[40%] md:self-center"
						onClick={() =>
							void router.push({
								pathname: `/explore/${featuredCampaigns[0]?.category?._id}`,
								query: {
									name: featuredCampaigns[0]?.category?.name,
								},
							})
						}
					>
						See all campaigns
					</Button>
				</div>
			</section>
		</BaseLayout>
	);
};
export default HowItWorks;
