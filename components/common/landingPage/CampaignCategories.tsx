import { Button } from "@/components/ui";
import type { AllCampaignCategories } from "@/interfaces";
import { cn } from "@/lib";
import { callApi } from "@/lib/helpers/campaign";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// const categories = [
//   { title: "Health & Wellness (20)", color: "bg-[#A8CCCC]", path: "health" },
//   { title: "Business (12)", color: "bg-[#E6E6E6]", path: "business" },
//   { title: "Family (15)", color: "bg-[#455A64]", path: "family" },
//   { title: "Emergency (30)", color: "bg-[#2B908E]", path: "emergency" },
//   { title: "Religion {12)", color: "bg-[#ACDCDC]", path: "religion" },
//   { title: "Medical (18)", color: "bg-[#D6BBFB]", path: "medical" },
//   { title: "Volunteer (20)", color: "bg-[#FFC3C2]", path: "volunteer" },
//   { title: "Education (15)", color: "bg-[#D2D2D2]", path: "education" },
//   { title: "Events (10)", color: "bg-[#D2D2D2]", path: "events" },
//   { title: "Wedding(8)", color: "bg-[#A8CCCC]", path: "wedding" },
//   { title: "Others", color: "bg-[#8BD2BD]", path: "others" },
// ];

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
	// console.log("from campaign categories : ", allCampaignCategories);

	// const [data, setData] = useState<AllCampaignCategories[] | null>();
	// const fetchAllCampaignCategories = async () => {
	//   const { data, error } = await callApi<AllCampaignCategories[]>(
	//     "/campaign/categories"
	//   );

	//   if (error) {
	//     console.log("error:", error);
	//   }
	//   setData(data?.data);
	// };

	// // console.log(data);

	// useEffect(() => {
	//   void fetchAllCampaignCategories();
	// }, []);

	return (
		<div className={cn("flex flex-col gap-12 justify-center", className)}>
			<div className="w-full flex flex-col gap-2">
				<h1 className="text-4xl font-bold md:text-5xl">Campaign Categories</h1>
				<p className="text-xl text-placeholder font-medium max-w-[540px]">
					Join the effortless way to fundraise and make a difference and empower
					your cause with Abeghelp.me
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
