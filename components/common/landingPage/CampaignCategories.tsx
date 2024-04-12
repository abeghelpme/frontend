import { Button } from "@/components/ui";
import type { AllCampaignCategories } from "@/interfaces";
import { cn } from "@/lib";
import { useRouter } from "next/router";

type CategoriesMap = {
	[key: string]: string;
};

const categoriesColors: CategoriesMap = {
	0: "bg-[#A8CCCC]",
	1: "bg-[#E6E6E6]",
	2: "bg-[#455A64]",
	3: "bg-[#2B908E]",
	4: "bg-[#ACDCDC]",
	5: "bg-[#D6BBFB]",
	6: "bg-[#FFC3C2]",
	7: "bg-[#D2D2D2]",
	8: "bg-[#D2D2D2]",
	9: "bg-[#A8CCCC]",
	10: "bg-[#8BD2BD]",
	default: "bg-abeg-primary",
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
									categoriesColors[id] ?? categoriesColors.default
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
