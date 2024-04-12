type NoCampaignProps = {
	categoryName: string | null;
};
const NoCampaign = ({ categoryName }: NoCampaignProps) => {
	return (
		<article className="px-5 md:px-20 flex flex-col gap-2">
			<h4 className="text-xl font-bold md:text-2xl">
				There are currently no campaign in
				{` ${categoryName?.toLowerCase()} campaign`}
			</h4>
			<p className="text-base text-placeholder font-medium max-w-[540px]">
				Try other campaign categories above
			</p>
		</article>
	);
};
export default NoCampaign;
