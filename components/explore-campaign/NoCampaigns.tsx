type NoCampaignProps = {
	categoryName: string | null;
};
const NoCampaign = ({ categoryName }: NoCampaignProps) => {
	return (
		<div className="px-5 md:px-20 flex flex-col gap-2">
			<h1 className="text-4xl font-bold md:text-5xl">
				There are currently no campaign in{" "}
				{categoryName
					? `${categoryName.toLowerCase()} category`
					: "all categories"}
			</h1>
			<p className="text-xl text-placeholder font-medium max-w-[540px]">
				Try other campaign categories below
			</p>
		</div>
	);
};
export default NoCampaign;
