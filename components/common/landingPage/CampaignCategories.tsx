import { Button } from "@/components/ui";
import type { AllCampaignCategories } from "@/interfaces";
import { cn } from "@/lib";
import Link from "next/link";

const CampaignCategories = ({
	className,
	allCampaignCategories,
}: {
	className?: string;
	allCampaignCategories?: AllCampaignCategories[];
}) => {
	return (
		<div className={cn("flex flex-col justify-center gap-12 pb-10", className)}>
			<div className="flex w-full flex-col gap-2">
				<h1 className="text-2xl font-bold md:text-3xl">Campaign Categories</h1>
				<p className="max-w-[540px] text-base font-medium text-placeholder md:text-lg">
					See the list of campaign categories in Abeghelp.me and get started to
					empower your cause and that of others
				</p>
			</div>
			<div className="grid grid-cols-1 gap-4 text-white md:grid-cols-3 md:gap-8 lg:grid-cols-4">
				{allCampaignCategories &&
					allCampaignCategories.map((category, id) => {
						return (
							<Button
								asChild
								key={id}
								className={cn(
									`truncate rounded-lg border border-abeg-primary p-6 text-center text-base font-bold text-abeg-primary duration-500 hover:scale-110 hover:bg-abeg-primary hover:text-white hover:transition-all md:text-lg`
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
									{category.name} ({category.count})
								</Link>
							</Button>
						);
					})}
			</div>
		</div>
	);
};
export default CampaignCategories;
