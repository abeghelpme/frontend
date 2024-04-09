import { Button } from "@/components/ui";
import type { AllCampaignCategories } from "@/interfaces";
import { cn } from "@/lib";
import { useRouter } from "next/router";

type CategoriesMap = {
	[key: string]: string;
};

const categoriesColors: CategoriesMap = {
	"Health & Wellness": "bg-[#A8CCCC]",
	Business: "bg-[#E6E6E6]",
	Family: "bg-[#455A64]",
	Emergency: "bg-[#2B908E]",
	Religion: "bg-[#ACDCDC]",
	Medical: "bg-[#D6BBFB]",
	Volunteer: "bg-[#FFC3C2]",
	Education: "bg-[#D2D2D2]",
	Events: "bg-[#D2D2D2]",
	Wedding: "bg-[#A8CCCC]",
	Others: "bg-[#8BD2BD]",
};
const CampaignCategories = ({
	className,
	allCampaignCategories,
}: {
	className?: string;
	allCampaignCategories?: AllCampaignCategories[];
}) => {
	const router = useRouter();

	return (
		<div className={cn("flex flex-col gap-12 justify-center pb-10", className)}>
			<div className="w-full flex flex-col gap-2">
				<h1 className="text-4xl font-bold md:text-5xl">Campaign Categories</h1>
				<p className="text-xl text-placeholder font-medium max-w-[540px]">
					See the list of campaign categories in Abeghelp.me and get started to
					empower your cause and that of others
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
				{allCampaignCategories &&
					allCampaignCategories.map((category, id) => {
						return (
							<Button
								key={id}
								onClick={() =>
									void router.push({
										pathname: `/explore/${category._id}`,
										query: {
											name: category.name,
										},
									})
								}
								className={cn(
									`text-center p-6 rounded-lg font-bold text-xl truncate`,
									categoriesColors[category.name]
								)}
							>
								{category.name} ({category.count})
							</Button>
						);
					})}
			</div>
		</div>
	);
};
export default CampaignCategories;
