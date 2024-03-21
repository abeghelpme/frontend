import TestimonialCard from "@/components/common/TestimonialCard";
import { CampaignCategories } from "@/components/common/landingPage";
import HowItWorks from "@/components/common/landingPage/HowItWorks";
import { CampaignCategoryCard } from "@/components/explore-campaign-categories";
import { Button, Input } from "@/components/ui";
import { BaseLayout } from "@/layouts";
import {
	heroCircle,
	heroHalfMoon,
	searchIcon,
} from "@/public/assets/images/campaign-category";
import Image from "next/image";

const ExploreCampaignPage = () => {
	return (
		<BaseLayout>
			<div
				className="flex flex-col items-center py-28 md:py-32 md:px-20 space-y-4 px-5 text-gray-50  relative overflow-x-hidden"
				style={{
					backgroundImage: `url(/assets/images/landing-page/background.png)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Image
					src={heroHalfMoon}
					alt="hero svg icon"
					priority
					width={90}
					height={90}
					className="absolute top-[27rem] right-[-2rem] md:translate-x-0 md:-translate-y-0 md:top-16 md:left-16 lg:top-32 lg:left-40"
				/>
				<h1 className="md:flex md:justify-center pr-5 text-5xl font-bold md:pr-0 md:text-6xl md:leading-snug leading-tight">
					Health & Wellness
				</h1>
				<p className="pr-8 text-xl text-gray-50 md:pr-0 md:text-center max-w-[500px]">
					Join the effortless way to fundraise and make a difference and empower
					your cause with Abeghelp.me
				</p>
				<div className="pt-5 md:pt-8 flex flex-row gap-2 md:gap-5 justify-center relative w-full md:w-[40rem]">
					<div className="flex items-center">
						<Input
							placeholder="Type your enquiry here"
							className="px-4 md:py-5 bg-transparent ring-1 ring-white text-white w-full md:w-[30rem] pl-12 placeholder:text-gray-200 relative"
						/>
						<Image
							src={searchIcon}
							alt="search icon"
							priority
							width={25}
							height={25}
							className="absolute bottom-0 md:bottom-2 transform -translate-y-1/2 left-3 "
						/>
					</div>
					<Button className="flex flex-1 justify-center items-center bg-white text-abeg-primary font-bold w-full md:px-9 text-base">
						Search
					</Button>
				</div>
				<Image
					src={heroCircle}
					alt="hero svg icon"
					priority
					width={150}
					height={150}
					className="absolute top-20 right-[-3rem] transform -translate-x-1/2 -translate-y-1/2 md: md:translate-x-0 md:-translate-y-0 md:right-0 md:top-[25rem] lg:bottom-40 lg:right-40"
				/>
			</div>

			<div className="pt-10 md:pt-20 px-5 md:px-20">
				<CampaignCategoryCard />

				<div className="pt-10 md:pt-20">
					<CampaignCategories />
				</div>
				<div className="py-10 md:py-20">
					<HowItWorks />
				</div>

				<div className="pb-20">
					<TestimonialCard />
				</div>
			</div>
		</BaseLayout>
	);
};
export default ExploreCampaignPage;
