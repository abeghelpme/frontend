import TestimonialCard from "@/components/common/TestimonialCard";
import HowItWorks from "@/components/common/landingPage/HowItWorks";
import { CampaignCategoryCard } from "@/components/explore-campaign";
import { Button, Input } from "@/components/ui";
import type { ApiResponse } from "@/interfaces";
import type { AllCampaignCategories, Campaign } from "@/interfaces/Campaign";
import { BaseLayout } from "@/layouts";
import { callApi, cn } from "@/lib";
import { useDragScroll, usePaginate } from "@/lib/hooks";
import {
	heroCircle,
	heroHalfMoon,
	searchIcon,
} from "@/public/assets/images/campaign-category";
import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export const getStaticPaths = (async () => {
	const { data, error } = await callApi<ApiResponse<Campaign[]>>(
		"/campaign/categories"
	);

	if (error || !data?.data || data.data.length === 0) {
		return {
			paths: [],
			fallback: false,
		};
	}

	return {
		paths: data.data.map((category) => ({
			params: { categoryId: category?._id },
		})),

		fallback: false,
	};
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
	const { categoryId } = context.params as { categoryId: string };

	const [allCampaigns, allCampaignCategories] = await Promise.all([
		callApi<ApiResponse<Campaign[]>>(
			`/campaign/all?isPublished=true&limit=12${`&category=${categoryId}`}`
		),
		callApi<ApiResponse<AllCampaignCategories[]>>("/campaign/categories"),
	]);
	if (
		allCampaigns.error ||
		!allCampaigns?.data?.data ||
		allCampaignCategories.error ||
		!allCampaignCategories?.data?.data
	) {
		return { props: { allCampaigns: [], allCampaignCategories: [] } };
	}
	return {
		props: {
			allCampaigns: allCampaigns.data.data,
			allCampaignCategories: allCampaignCategories.data.data,
		},
		revalidate: 30 * 60,
	};
}) satisfies GetStaticProps<{
	allCampaigns: Campaign[];
	allCampaignCategories: AllCampaignCategories[];
}>;

const ExploreCampaignPage = ({
	allCampaigns: campaigns,
	allCampaignCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const params = useSearchParams();
	const categoryName = params.get("name");

	const { currentPage, data, hasMore, hasPrevious } = usePaginate(
		"/campaign/all",
		{
			startPage: 2,
		}
	);

	const { dragScrollProps, dragContainerClasses } =
		useDragScroll<HTMLDivElement>();

	return (
		<BaseLayout>
			<div className="relative flex flex-col items-center space-y-4 overflow-hidden bg-cover bg-center px-5 py-28 text-gray-50 md:px-20 md:py-32">
				<Image
					src="/assets/images/landing-page/background.png"
					className="z-[-1] object-cover object-center"
					fetchPriority="high"
					priority={true}
					alt=""
					fill
				/>
				<Image
					src={heroHalfMoon}
					alt="hero svg icon"
					fetchPriority="high"
					priority={true}
					width={90}
					height={90}
					className="absolute right-[-2rem] top-[27rem] md:left-16 md:top-16 md:-translate-y-0 md:translate-x-0 lg:left-40 lg:top-32"
				/>
				<h1 className="pr-5 text-4xl  font-bold leading-tight md:flex md:justify-center md:pr-0 md:text-5xl md:leading-snug">
					{categoryName}
				</h1>
				<p className="max-w-[500px] pr-8 text-base text-gray-50 md:pr-0 md:text-center md:text-lg">
					Join the effortless way to fund-raise and make a difference and
					empower your cause with Abeghelp.me
				</p>
				<div className="relative flex w-full flex-row justify-center gap-2 pt-5 md:w-[40rem] md:gap-5 md:pt-8">
					<div className="flex flex-1 items-center">
						<Input
							placeholder="Type your enquiry here"
							searchInputClassName="w-full"
							className="relative w-full bg-transparent px-4 pl-12 text-white ring-1 ring-white placeholder:text-gray-200 md:max-w-[30rem] md:py-5"
						/>
						<Image
							src={searchIcon}
							alt="search icon"
							priority
							width={25}
							height={25}
							className="absolute bottom-0 left-3 -translate-y-1/2 md:bottom-2"
						/>
					</div>
					<Button className=" bg-white text-base font-bold text-abeg-primary md:px-9">
						Search
					</Button>
				</div>
				<Image
					src={heroCircle}
					alt="hero svg icon"
					fetchPriority="high"
					priority={true}
					width={150}
					height={150}
					className="md: absolute right-[-3rem] top-20 -translate-x-1/2 -translate-y-1/2 md:right-0 md:top-[25rem] md:-translate-y-0 md:translate-x-0 lg:bottom-40 lg:right-40"
				/>
			</div>

			<div className="flex flex-col gap-10 pt-10 md:gap-20 md:py-20">
				<div className="flex w-full flex-col gap-8">
					<div className="flex flex-col gap-2 px-5 md:px-20 ">
						<h1 className="text-2xl font-bold md:w-full md:text-3xl">
							Explore our {`${categoryName?.toLowerCase()} campaigns`}
						</h1>
						<p className="text-base font-medium text-placeholder md:w-3/6 md:text-lg">
							Join the effortless way to fund-raise and make a difference and
							empower your cause with Abeghelp.me
						</p>
					</div>
					<div
						{...dragScrollProps}
						className={cn(
							"flex justify-between gap-8 text-black",
							dragContainerClasses
						)}
					>
						{allCampaignCategories.map((category, id) => {
							return (
								<Button
									asChild
									key={id}
									className={cn(
										"whitespace-nowrap rounded-none p-0 py-1 text-base text-black",
										categoryName === category.name
											? "border-b-4 border-b-abeg-primary font-bold text-abeg-primary"
											: ""
									)}
								>
									<Link
										href={{
											pathname: `/explore/${category._id}`,
											query: {
												name: category.name,
											},
										}}
									>
										{category.name}
									</Link>
								</Button>
							);
						})}
					</div>

					<CampaignCategoryCard
						allCampaigns={campaigns}
						categoryName={categoryName}
					/>
				</div>

				<HowItWorks className="px-5 md:px-20" />
				<TestimonialCard />
			</div>
		</BaseLayout>
	);
};
export default ExploreCampaignPage;
