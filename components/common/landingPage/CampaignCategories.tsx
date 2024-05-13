import { Button } from "@/components/ui";
import type { AllCampaignCategories } from "@/interfaces";
import { cn } from "@/lib";
import { useRouter } from "next/router";

type CategoriesMap = {
	[key: string]: string;
};

// const categoriesColors: CategoriesMap = {
//   0: 'bg-[#571333]', // Contrasting color for #A8CCCC
//   1: 'bg-[#191919]', // Contrasting color for #E6E6E6
//   2: 'bg-[#BAA6A6]', // Contrasting color for #455A64
//   3: 'bg-[#D47171]', // Contrasting color for #2B908E
//   4: 'bg-[#532323]', // Contrasting color for #ACDCDC
//   5: 'bg-[#294504]', // Contrasting color for #D6BBFB
//   6: 'bg-[#003D3D]', // Contrasting color for #FFC3C2
//   7: 'bg-[#2D2D2D]', // Contrasting color for #D2D2D2
//   8: 'bg-[#2D2D2D]', // Contrasting color for #D2D2D2
//   9: 'bg-[#571333]', // Contrasting color for #A8CCCC
//   10: 'bg-[#742E42]', // Contrasting color for #8BD2BD
//   default: 'bg-abeg-primary'
// };

// const categoriesColors: CategoriesMap = {
//   0: 'bg-[#800000]', // Maroon
//   1: 'bg-[#808000]', // Olive
//   2: 'bg-[#008000]', // Green
//   3: 'bg-[#800080]', // Purple
//   4: 'bg-[#000080]', // Navy
//   5: 'bg-[#808080]', // Gray
//   6: 'bg-[#2F4F4F]', // Dark Slate Gray
//   7: 'bg-[#696969]', // Dim Gray
//   8: 'bg-[#708090]', // Slate Gray
//   9: 'bg-[#778899]', // Light Slate Gray
//   10: 'bg-[#483D8B]', // Dark Slate Blue
//   default: 'bg-abeg-primary'
// };
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
				<h1 className="text-2xl md:text-3xl font-bold">Campaign Categories</h1>
				<p className="text-base md:text-lg text-placeholder font-medium max-w-[540px]">
					See the list of campaign categories in Abeghelp.me and get started to
					empower your cause and that of others
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 text-white">
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
									`hover:transition-all duration-500 hover:scale-110 text-center p-6 rounded-lg font-bold text-base md:text-lg truncate border-abeg-primary border text-abeg-primary hover:bg-abeg-primary hover:text-white`
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
